import HttpStatusCode from "@/utils/http-status-code.js";
import type { Request, Response } from "express";

export async function register(req: Request, res: Response) {
  return res.status(HttpStatusCode.CREATED).json({ success: true });
}
