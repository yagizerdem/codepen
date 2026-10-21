import { z } from "zod";

/** Body of PATCH /users/me. Only the provided fields are updated. */
export const updateUserSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters"),
    age: z.number().int().min(0, "Age cannot be negative"),
  })
  .partial();

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
