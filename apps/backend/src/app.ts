import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppError } from "@/utils/error.js";
import authRoute from "@routes/auth.route.js";
import penRoute from "@routes/pen.route.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

export const app = express();

// Parsers / global middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CodePen API",
      version: "1.0.0",
      description: "Backend API for the CodePen clone",
    },
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // files containing annotations as above
};
const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//

// Routes
app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});
app.use("/api/auth", authRoute);
app.use("/api/pens", penRoute);

//  404 + error handler (AFTER all routes)
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
