import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import { AppError } from "@/utils/error.js";
import authRoute from "@routes/auth.route.js";

export const app = express();

// 1. Parsers / global middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

// 2. Routes
app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});
app.use("/api/auth", authRoute);

// 3. 404 + error handler (AFTER all routes)
app.use((_req, _res, next) =>
  next(AppError.notFound({ message: "Route not found" })),
);

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  if (statusCode >= 500) console.error(error);

  res.status(statusCode).json({
    success: false,
    error: {
      message: statusCode >= 500 ? "Internal server error" : error.message,
      code: statusCode,
      ...(error instanceof AppError && error.fieldErrors
        ? { fieldErrors: error.fieldErrors }
        : {}),
    },
  });
});
