import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "./config.js";

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export const app = express();

// 1. Parsers / global middleware
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());

// 2. Routes
app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// 3. 404 + error handler (AFTER all routes)
app.use((_req, _res, next) => next(new HttpError(404, "Route not found")));

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = error instanceof HttpError ? error.statusCode : 500;
  if (statusCode >= 500) console.error(error);

  res.status(statusCode).json({
    success: false,
    error: {
      message: statusCode >= 500 ? "Internal server error" : error.message,
      code: statusCode,
    },
  });
});
