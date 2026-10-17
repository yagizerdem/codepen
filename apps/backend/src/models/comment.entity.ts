import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pen",
      required: true,
    },
    message: { type: String, required: true, trim: true },
    // Parent comment this one replies to; null for a top-level comment.
    thread: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
      },
    ],
  },
  { timestamps: true },
);

// Lists a pen's top-level comments (thread: null) and a thread's replies.
schema.index({ pen: 1, thread: 1, createdAt: 1 });
schema.index({ thread: 1, createdAt: 1 });

const Comment = mongoose.model("Comment", schema);

export default Comment;
