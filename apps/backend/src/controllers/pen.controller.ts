import type { Request, Response } from "express";
import { parseBody } from "@/utils/validate.js";
import { createPenSchema, updatePenSchema } from "@codepen/validator";
import * as penService from "@/services/pen-service.js";
import { ApiResponse, HttpStatusCode } from "@codepen/shared";

export async function createPen(req: Request, res: Response) {
  const user = req.user!;
  const input = parseBody(createPenSchema, req.body);

  const penFromDb = await penService.createPen(user.id, input);

  return res.status(HttpStatusCode.CREATED).json(
    ApiResponse.created({
      data: penFromDb,
      message: "Pen created successfully",
    }),
  );
}

export async function updatePen(req: Request<{ id: string }>, res: Response) {
  const user = req.user!;
  const input = parseBody(updatePenSchema, req.body);

  const pen = await penService.updatePen(user.id, req.params.id, input);

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      data: pen,
      message: "Pen updated successfully",
    }),
  );
}

export async function deletePen(req: Request<{ id: string }>, res: Response) {
  await penService.deletePen(req.user!.id, req.params.id);

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      message: "Pen deleted successfully",
    }),
  );
}
