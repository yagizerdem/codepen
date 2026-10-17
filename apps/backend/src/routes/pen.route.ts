import { Router } from "express";
import * as penController from "@controllers/pen.controller.js";
import { asyncHandler } from "@/utils/async-handler.js";
import { requireAuth } from "@/middlewares/auth.middleware.js";

const router = Router();

router.use(requireAuth);

/**
 * @openapi
 * components:
 *   schemas:
 *     Pen:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 665f1c2e8a1b2c3d4e5f6a7b
 *         userId:
 *           type: string
 *           example: 665f1c2e8a1b2c3d4e5f6a7a
 *         htmlCode:
 *           type: string
 *           example: <h1>Hello</h1>
 *         cssCode:
 *           type: string
 *           example: "h1 { color: tomato; }"
 *         jsCode:
 *           type: string
 *           example: console.log("hi")
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     PenInput:
 *       type: object
 *       properties:
 *         htmlCode:
 *           type: string
 *         cssCode:
 *           type: string
 *         jsCode:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             code:
 *               type: integer
 *             fieldErrors:
 *               type: object
 *               additionalProperties:
 *                 type: array
 *                 items:
 *                   type: string
 */

/**
 * @openapi
 * /api/pens:
 *   post:
 *     tags: [Pens]
 *     summary: Create a pen
 *     description: Users can create one pen every 5 minutes.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PenInput'
 *     responses:
 *       201:
 *         description: Pen created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pen'
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
 *       429:
 *         description: Pen creation cooldown has not passed yet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", asyncHandler(penController.createPen));

/**
 * @openapi
 * /api/pens/{id}:
 *   put:
 *     tags: [Pens]
 *     summary: Update a pen
 *     description: Only the provided fields are updated. Only the owner can update a pen.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pen id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PenInput'
 *     responses:
 *       200:
 *         description: The updated pen
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pen'
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
 *         description: Pen does not exist or belongs to another user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", asyncHandler(penController.updatePen));

/**
 * @openapi
 * /api/pens/{id}:
 *   delete:
 *     tags: [Pens]
 *     summary: Delete a pen
 *     description: Only the owner can delete a pen.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pen id
 *     responses:
 *       204:
 *         description: Pen deleted
 *       401:
 *         description: Missing or invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Pen does not exist or belongs to another user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", asyncHandler(penController.deletePen));

export default router;
