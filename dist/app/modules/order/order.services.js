"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const order_model_1 = __importDefault(require("./order.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const orderSearchableFields = ["status"];
// Create Order
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Last order check
    const lastOrder = yield order_model_1.default.findOne().sort({ createdAt: -1 });
    // 2. Next order number calculate
    let nextNumber = 1;
    if (lastOrder && lastOrder.orderId) {
        const match = lastOrder.orderId.match(/ORD-(\d+)/);
        if (match)
            nextNumber = parseInt(match[1]) + 1;
    }
    // 3. Format ID like ORD-0012
    const orderId = `ORD-${String(nextNumber).padStart(4, "0")}`;
    // 4. Create order
    const result = yield order_model_1.default.create(Object.assign(Object.assign({}, payload), { orderId }));
    return result;
});
// Update Order
const updateOrderIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Order not found!");
    }
    return result;
});
// Get Single Order
const getSingleOrderIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findById(id)
        .populate("customer", "name email")
        .populate("vendors", "name email")
        .populate("products.productId", "name price");
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Order not found!");
    }
    return result;
});
// Get All Orders with Pagination
const getAllOrderIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const orderQuery = new QueryBuilder_1.default(order_model_1.default.find(), query)
        .search(orderSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield orderQuery.modelQuery;
    const meta = yield orderQuery.countTotal();
    return { result, meta };
});
// Delete Order
const deleteOrderIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Order not found!");
    }
    return result;
});
exports.orderServices = {
    createOrderIntoDB,
    updateOrderIntoDB,
    getSingleOrderIntoDB,
    getAllOrderIntoDB,
    deleteOrderIntoDB,
};
