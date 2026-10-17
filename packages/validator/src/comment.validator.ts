import { z } from "zod";

export const createCommentSchema = z.object({
  message: z.string().trim().min(1, "Message is required"),
  /** Id of the comment this one replies to; omit for a top-level comment. */
  parentId: z.string().trim().min(1).optional(),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;

export const updateCommentSchema = createCommentSchema.pick({ message: true });

export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
