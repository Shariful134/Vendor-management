
import mongoose, { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";


const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    vendor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images:{type:[String], default:[]},
    status: { type: String, enum: ["active", "draft", "hidden"], default: "draft" },
  },
  { timestamps: true } 
);

export const ProductModel = model<IProduct>("Product", ProductSchema);
