import HttpStatusCode from "@/utils/http-status-code.js";
import type { Request, Response } from "express";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "@codepen/validator";
import { AppError } from "@/utils/error.js";
import User from "@/models/user.entity.js";
import bcrypt from "bcrypt";
import { ApiResponse } from "@/utils/api-resonse.js";
import { parseBody } from "@/utils/validate.js";
import {
  clearAuthCookies,
  readRefreshToken,
  setAccessCookie,
  setRefreshCookie,
} from "@/utils/auth-cookies.js";
import * as userService from "@/services/user-service.js";
import * as tokenService from "@/services/token-service.js";

export async function register(req: Request, res: Response) {
  const input = parseBody(registerSchema, req.body);

  // validation
  await userService.ensureUserNotExistByEmail(input.email);
  await userService.ensureUserNotExistByUsername(input.username);

  const hash: string = await bcrypt.hash(input.password, 10);

  const user = await User.create({
    email: input.email,
    passwordHash: hash,
    username: input.username,
    ...(input.age !== undefined && { age: input.age }),
  });

  return res.status(HttpStatusCode.CREATED).json(
    ApiResponse.created({
      data: user,
      message: "User successfully registered",
    }),
  );
}

export async function login(req: Request, res: Response) {
  const input = parseBody(loginSchema, req.body);

  const user = await User.findOne({ email: input.email }).select(
    "+passwordHash",
  );
  // Same error for unknown email and wrong password to avoid user enumeration.
  const valid =
    user !== null && (await bcrypt.compare(input.password, user.passwordHash));
  if (!user || !valid) {
    throw AppError.unauthorized({ message: "Invalid email or password" });
  }

  const tokens = await tokenService.issueTokens(user.id);
  setAccessCookie(res, tokens.accessToken);
  setRefreshCookie(res, tokens.refreshToken);

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      message: "Logged in successfully",
      data: { user, ...tokens },
    }),
  );
}

export async function logout(req: Request, res: Response) {
  const refreshToken = readRefreshToken(req) ?? req.body?.refreshToken;
  if (typeof refreshToken === "string" && refreshToken) {
    await tokenService.revokeRefreshToken(refreshToken);
  }
  clearAuthCookies(res);

  return res
    .status(HttpStatusCode.OK)
    .json(ApiResponse.ok({ message: "Logged out successfully" }));
}

export async function refresh(req: Request, res: Response) {
  const refreshToken =
    readRefreshToken(req) ??
    parseBody(refreshTokenSchema, req.body).refreshToken;
  const tokens = await tokenService.rotateRefreshToken(refreshToken);
  setAccessCookie(res, tokens.accessToken);
  setRefreshCookie(res, tokens.refreshToken);

  return res
    .status(HttpStatusCode.OK)
    .json(ApiResponse.ok({ message: "Token refreshed", data: tokens }));
}

export async function me(req: Request, res: Response) {
  return res.status(HttpStatusCode.OK).json(ApiResponse.ok({ data: req.user }));
}

export async function isAuthenticated(req: Request, res: Response) {
  return res.status(HttpStatusCode.OK).json(ApiResponse.ok({ data: req.user }));
}
