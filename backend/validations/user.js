import { z } from "zod";

export const userSignUpBodySchema = z.object({
  username: z.string().min(6),
  fullname: z.string().min(6),
  email: z.string().min(6),
  password: z.string().min(8),
  type: z.enum(["student", "teacher"]),
});

export const userSignInBodySchema = z.object({
  username: z.string().min(6),
  password: z.string().min(8),
});

export const userEditBodySchema = z.object({
  fullname: z.string().min(6).optional(),
  email: z.string().optional(),
  password: z.string().min(8).optional(),
  type: z.enum(["student", "teacher"]).optional(),
});
