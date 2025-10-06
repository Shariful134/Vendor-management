import mongoose, { Schema, model } from "mongoose";
import { IOrder, OrderProduct } from "./order.interface";


const OrderProductSchema = new Schema<OrderProduct>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type:String,  required: true },
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vendors: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    products: { type: [OrderProductSchema], required: true, validate: (v:any) => v.length > 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.models.Order || model<IOrder>("Order", OrderSchema);
export default OrderModel;
