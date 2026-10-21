import type { Request, Response } from "express";
import * as userService from "@services/user-service.js";
import { ApiResponse, HttpStatusCode } from "@codepen/shared";

export async function getAuthorById(req: Request<{ id: string }>, res: Response) {
  const authorId = req.params.id;
  const author = await userService.ensureUserExistById(authorId);

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      data: author,
      message: "Author retrieved successfully",
    }),
  );
}
