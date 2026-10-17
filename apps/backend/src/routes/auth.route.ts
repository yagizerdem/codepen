import { Router } from "express";
import * as authController from "@controllers/auth.controller.js";
import { asyncHandler } from "@/utils/async-handler.js";

const router = Router();

router.post("/register", asyncHandler(authController.register));

export default router;
