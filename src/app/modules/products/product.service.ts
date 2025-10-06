import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { ProductModel } from "./product.model";
import { IProduct } from "./product.interface";
import QueryBuilder from "../../builder/QueryBuilder";

const productSearchableFields = ["name", "status"];

// Create Product
const createProductIntoDB = async (payload: IProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

// Update Product
const updateProductIntoDB = async (id: string, payload: Partial<IProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found!");
  }
  return result;
};

// Get Single Product
const getSingleProductIntoDB = async (id: string) => {
  const result = await ProductModel.findById(id).populate("vendor", "name email shopName phoneNumber address");
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found!");
  }
  return result;
};

// Get All Products with Pagination
const getAllProductIntoDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(ProductModel.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return { result, meta };
};

// Delete Product
const deleteProductIntoDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found!");
  }
  return result;
};

export const productServices = {
  createProductIntoDB,
  updateProductIntoDB,
  getSingleProductIntoDB,
  getAllProductIntoDB,
  deleteProductIntoDB,
};
