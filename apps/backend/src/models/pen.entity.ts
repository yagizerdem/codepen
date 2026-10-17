import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    htmlCode: { type: String, default: "" },
    cssCode: { type: String, default: "" },
    jsCode: { type: String, default: "" },
  },
  { timestamps: true },
);

const Pen = mongoose.model("Pen", schema);

export default Pen;
