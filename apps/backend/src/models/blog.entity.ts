import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    tags: { type: [String], default: [], index: true },
  },
  { timestamps: true },
);

const Blog = mongoose.model("Blog", schema);

export default Blog;
