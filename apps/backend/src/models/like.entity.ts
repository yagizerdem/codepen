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
      index: true,
    },
  },
  { timestamps: true },
);

// A user can like a given pen only once.
schema.index({ user: 1, pen: 1 }, { unique: true });

const Like = mongoose.model("Like", schema);

export default Like;
