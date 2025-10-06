import { z } from "zod";

// Role enum fix
export const userRoleEnum = z
  .enum(["Admin", "Vendor", "Customer"])
  .default("Customer");

// Register Schema
const userRegisterSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required").trim(),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email format")
      .trim(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .trim(),
      shopName:z.string().trim().optional(),
      address:z.string().trim().optional(),
      phoneNumber:z.string().trim().optional(),
    role: userRoleEnum.optional(),
  }),
});

// Update Schema
const userRegisterUpdateSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    email: z.string().email("Invalid email format").trim().optional(),
     shopName:z.string().trim().optional(),
      address:z.string().trim().optional(),
      phoneNumber:z.string().trim().optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .trim()
      .optional(),
    role: userRoleEnum.optional(),
  }),
});

// Change Password Schema
const changesPasswordUpdateSchema = z.object({
  body: z.object({
    currentPassword: z.string().nonempty("Current Password is required").trim(),
    newPassword: z
      .string()
      .min(6, "New Password must be at least 6 characters")
      .trim(),
  }),
});

// Login Schema
const loginValidationschema = z.object({
  body: z.object({
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email format"),
    password: z.string().nonempty("Password is required"),
  }),
});

export const authValidation = {
  userRegisterSchema,
  loginValidationschema,
  userRegisterUpdateSchema,
  changesPasswordUpdateSchema,
};
