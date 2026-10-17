import { z } from "zod";

export const createPenSchema = z.object({
  htmlCode: z.string().trim().optional(),
  cssCode: z.string().trim().optional(),
  jsCode: z.string().trim().optional(),
});

export type CreatePenInput = z.infer<typeof createPenSchema>;

/** Same fields as create; every one is optional, only the provided ones are updated. */
export const updatePenSchema = createPenSchema;

export type UpdatePenInput = z.infer<typeof updatePenSchema>;
