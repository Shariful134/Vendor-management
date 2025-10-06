
import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  vendor: Types.ObjectId; 
  price: number;
  stock: number;
  images:[string];
  status: "active" | "draft" | "hidden";
  createdAt: Date;
  updatedAt: Date;
}
