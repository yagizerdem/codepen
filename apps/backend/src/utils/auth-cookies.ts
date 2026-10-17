import type { Request, Response } from "express";
import { ACCESS_TOKEN_TTL_MS, REFRESH_TOKEN_TTL_MS } from "@/utils/token.js";

const ACCESS_COOKIE = "accessToken";
const REFRESH_COOKIE = "refreshToken";

const BASE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
} as const;

// The access token is needed on every API route; the refresh token only on /api/auth.
const ACCESS_COOKIE_OPTIONS = { ...BASE_OPTIONS, path: "/" } as const;
const REFRESH_COOKIE_OPTIONS = { ...BASE_OPTIONS, path: "/api/auth" } as const;

export function setAccessCookie(res: Response, accessToken: string) {
  res.cookie(ACCESS_COOKIE, accessToken, {
    ...ACCESS_COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_TTL_MS,
  });
}

export function setRefreshCookie(res: Response, refreshToken: string) {
  res.cookie(REFRESH_COOKIE, refreshToken, {
    ...REFRESH_COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_TTL_MS,
  });
}

export function clearAuthCookies(res: Response) {
  res.clearCookie(ACCESS_COOKIE, ACCESS_COOKIE_OPTIONS);
  res.clearCookie(REFRESH_COOKIE, REFRESH_COOKIE_OPTIONS);
}

function readCookie(req: Request, name: string): string | undefined {
  const value: unknown = req.cookies?.[name];
  return typeof value === "string" && value ? value : undefined;
}

export const readAccessToken = (req: Request) => readCookie(req, ACCESS_COOKIE);
export const readRefreshToken = (req: Request) =>
  readCookie(req, REFRESH_COOKIE);
