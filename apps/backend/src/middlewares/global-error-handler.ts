import { AppError } from "@/utils/error.js";
import { ApiResponse, HttpStatusCode } from "@codepen/shared";
import type { NextFunction, Request, Response } from "express";

export default function globalErrorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(error);

  if (error instanceof AppError && error.isOperational) {
    res.status(error.statusCode).json(
      new ApiResponse({
        message: error.message,
        statusCode: error.statusCode,
        data: null,
      }),
    );
  } else if (error instanceof AppError && !error.isOperational) {
    res.status(error.statusCode).json(
      new ApiResponse({
        message: "something went wrong",
        statusCode: error.statusCode,
        data: null,
      }),
    );
  } else {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
      new ApiResponse({
        message: "Internal server error",
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        data: null,
      }),
    );
  }
}
