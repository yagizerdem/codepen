import { HttpStatusCode } from "@codepen/shared";
import axios, { type InternalAxiosRequestConfig } from "axios";
import globalEventEmitter from "@/event-emitter";

export const AUTH_LOGOUT_EVENT = "auth:logout";

// Endpoints whose 401 means "bad credentials / no session", not "expired token".
const NO_REFRESH_URLS = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh",
];

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

export class ApiError extends Error {
  public status?: number;
  public code?: string;
  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

const REFRESH_API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: 10_000,
  withCredentials: true,
});

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: 10_000,
  withCredentials: true,
});

// Shared so concurrent 401s trigger a single refresh (refresh tokens rotate).
let refreshPromise: Promise<void> | null = null;

function refreshSession(): Promise<void> {
  refreshPromise ??= REFRESH_API.post("/api/auth/refresh")
    .then(() => undefined)
    .finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
}

function toApiError(error: any): ApiError {
  return new ApiError(
    error.response?.data?.message ?? error.message ?? "Something went wrong",
    error.response?.status,
    error.code,
  );
}

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as RetriableConfig | undefined;
    const status: number | undefined = error.response?.status;

    const canRefresh =
      status === HttpStatusCode.UNAUTHORIZED &&
      original !== undefined &&
      !original._retry &&
      !NO_REFRESH_URLS.some((url) => original.url?.startsWith(url));

    if (!canRefresh) {
      return Promise.reject(toApiError(error));
    }

    original._retry = true;

    try {
      console.log("Refreshing session...");
      await refreshSession();
    } catch {
      // Refresh token is expired/invalid: the session is over.
      globalEventEmitter.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
      return Promise.reject(toApiError(error));
    }

    return API(original);
  },
);

export default API;
