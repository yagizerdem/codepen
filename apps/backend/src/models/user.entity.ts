import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    age: { type: Number },
  },
  { timestamps: true },
);
const User = mongoose.model("User", schema);

export default User;
