import { z } from "zod";

// Product status enum
export const productStatusEnum = z.enum(["active", "draft", "hidden"]).default("draft");

// Create Product Schema
export const createProductSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Product name is required").trim(),
    vendor: z.string().nonempty("Vendor ID is required").trim(),
    price: z.number().min(0, "Price must be greater than or equal to 0"),
    stock: z.number().min(0, "Stock must be greater than or equal to 0").optional(),
    images: z.array(z.string().nonempty("Product image URL is required")).optional(),
    status: productStatusEnum.optional(),
  }),
});

// Update Product Schema
export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    price: z.number().min(0).optional(),
    stock: z.number().min(0).optional(),
    status: productStatusEnum.optional(),
    images: z.array(z.string().nonempty("Product image URL is required")).optional(),
  }),
});

export const productValidation = {
  createProductSchema,
  updateProductSchema,
};
