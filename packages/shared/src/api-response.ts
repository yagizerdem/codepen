import { HttpStatusCode } from "./http-status-code.js";
/** Form validation errors keyed by field name, e.g. { email: ["Invalid email"] } */
export type FieldErrors = Record<string, string[]>;

interface ApiResponseOptions<T> {
  statusCode: HttpStatusCode;
  message: string;
  data?: T | undefined;
  fieldErrors?: FieldErrors | undefined;
}

type SuccessOptions<T> = Partial<
  Pick<ApiResponseOptions<T>, "message" | "data">
>;
type ErrorOptions = Partial<Pick<ApiResponseOptions<never>, "message">>;

export class ApiResponse<T = unknown> {
  public readonly statusCode: HttpStatusCode;
  public readonly message: string;
  public readonly success: boolean;
  public readonly data: T | undefined;
  public readonly fieldErrors: FieldErrors | undefined;

  constructor({
    statusCode,
    message,
    data,
    fieldErrors,
  }: ApiResponseOptions<T>) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < HttpStatusCode.BAD_REQUEST;
    this.data = data;
    this.fieldErrors = fieldErrors;
  }

  // ---------- 2xx ----------

  static ok<T>({ message = "OK", data }: SuccessOptions<T> = {}) {
    return new ApiResponse<T>({
      statusCode: HttpStatusCode.OK,
      message,
      data,
    });
  }

  static created<T>({ message = "Created", data }: SuccessOptions<T> = {}) {
    return new ApiResponse<T>({
      statusCode: HttpStatusCode.CREATED,
      message,
      data,
    });
  }

  static accepted<T>({ message = "Accepted", data }: SuccessOptions<T> = {}) {
    return new ApiResponse<T>({
      statusCode: HttpStatusCode.ACCEPTED,
      message,
      data,
    });
  }

  /** 204: send with `res.status(...).end()`, HTTP forbids a body here. */
  static noContent({ message = "No content" }: ErrorOptions = {}) {
    return new ApiResponse<never>({
      statusCode: HttpStatusCode.NO_CONTENT,
      message,
    });
  }

  // ---------- 4xx / 5xx ----------

  static badRequest({
    message = "Bad request",
    fieldErrors,
  }: ErrorOptions & { fieldErrors?: FieldErrors } = {}) {
    return new ApiResponse<never>({
      statusCode: HttpStatusCode.BAD_REQUEST,
      message,
      fieldErrors,
    });
  }

  static unauthorized({ message = "Unauthorized" }: ErrorOptions = {}) {
    return new ApiResponse<never>({
      statusCode: HttpStatusCode.UNAUTHORIZED,
      message,
    });
  }

  static forbidden({ message = "Forbidden" }: ErrorOptions = {}) {
    return new ApiResponse<never>({
      statusCode: HttpStatusCode.FORBIDDEN,
      message,
    });
  }

  static notFound({ message = "Not found" }: ErrorOptions = {}) {
    return new ApiResponse<never>({
      statusCode: HttpStatusCode.NOT_FOUND,
      message,
    });
  }

  static conflict({ message = "Conflict" }: ErrorOptions = {}) {
    return new ApiResponse<never>({
      statusCode: HttpStatusCode.CONFLICT,
      message,
    });
  }

  /** Form / input validation failure with per-field messages. */
  static validation({
    fieldErrors,
    message = "Validation failed",
  }: { fieldErrors: FieldErrors } & ErrorOptions) {
    return new ApiResponse<never>({
      statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
      message,
      fieldErrors,
    });
  }

  static tooManyRequests({ message = "Too many requests" }: ErrorOptions = {}) {
    return new ApiResponse<never>({
      statusCode: HttpStatusCode.TOO_MANY_REQUESTS,
      message,
    });
  }

  static internal({ message = "Internal server error" }: ErrorOptions = {}) {
    return new ApiResponse<never>({
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message,
    });
  }

  static serviceUnavailable({
    message = "Service unavailable",
  }: ErrorOptions = {}) {
    return new ApiResponse<never>({
      statusCode: HttpStatusCode.SERVICE_UNAVAILABLE,
      message,
    });
  }
}

type ApiResponseType<T> = typeof ApiResponse<T>;
