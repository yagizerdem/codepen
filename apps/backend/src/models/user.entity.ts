import mongoose, { type HydratedDocument, type InferSchemaType } from "mongoose";

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    age: { type: Number },
  },
  {
    timestamps: true,
    // select:false doesn't cover create() or +passwordHash queries, so never serialize it.
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        delete ret.passwordHash;
        return ret;
      },
    },
  },
);
export type UserDocument = HydratedDocument<InferSchemaType<typeof schema>>;

const User = mongoose.model("User", schema);

export default User;
