import { z } from "zod";

export const registrationSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, { message: "Name must be between 2 and 50 characters" })
      .max(50, { message: "Name must be between 2 and 50 characters" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),
    passwordConfirm: z
      .string({ required_error: "Password confirmation is required" })
      .min(1, { message: "Password confirmation cannot be empty" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });
