import { isValidObjectId } from "mongoose";
import type { CreateBlogInput, UpdateBlogInput } from "@codepen/validator";
import Blog from "@/models/blog.entity.js";
import { AppError } from "@/utils/error.js";

/**
 * Owner-scoped lookup: a blog that is missing or belongs to someone else is reported
 * the same way (404), so blog ids of other users are not revealed.
 */
function blogNotFound(blogId: string) {
  return AppError.notFound({
    message: `Blog with id ${blogId} does not exist.`,
  });
}

export function createBlog(authorId: string, input: CreateBlogInput) {
  return Blog.create({ author: authorId, ...input });
}

export async function getBlog(blogId: string) {
  if (!isValidObjectId(blogId)) throw blogNotFound(blogId);

  const blog = await Blog.findById(blogId);
  if (!blog) throw blogNotFound(blogId);

  return blog;
}

export async function updateBlog(
  authorId: string,
  blogId: string,
  input: UpdateBlogInput,
) {
  if (!isValidObjectId(blogId)) throw blogNotFound(blogId);

  const fields = Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  );
  const blog = await Blog.findOneAndUpdate(
    { _id: blogId, author: authorId },
    { $set: fields },
    { new: true },
  );
  if (!blog) throw blogNotFound(blogId);

  return blog;
}

export async function deleteBlog(authorId: string, blogId: string) {
  if (!isValidObjectId(blogId)) throw blogNotFound(blogId);

  const blog = await Blog.findOneAndDelete({ _id: blogId, author: authorId });
  if (!blog) throw blogNotFound(blogId);
}
