import { Router } from "express";
import * as likeController from "@controllers/like.controller.js";
import { asyncHandler } from "@/utils/async-handler.js";
import { requireAuth } from "@/middlewares/auth.middleware.js";

const router = Router();

router.use(requireAuth);

/**
 * @openapi
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 665f1c2e8a1b2c3d4e5f6a7c
 *         user:
 *           type: string
 *           example: 665f1c2e8a1b2c3d4e5f6a7a
 *         pen:
 *           type: string
 *           example: 665f1c2e8a1b2c3d4e5f6a7b
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * /api/likes/{penId}:
 *   post:
 *     tags: [Likes]
 *     summary: Like a pen
 *     description: A user can like a given pen only once.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: penId
 *         required: true
 *         schema:
 *           type: string
 *         description: Pen id
 *     responses:
 *       201:
 *         description: Pen liked
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       401:
 *         description: Missing or invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Pen does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Pen is already liked by the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/:penId", asyncHandler(likeController.createLike));

/**
 * @openapi
 * /api/likes/{penId}:
 *   get:
 *     tags: [Likes]
 *     summary: List the likes of a pen
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: penId
 *         required: true
 *         schema:
 *           type: string
 *         description: Pen id
 *     responses:
 *       200:
 *         description: The likes of the pen, newest first
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Like'
 *       401:
 *         description: Missing or invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Pen does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:penId", asyncHandler(likeController.getLikes));

/**
 * @openapi
 * /api/likes/{penId}:
 *   delete:
 *     tags: [Likes]
 *     summary: Remove the user's like from a pen
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: penId
 *         required: true
 *         schema:
 *           type: string
 *         description: Pen id
 *     responses:
 *       200:
 *         description: Like removed
 *       401:
 *         description: Missing or invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: The user has not liked this pen
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:penId", asyncHandler(likeController.deleteLike));

export default router;
