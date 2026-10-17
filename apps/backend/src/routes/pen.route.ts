import { Router } from "express";
import * as penController from "@controllers/pen.controller.js";
import { asyncHandler } from "@/utils/async-handler.js";
import { requireAuth } from "@/middlewares/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.post("/", asyncHandler(penController.createPen));
router.put("/:id", asyncHandler(penController.updatePen));
router.delete("/:id", asyncHandler(penController.deletePen));

export default router;
