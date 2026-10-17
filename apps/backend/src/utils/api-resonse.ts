import HttpStatusCode from "@utils/http-status-code.js";
import type { FieldErrors } from "@utils/error.js";

interface ApiResponseOptions<T> {
  statusCode: HttpStatusCode;
  message: string;
  data?: T;
  fieldErrors?: FieldErrors;
}

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
}
