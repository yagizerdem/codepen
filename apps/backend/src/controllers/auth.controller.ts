import HttpStatusCode from "@/utils/http-status-code.js";
import type { Request, Response } from "express";
import { registerSchema } from "@codepen/validator";
import { z } from "zod";
import { AppError, type FieldErrors } from "@/utils/error.js";
import User from "@/models/user.entity.js";
import bcrypt from "bcrypt";
import { ApiResponse } from "@/utils/api-resonse.js";

export async function register(req: Request, res: Response) {
  const body = req.body;
  const result = registerSchema.safeParse(body);
  if (!result.success) {
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

  const hash: string = await bcrypt.hash(result.data.password, 10);

  const user = await User.create({
    email: result.data.email,
    passwordHash: hash,
    username: result.data.username,
    ...(result.data.age !== undefined && { age: result.data.age }),
  });

  return res
    .status(HttpStatusCode.CREATED)
    .json(
      ApiResponse.created({
        data: user,
        message: "User successfully registered",
      }),
    );
}
