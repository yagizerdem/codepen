import { Router } from "express";
import * as userController from "@controllers/user.controller.js";
import { asyncHandler } from "@/utils/async-handler.js";
import { requireAuth } from "@/middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get a user (author) by id
 *     description: Requires authentication because the response includes the user's email.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       200:
 *         description: The user
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       description: The authenticated user's own account.
 *       properties:
 *         _id:
 *           type: string
 *           example: 665f1c2e8a1b2c3d4e5f6a7a
 *         username:
 *           type: string
 *           example: user
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         age:
 *           type: integer
 *           example: 25
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     PublicUser:
 *       type: object
 *       description: Profile fields visible to anyone.
 *       properties:
 *         _id:
 *           type: string
 *           example: 665f1c2e8a1b2c3d4e5f6a7a
 *         username:
 *           type: string
 *           example: user
 *         createdAt:
 *           type: string
 *           format: date-time
 *     UserUpdateInput:
 *       type: object
 *       description: Only the provided fields are updated.
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           example: new_username
 *         age:
 *           type: integer
 *           minimum: 0
 *           example: 26
 */

/**
 * @openapi
 * /api/users/me:
 *   patch:
 *     tags: [Users]
 *     summary: Update the current user
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
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
 *         description: User does not exist
 *       409:
 *         description: Username is already taken
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", asyncHandler(userController.getAuthorById));
router.patch("/me", requireAuth, asyncHandler(userController.updateMe));

/**
 * @openapi
 * /api/users/{username}:
 *   get:
 *     tags: [Users]
 *     summary: Get a public profile by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user
 *     responses:
 *       200:
 *         description: Public profile of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: User fetched successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PublicUser'
 *       404:
 *         description: No user with this username
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:username", asyncHandler(userController.getUserByUsername));

export default router;
