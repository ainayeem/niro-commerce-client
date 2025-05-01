import { z } from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z.string({ required_error: "Old Password is required" }).min(6, "Password must be at least 6 characters"),
  newPassword: z.string({ required_error: "New Password is required" }).min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string({ required_error: "Confirm Password is required" }).min(6, "Password must be at least 6 characters"),
});
