import { z } from "zod";

// Single product in order
const orderProductSchema = z.object({
  productId: z.string().nonempty("Product ID is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be >= 0"),
});

// Create Order Schema
export const createOrderSchema = z.object({
  body: z.object({
    orderId:z.string().optional(),
    customer: z.string().nonempty("Customer ID is required"),
    vendors: z.array(z.string().nonempty("Vendor ID is required")).nonempty("At least one vendor is required"),
    products: z.array(orderProductSchema).nonempty("Products cannot be empty"),
    totalAmount: z.number().min(0, "Total amount must be >= 0"),
    status: z.enum(["pending", "completed", "canceled"]).optional(),
  }),
});

// Update Order Schema
export const updateOrderSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "completed", "canceled"]).optional(),
  }),
});

export const orderValidation = {
  createOrderSchema,
  updateOrderSchema,
};
