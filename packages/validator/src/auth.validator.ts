import { z } from "zod";

/**
 * Register request body. Mirrors the User entity (models/user.entity.ts),
 * except `passwordHash` is replaced by the plain `password`, which gets hashed in the service.
 */
export const registerSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  email: z.string().trim().toLowerCase().pipe(z.email("Invalid email")),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
  age: z.number().int().min(0, "Age cannot be negative").optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email("Invalid email")),
  password: z.string().min(1, "Password is required"),
});

/** Body of /auth/refresh and /auth/logout. */
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
