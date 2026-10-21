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

export async function getPens(req: Request, res: Response) {
  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);
  const sort = req.query.sort as string;

  const data = await penService.getPens(req.user!.id, {
    limit: Number.isInteger(limit) && limit >= 1 && limit <= 100 ? limit : 20,
    skip: Number.isInteger(skip) && skip >= 0 ? skip : 0,
    sort: sort in penService.PEN_SORTS ? (sort as penService.PenSort) : "updated",
  });

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      data,
      message: "Pens fetched successfully",
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
