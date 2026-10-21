import type { ApiResponse } from "./api-response.js";

// Mirrors apps/backend/src/models/pen.entity.ts (userId is the raw ObjectId ref).
export type Pen = {
  _id: string;
  userId: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  createdAt: string;
  updatedAt: string;
};

// Mirrors the keys of PEN_SORTS in apps/backend/src/services/pen-service.ts.
export type PenSort = "updated" | "newest" | "oldest";

export type GetPensResponse = ApiResponse<{ pens: Pen[]; penCount: number }>;
