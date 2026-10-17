import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  body: z.string().trim().min(1, "Body is required"),
  tags: z.array(z.string().trim().min(1)).default([]),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;

/** Same fields as create; every one is optional, only the provided ones are updated. */
export const updateBlogSchema = z.object({
  title: z.string().trim().min(1, "Title is required").optional(),
  body: z.string().trim().min(1, "Body is required").optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
});

export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
