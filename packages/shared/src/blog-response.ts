import type { ApiResponse } from "./api-response.js";

// Mirrors apps/backend/src/models/blog.entity.ts (author is the raw ObjectId ref).
export type Blog = {
  _id: string;
  author: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

// Mirrors user.entity.ts without passwordHash.
export type BlogAuthor = {
  _id: string;
  username: string;
  email: string;
  age?: number;
  createdAt: string;
  updatedAt: string;
};

export type GetBlogResponse = ApiResponse<{ blogs: Blog[]; blogCount: number }>;
