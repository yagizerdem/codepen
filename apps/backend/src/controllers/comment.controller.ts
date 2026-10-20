import type { Request, Response } from "express";
import { parseBody } from "@/utils/validate.js";
import { createCommentSchema, updateCommentSchema } from "@codepen/validator";
import * as commentService from "@/services/comment-service.js";
import { ApiResponse, HttpStatusCode } from "@codepen/shared";
import { ApiFeatures } from "@/utils/api-features.js";
import Comment from "@/models/comment.entity.js";

export async function createComment(
  req: Request<{ penId: string }>,
  res: Response,
) {
  const input = parseBody(createCommentSchema, req.body);

  const comment = await commentService.createComment(
    req.user!.id,
    req.params.penId,
    input,
  );

  return res.status(HttpStatusCode.CREATED).json(
    ApiResponse.created({
      data: comment,
      message: "Comment created successfully",
    }),
  );
}

export async function getComments(
  req: Request<{ penId: string }>,
  res: Response,
) {
  const apiFeatures = new ApiFeatures(
    Comment.find({ penId: req.params.penId }),
    req.query,
  );
  apiFeatures.filter().select().limit().skip();
  const comments = await apiFeatures.mongooseQuery;

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      data: comments,
      message: "Comments fetched successfully",
    }),
  );
}

export async function updateComment(
  req: Request<{ id: string }>,
  res: Response,
) {
  const input = parseBody(updateCommentSchema, req.body);

  const comment = await commentService.updateComment(
    req.user!.id,
    req.params.id,
    input,
  );

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      data: comment,
      message: "Comment updated successfully",
    }),
  );
}

export async function deleteComment(
  req: Request<{ id: string }>,
  res: Response,
) {
  await commentService.deleteComment(req.user!.id, req.params.id);

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      message: "Comment deleted successfully",
    }),
  );
}
