import type { Request, Response } from "express";
import { parseBody } from "@/utils/validate.js";
import { createBlogSchema, updateBlogSchema } from "@codepen/validator";
import * as blogService from "@/services/blog-service.js";
import { ApiResponse } from "@/utils/api-resonse.js";
import HttpStatusCode from "@/utils/http-status-code.js";
import { ApiFeatures } from "@/utils/api-features.js";
import Blog from "@/models/blog.entity.js";

export async function createBlog(req: Request, res: Response) {
  const input = parseBody(createBlogSchema, req.body);

  const blog = await blogService.createBlog(req.user!.id, input);

  return res.status(HttpStatusCode.CREATED).json(
    ApiResponse.created({
      data: blog,
      message: "Blog created successfully",
    }),
  );
}

export async function getBlogs(req: Request, res: Response) {
  const apiFeatures = new ApiFeatures(Blog.find(), req.query);
  apiFeatures.filter().select().limit().skip();
  const blogs = await apiFeatures.mongooseQuery;

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      data: blogs,
      message: "Blogs fetched successfully",
    }),
  );
}

export async function getBlog(req: Request<{ id: string }>, res: Response) {
  const blog = await blogService.getBlog(req.params.id);

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      data: blog,
      message: "Blog fetched successfully",
    }),
  );
}

export async function updateBlog(req: Request<{ id: string }>, res: Response) {
  const input = parseBody(updateBlogSchema, req.body);

  const blog = await blogService.updateBlog(req.user!.id, req.params.id, input);

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      data: blog,
      message: "Blog updated successfully",
    }),
  );
}

export async function deleteBlog(req: Request<{ id: string }>, res: Response) {
  await blogService.deleteBlog(req.user!.id, req.params.id);

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      message: "Blog deleted successfully",
    }),
  );
}
