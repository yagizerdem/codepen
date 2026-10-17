import { Router } from "express";
import * as blogController from "@controllers/blog.controller.js";
import { asyncHandler } from "@/utils/async-handler.js";
import { requireAuth } from "@/middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 665f1c2e8a1b2c3d4e5f6a7e
 *         author:
 *           type: string
 *           example: 665f1c2e8a1b2c3d4e5f6a7a
 *         title:
 *           type: string
 *           example: Getting started with CSS grid
 *         body:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: [css, grid]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     BlogInput:
 *       type: object
 *       required: [title, body]
 *       properties:
 *         title:
 *           type: string
 *         body:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @openapi
 * /api/blogs:
 *   get:
 *     tags: [Blogs]
 *     summary: List blogs
 *     description: Public. Supports `author`, `tags`, `limit`, `skip` and `select` query parameters.
 *     responses:
 *       200:
 *         description: The blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
router.get("/", asyncHandler(blogController.getBlogs));

/**
 * @openapi
 * /api/blogs/{id}:
 *   get:
 *     tags: [Blogs]
 *     summary: Get a blog
 *     description: Public.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog id
 *     responses:
 *       200:
 *         description: The blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", asyncHandler(blogController.getBlog));

/**
 * @openapi
 * /api/blogs:
 *   post:
 *     tags: [Blogs]
 *     summary: Create a blog
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogInput'
 *     responses:
 *       201:
 *         description: Blog created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
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
 */
router.post("/", requireAuth, asyncHandler(blogController.createBlog));

/**
 * @openapi
 * /api/blogs/{id}:
 *   put:
 *     tags: [Blogs]
 *     summary: Update a blog
 *     description: Only the provided fields are updated. Only the author can update a blog.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogInput'
 *     responses:
 *       200:
 *         description: The updated blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
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
 *         description: Blog does not exist or belongs to another user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", requireAuth, asyncHandler(blogController.updateBlog));

/**
 * @openapi
 * /api/blogs/{id}:
 *   delete:
 *     tags: [Blogs]
 *     summary: Delete a blog
 *     description: Only the author can delete a blog.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog id
 *     responses:
 *       200:
 *         description: Blog deleted
 *       401:
 *         description: Missing or invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Blog does not exist or belongs to another user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", requireAuth, asyncHandler(blogController.deleteBlog));

export default router;
