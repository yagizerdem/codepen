import type { UserDocument } from "@/models/user.entity.js";

declare global {
  namespace Express {
    interface Request {
      /** Set by requireAuth. */
      user?: UserDocument;
    }
  }
}
