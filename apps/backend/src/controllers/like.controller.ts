import type { Request, Response } from "express";
import * as likeService from "@/services/like-service.js";
import { ApiResponse, HttpStatusCode } from "@codepen/shared";
import { ApiFeatures } from "@/utils/api-features.js";
import Like from "@/models/like.entity.js";

export async function createLike(
  req: Request<{ penId: string }>,
  res: Response,
) {
  const like = await likeService.createLike(req.user!.id, req.params.penId);

  return res.status(HttpStatusCode.CREATED).json(
    ApiResponse.created({
      data: like,
      message: "Pen liked successfully",
    }),
  );
}

export async function getLikes(req: Request<{ penId: string }>, res: Response) {
  const apiFeatures = new ApiFeatures(
    Like.find({ penId: req.params.penId }),
    req.query,
  );
  apiFeatures.filter().select().limit().skip();
  const likes = await apiFeatures.mongooseQuery;

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      data: likes,
      message: "Likes fetched successfully",
    }),
  );
}

export async function deleteLike(
  req: Request<{ penId: string }>,
  res: Response,
) {
  await likeService.deleteLike(req.user!.id, req.params.penId);

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      message: "Like removed successfully",
    }),
  );
}
