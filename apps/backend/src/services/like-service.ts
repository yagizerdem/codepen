import { isValidObjectId } from "mongoose";
import Like from "@/models/like.entity.js";
import Pen from "@/models/pen.entity.js";
import { AppError } from "@/utils/error.js";

function penNotFound(penId: string) {
  return AppError.notFound({ message: `Pen with id ${penId} does not exist.` });
}

async function ensurePenExistsById(penId: string) {
  if (!isValidObjectId(penId) || !(await Pen.exists({ _id: penId }))) {
    throw penNotFound(penId);
  }
}

export async function createLike(userId: string, penId: string) {
  await ensurePenExistsById(penId);

  try {
    return await Like.create({ user: userId, pen: penId });
  } catch (error) {
    // unique index on (user, pen): the user already liked this pen
    if ((error as { code?: number }).code === 11000) {
      throw AppError.conflict({ message: "You already liked this pen." });
    }
    throw error;
  }
}

export async function getLikes(penId: string) {
  await ensurePenExistsById(penId);

  return Like.find({ pen: penId }).sort({ createdAt: -1 });
}

export async function deleteLike(userId: string, penId: string) {
  if (!isValidObjectId(penId)) throw penNotFound(penId);

  const like = await Like.findOneAndDelete({ user: userId, pen: penId });
  if (!like) {
    throw AppError.notFound({ message: "You have not liked this pen." });
  }
}
