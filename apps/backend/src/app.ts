import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppError } from "@/utils/error.js";
import authRoute from "@routes/auth.route.js";
import penRoute from "@routes/pen.route.js";
import likeRoute from "@routes/like.route.js";
import commentRoute from "@routes/comment.route.js";
import blogRoute from "@routes/blog.route.js";
import userRoute from "@routes/user.route.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import globalErrorHandler from "@middlewares/global-error-handler.js";

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
        cookieAuth: { type: "apiKey", in: "cookie", name: "accessToken" },
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
app.use("/api/likes", likeRoute);
app.use("/api/comments", commentRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/users", userRoute);

//  404 + error handler (AFTER all routes)
app.use((_req, _res, next) =>
  next(AppError.notFound({ message: "Route not found" })),
);

app.use(globalErrorHandler);
