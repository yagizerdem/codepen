import HttpStatusCode from "@utils/http-status-code.js";

/** Form validation errors keyed by field name, e.g. { email: ["Invalid email"] } */
export type FieldErrors = Record<string, string[]>;

interface AppErrorOptions {
  statusCode: HttpStatusCode;
  message: string;
  /** Expected, handled failure (true) vs. programmer error / bug (false). */
  isOperational?: boolean;
  fieldErrors?: FieldErrors;
}

type FactoryOptions = Pick<AppErrorOptions, "message">;

export class AppError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly isOperational: boolean;
  public readonly fieldErrors: FieldErrors | undefined;

  constructor({
    statusCode,
    message,
    isOperational = true,
    fieldErrors,
  }: AppErrorOptions) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.fieldErrors = fieldErrors;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest({ message = "Bad request" }: Partial<FactoryOptions> = {}) {
    return new AppError({ statusCode: HttpStatusCode.BAD_REQUEST, message });
  }

  static unauthorized({
    message = "Unauthorized",
  }: Partial<FactoryOptions> = {}) {
    return new AppError({ statusCode: HttpStatusCode.UNAUTHORIZED, message });
  }

  static forbidden({ message = "Forbidden" }: Partial<FactoryOptions> = {}) {
    return new AppError({ statusCode: HttpStatusCode.FORBIDDEN, message });
  }

  static notFound({ message = "Not found" }: Partial<FactoryOptions> = {}) {
    return new AppError({ statusCode: HttpStatusCode.NOT_FOUND, message });
  }

  static conflict({ message = "Conflict" }: Partial<FactoryOptions> = {}) {
    return new AppError({ statusCode: HttpStatusCode.CONFLICT, message });
  }

  /** Form / input validation failure with per-field messages. */
  static validation({
    fieldErrors,
    message = "Validation failed",
  }: { fieldErrors: FieldErrors } & Partial<FactoryOptions>) {
    return new AppError({
      statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
      message,
      fieldErrors,
    });
  }

  /** Unexpected failure: marked non-operational. */
  static internal({
    message = "Internal server error",
  }: Partial<FactoryOptions> = {}) {
    return new AppError({
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message,
      isOperational: false,
    });
  }
}
