"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    vendor: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: { type: [String], default: [] },
    status: { type: String, enum: ["active", "draft", "hidden"], default: "draft" },
}, { timestamps: true });
exports.ProductModel = (0, mongoose_1.model)("Product", ProductSchema);
