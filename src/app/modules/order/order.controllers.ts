import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { orderServices } from "./order.services";

// Create Order
const createOrder = catchAsync(async (req, res) => {
  const result = await orderServices.createOrderIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

// Update Order
const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderServices.updateOrderIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order updated successfully",
    data: result,
  });
});

// Get Single Order
const getSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderServices.getSingleOrderIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order retrieved successfully",
    data: result,
  });
});

// Get All Orders
const getAllOrders = catchAsync(async (req, res) => {
  const { result, meta } = await orderServices.getAllOrderIntoDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Orders retrieved successfully",
    meta,
    data: result,
  });
});

// Delete Order
const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderServices.deleteOrderIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order deleted successfully",
    data: result,
  });
});

export const orderControllers = {
  createOrder,
  updateOrder,
  getSingleOrder,
  getAllOrders,
  deleteOrder,
};
