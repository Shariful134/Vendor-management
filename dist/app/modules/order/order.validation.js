"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = exports.updateOrderSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
// Single product in order
const orderProductSchema = zod_1.z.object({
    productId: zod_1.z.string().nonempty("Product ID is required"),
    quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
    price: zod_1.z.number().min(0, "Price must be >= 0"),
});
// Create Order Schema
exports.createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        orderId: zod_1.z.string(),
        customer: zod_1.z.string().nonempty("Customer ID is required"),
        vendors: zod_1.z.array(zod_1.z.string().nonempty("Vendor ID is required")).nonempty("At least one vendor is required"),
        products: zod_1.z.array(orderProductSchema).nonempty("Products cannot be empty"),
        totalAmount: zod_1.z.number().min(0, "Total amount must be >= 0"),
        status: zod_1.z.enum(["pending", "completed", "canceled"]).optional(),
    }),
});
// Update Order Schema
exports.updateOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["pending", "completed", "canceled"]).optional(),
    }),
});
exports.orderValidation = {
    createOrderSchema: exports.createOrderSchema,
    updateOrderSchema: exports.updateOrderSchema,
};
