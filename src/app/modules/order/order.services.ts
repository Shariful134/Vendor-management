import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import OrderModel from "./order.model";
import { IOrder } from "./order.interface";
import QueryBuilder from "../../builder/QueryBuilder";

const orderSearchableFields = ["status"];

// Create Order
const createOrderIntoDB = async (payload: IOrder) => {
  // 1. Last order check
  const lastOrder = await OrderModel.findOne().sort({ createdAt: -1 });

  // 2. Next order number calculate
  let nextNumber = 1;
  if (lastOrder && lastOrder.orderId) {
    const match = lastOrder.orderId.match(/ORD-(\d+)/);
    if (match) nextNumber = parseInt(match[1]) + 1;
  }

  // 3. Format ID like ORD-0012
  const orderId = `ORD-${String(nextNumber).padStart(4, "0")}`;

  // 4. Create order
  const result = await OrderModel.create({ ...payload, orderId });
  return result;
};

// Update Order
const updateOrderIntoDB = async (id: string, payload: Partial<IOrder>) => {
  const result = await OrderModel.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found!");
  }
  return result;
};

// Get Single Order
const getSingleOrderIntoDB = async (id: string) => {
  const result = await OrderModel.findById(id)
    .populate("customer", "name email")
    .populate("vendors", "name email")
    .populate("products.productId", "name price");

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found!");
  }
  return result;
};

// Get All Orders with Pagination
const getAllOrderIntoDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(OrderModel.find(), query)
    .search(orderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return { result, meta };
};

// Delete Order
const deleteOrderIntoDB = async (id: string) => {
  const result = await OrderModel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found!");
  }
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  updateOrderIntoDB,
  getSingleOrderIntoDB,
  getAllOrderIntoDB,
  deleteOrderIntoDB,
};
