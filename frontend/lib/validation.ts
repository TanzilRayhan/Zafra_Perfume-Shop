import { z } from "zod";

// Login form schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Register form schema
export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(50, "Full name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits"),
  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

// Type inference
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
