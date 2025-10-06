import { Document, Types } from "mongoose";

export type OrderStatus = "pending" | "completed" | "canceled";

export interface OrderProduct {
  productId: Types.ObjectId;
  quantity: number;
  price: number; 
}

export interface IOrder extends Document {
   orderId:string;
  customer: Types.ObjectId;
  vendors: Types.ObjectId[]; 
  products: OrderProduct[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
