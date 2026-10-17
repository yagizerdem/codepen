import { isValidObjectId } from "mongoose";
import type { CreatePenInput, UpdatePenInput } from "@codepen/validator";
import Pen from "@/models/pen.entity.js";
import { AppError } from "@/utils/error.js";
import HttpStatusCode from "@/utils/http-status-code.js";

export const PEN_CREATION_COOLDOWN = 1000 * 60 * 5; // 5 minutes

export async function createPen(userId: string, input: CreatePenInput) {
  const latestPen = await Pen.findOne(
    {
      userId,
    },
    null,
    {
      sort: { createdAt: -1 },
    },
  );

  // take date diff, only create a new pen if the latest one was created more than a certain time ago
  if (latestPen) {
    const now = new Date();
    const diff = now.getTime() - latestPen.createdAt.getTime();
    if (diff < PEN_CREATION_COOLDOWN) {
      throw new AppError({
        message: `You must wait ${PEN_CREATION_COOLDOWN / (1000 * 60)} minutes before creating a new pen.`,
        statusCode: HttpStatusCode.TOO_MANY_REQUESTS,
      });
    }
  }

  const pen = await Pen.create({
    userId,
    htmlCode: input.htmlCode ?? "",
    cssCode: input.cssCode ?? "",
    jsCode: input.jsCode ?? "",
  });
  return pen;
}

/**
 * Owner-scoped lookup: a pen that is missing or belongs to someone else is reported
 * the same way (404), so pen ids of other users are not revealed.
 */
function penNotFound(penId: string) {
  return AppError.notFound({ message: `Pen with id ${penId} does not exist.` });
}

export async function updatePen(
  userId: string,
  penId: string,
  input: UpdatePenInput,
) {
  if (!isValidObjectId(penId)) throw penNotFound(penId);

  const fields = Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  );
  const pen = await Pen.findOneAndUpdate(
    { _id: penId, userId },
    { $set: fields },
    { new: true },
  );
  if (!pen) throw penNotFound(penId);

  return pen;
}

export async function deletePen(userId: string, penId: string) {
  if (!isValidObjectId(penId)) throw penNotFound(penId);

  const pen = await Pen.findOneAndDelete({ _id: penId, userId });
  if (!pen) throw penNotFound(penId);
}
