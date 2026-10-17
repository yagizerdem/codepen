import { isValidObjectId, type Types } from "mongoose";
import type {
  CreateCommentInput,
  UpdateCommentInput,
} from "@codepen/validator";
import Comment from "@/models/comment.entity.js";
import Pen from "@/models/pen.entity.js";
import { AppError } from "@/utils/error.js";

function penNotFound(penId: string) {
  return AppError.notFound({ message: `Pen with id ${penId} does not exist.` });
}

/**
 * Owner-scoped lookup: a comment that is missing or belongs to someone else is reported
 * the same way (404).
 */
function commentNotFound(commentId: string) {
  return AppError.notFound({
    message: `Comment with id ${commentId} does not exist.`,
  });
}

export async function createComment(
  userId: string,
  penId: string,
  input: CreateCommentInput,
) {
  if (!isValidObjectId(penId) || !(await Pen.exists({ _id: penId }))) {
    throw penNotFound(penId);
  }

  // a reply must target a comment of the same pen
  const { parentId } = input;
  if (parentId !== undefined) {
    if (
      !isValidObjectId(parentId) ||
      !(await Comment.exists({ _id: parentId, pen: penId }))
    ) {
      throw commentNotFound(parentId);
    }
  }

  const comment = await Comment.create({
    user: userId,
    pen: penId,
    message: input.message,
  });

  if (parentId !== undefined) {
    await Comment.updateOne(
      { _id: parentId },
      { $push: { thread: comment._id } },
    );
  }

  return comment;
}

type CommentNode = Omit<
  Awaited<ReturnType<typeof findPenComments>>[number],
  "thread"
> & { thread: CommentNode[] };

function findPenComments(penId: string) {
  return Comment.find({ pen: penId }).sort({ createdAt: 1 }).lean();
}

/** Returns the pen's top-level comments, each with its replies nested under `thread`. */
export async function getComments(penId: string): Promise<CommentNode[]> {
  if (!isValidObjectId(penId) || !(await Pen.exists({ _id: penId }))) {
    throw penNotFound(penId);
  }

  const comments = await findPenComments(penId);
  const byId = new Map(comments.map((c) => [String(c._id), c]));
  const replyIds = new Set(comments.flatMap((c) => c.thread.map(String)));

  const toNode = (comment: (typeof comments)[number]): CommentNode => ({
    ...comment,
    thread: comment.thread
      .map((id) => byId.get(String(id)))
      .filter((reply) => reply !== undefined)
      .map(toNode),
  });

  return comments.filter((c) => !replyIds.has(String(c._id))).map(toNode);
}

export async function updateComment(
  userId: string,
  commentId: string,
  input: UpdateCommentInput,
) {
  if (!isValidObjectId(commentId)) throw commentNotFound(commentId);

  const comment = await Comment.findOneAndUpdate(
    { _id: commentId, user: userId },
    { $set: { message: input.message } },
    { new: true },
  );
  if (!comment) throw commentNotFound(commentId);

  return comment;
}

/** Deletes the comment together with all of its replies, and unlinks it from its parent. */
export async function deleteComment(userId: string, commentId: string) {
  if (!isValidObjectId(commentId)) throw commentNotFound(commentId);

  const comment = await Comment.findOne({ _id: commentId, user: userId });
  if (!comment) throw commentNotFound(commentId);

  const ids: Types.ObjectId[] = [comment._id];
  let frontier = comment.thread;
  while (frontier.length > 0) {
    ids.push(...frontier);
    const replies = await Comment.find({ _id: { $in: frontier } })
      .select("thread")
      .lean();
    frontier = replies.flatMap((reply) => reply.thread);
  }

  await Comment.deleteMany({ _id: { $in: ids } });
  await Comment.updateMany(
    { thread: comment._id },
    { $pull: { thread: comment._id } },
  );
}
