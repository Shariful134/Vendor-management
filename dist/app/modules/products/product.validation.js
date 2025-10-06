"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = exports.updateProductSchema = exports.createProductSchema = exports.productStatusEnum = void 0;
const zod_1 = require("zod");
// Product status enum
exports.productStatusEnum = zod_1.z.enum(["active", "draft", "hidden"]).default("draft");
// Create Product Schema
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty("Product name is required").trim(),
        vendor: zod_1.z.string().nonempty("Vendor ID is required").trim(),
        price: zod_1.z.number().min(0, "Price must be greater than or equal to 0"),
        stock: zod_1.z.number().min(0, "Stock must be greater than or equal to 0").optional(),
        images: zod_1.z.array(zod_1.z.string().nonempty("Product image URL is required")).optional(),
        status: exports.productStatusEnum.optional(),
    }),
});
// Update Product Schema
exports.updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().optional(),
        price: zod_1.z.number().min(0).optional(),
        stock: zod_1.z.number().min(0).optional(),
        status: exports.productStatusEnum.optional(),
        images: zod_1.z.array(zod_1.z.string().nonempty("Product image URL is required")).optional(),
    }),
});
exports.productValidation = {
    createProductSchema: exports.createProductSchema,
    updateProductSchema: exports.updateProductSchema,
};
