import type { Request, Response } from "express";
import { ApiResponse, HttpStatusCode } from "@codepen/shared";
import { updateUserSchema } from "@codepen/validator";
import { parseBody } from "@/utils/validate.js";
import * as userService from "@/services/user-service.js";

/** Public profile: only fields that are safe to show to anyone. */
export async function getUserByUsername(
  req: Request<{ username: string }>,
  res: Response,
) {
  const user = await userService.ensureUserExistByUsername(req.params.username);

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      data: {
        _id: user.id,
        username: user.username,
        createdAt: user.createdAt,
      },
      message: "User fetched successfully",
    }),
  );
}

export async function updateMe(req: Request, res: Response) {
  const user = req.user!;
  const input = parseBody(updateUserSchema, req.body);

  if (input.username !== undefined && input.username !== user.username) {
    await userService.ensureUserNotExistByUsername(input.username);
  }

  user.set(input);
  await user.save();

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      data: user,
      message: "User updated successfully",
    }),
  );
}
