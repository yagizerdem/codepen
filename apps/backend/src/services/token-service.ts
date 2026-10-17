import RefreshToken from "@/models/refresh-token.entity.js";
import { AppError } from "@/utils/error.js";
import {
  generateRefreshToken,
  hashToken,
  REFRESH_TOKEN_TTL_MS,
  signAccessToken,
} from "@/utils/token.js";

export async function issueTokens(userId: string) {
  const refreshToken = generateRefreshToken();
  await RefreshToken.create({
    user: userId,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
  });

  return { accessToken: await signAccessToken(userId), refreshToken };
}

/**
 * Rotates a refresh token: the presented one is revoked and a new pair is issued.
 * Presenting an already-revoked token signals theft, so all of the user's tokens are revoked.
 */
export async function rotateRefreshToken(refreshToken: string) {
  const stored = await RefreshToken.findOne({
    tokenHash: hashToken(refreshToken),
  }).select("+tokenHash");

  if (!stored || stored.expiresAt <= new Date()) {
    throw AppError.unauthorized({ message: "Invalid refresh token" });
  }
  if (stored.revokedAt) {
    await revokeAllUserTokens(stored.user.toString());
    throw AppError.unauthorized({ message: "Invalid refresh token" });
  }

  // Atomic claim so two concurrent refreshes cannot both succeed.
  const claimed = await RefreshToken.findOneAndUpdate(
    { _id: stored._id, revokedAt: { $exists: false } },
    { revokedAt: new Date() },
  );
  if (!claimed) {
    throw AppError.unauthorized({ message: "Invalid refresh token" });
  }

  return issueTokens(stored.user.toString());
}

export async function revokeRefreshToken(refreshToken: string) {
  await RefreshToken.updateOne(
    { tokenHash: hashToken(refreshToken), revokedAt: { $exists: false } },
    { revokedAt: new Date() },
  );
}

export async function revokeAllUserTokens(userId: string) {
  await RefreshToken.updateMany(
    { user: userId, revokedAt: { $exists: false } },
    { revokedAt: new Date() },
  );
}
