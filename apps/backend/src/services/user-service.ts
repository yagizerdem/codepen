import User from "@/models/user.entity.js";
import { AppError } from "@/utils/error.js";

export async function ensureUserExistById(id: string) {
  const userFromDb = await User.findById(id);
  if (!userFromDb) {
    throw AppError.notFound({
      message: `User with id ${id} does not exist.`,
    });
  }

  return userFromDb;
}

export async function ensureUserExistByEmail(email: string) {
  const userFromDb = await User.findOne({ email });
  if (!userFromDb) {
    throw AppError.notFound({
      message: `User with email ${email} does not exist.`,
    });
  }

  return userFromDb;
}

export async function ensureUserExistByUsername(username: string) {
  const userFromDb = await User.findOne({ username });
  if (!userFromDb) {
    throw AppError.notFound({
      message: `User with username ${username} does not exist.`,
    });
  }

  return userFromDb;
}

export async function ensureUserNotExistById(id: string) {
  if (await User.exists({ _id: id })) {
    throw AppError.conflict({
      message: `User with id ${id} already exists.`,
    });
  }
}

export async function ensureUserNotExistByEmail(email: string) {
  if (await User.exists({ email })) {
    throw AppError.conflict({
      message: `User with email ${email} already exists.`,
    });
  }
}

export async function ensureUserNotExistByUsername(username: string) {
  if (await User.exists({ username })) {
    throw AppError.conflict({
      message: `User with username ${username} already exists.`,
    });
  }
}
