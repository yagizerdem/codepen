import type { NextFunction, Request, Response } from "express";
import User from "@/models/user.entity.js";
import { AppError } from "@/utils/error.js";
import { readAccessToken } from "@/utils/auth-cookies.js";
import { verifyAccessToken } from "@/utils/token.js";

/** Requires a valid access token (cookie, or `Authorization: Bearer`) and sets `req.user`. */
export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const [scheme, bearer] = req.headers.authorization?.split(" ") ?? [];
    const token = readAccessToken(req) ?? (scheme === "Bearer" ? bearer : undefined);
    if (!token) {
      throw AppError.unauthorized({ message: "Missing access token" });
    }

    let userId: string;
    try {
      userId = await verifyAccessToken(token);
    } catch {
      throw AppError.unauthorized({ message: "Invalid or expired access token" });
    }

    const user = await User.findById(userId);
    if (!user) {
      throw AppError.unauthorized({ message: "User no longer exists" });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
