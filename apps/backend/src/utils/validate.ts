import { z } from "zod";
import { HttpStatusCode, type FieldErrors } from "@codepen/shared";
import { AppError } from "@/utils/error.js";

/** Parses `body` with `schema`, throwing a 400 AppError with field errors on failure. */
export function parseBody<T extends z.ZodType>(
  schema: T,
  body: unknown,
): z.output<T> {
  const result = schema.safeParse(body);
  if (result.success) return result.data;

  const { fieldErrors, formErrors } = z.flattenError(result.error);
  const invalidFields = Object.keys(fieldErrors);

  throw new AppError({
    message: invalidFields.length
      ? `Validation failed for: ${invalidFields.join(", ")}`
      : (formErrors[0] ?? ""),
    fieldErrors: fieldErrors as FieldErrors,
    statusCode: HttpStatusCode.BAD_REQUEST,
    isOperational: true,
  });
}
