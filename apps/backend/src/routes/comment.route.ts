import { Router } from "express";
import * as commentController from "@controllers/comment.controller.js";
import { asyncHandler } from "@/utils/async-handler.js";
import { requireAuth } from "@/middlewares/auth.middleware.js";

const router = Router();

router.use(requireAuth);

/**
 * @openapi
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 665f1c2e8a1b2c3d4e5f6a7d
 *         user:
 *           type: string
 *           example: 665f1c2e8a1b2c3d4e5f6a7a
 *         pen:
 *           type: string
 *           example: 665f1c2e8a1b2c3d4e5f6a7b
 *         message:
 *           type: string
 *           example: Nice pen!
 *         thread:
 *           type: array
 *           description: Replies to this comment. Ids on create/update, nested comments when listing.
 *           items:
 *             type: object
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CommentInput:
 *       type: object
 *       required: [message]
 *       properties:
 *         message:
 *           type: string
 *         parentId:
 *           type: string
 *           description: Id of the comment to reply to. Omit for a top-level comment. Ignored on update.
 */

/**
 * @openapi
 * /api/comments/{penId}:
 *   post:
 *     tags: [Comments]
 *     summary: Comment on a pen
 *     description: Pass `parentId` to reply to an existing comment of the same pen.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       201:
 *         description: Comment created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Missing or invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Pen or parent comment does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/:penId", asyncHandler(commentController.createComment));

/**
 * @openapi
 * /api/comments/{penId}:
 *   get:
 *     tags: [Comments]
 *     summary: List the comments of a pen
 *     description: Returns the top-level comments, each with its replies nested under `thread`.
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
 *         description: The nested comments of the pen, oldest first
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
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
router.get("/:penId", asyncHandler(commentController.getComments));

/**
 * @openapi
 * /api/comments/{id}:
 *   put:
 *     tags: [Comments]
 *     summary: Update a comment
 *     description: Only the message is updated. Only the author can update a comment.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       200:
 *         description: The updated comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Missing or invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Comment does not exist or belongs to another user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", asyncHandler(commentController.updateComment));

/**
 * @openapi
 * /api/comments/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Delete a comment
 *     description: Only the author can delete a comment. Its replies are deleted with it.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment id
 *     responses:
 *       200:
 *         description: Comment deleted
 *       401:
 *         description: Missing or invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Comment does not exist or belongs to another user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", asyncHandler(commentController.deleteComment));

export default router;
