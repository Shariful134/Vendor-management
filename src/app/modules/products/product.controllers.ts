import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { productServices } from "./product.service";


// Create Product
const createProduct = catchAsync(async (req, res) => {
    
const { body } = req;


  if (req.files && Array.isArray(req.files)) {
    body.images = (req.files as Express.Multer.File[]).map(file => file.path);
  }

  console.log(body, 'checking body data ==========>')



    
  const result = await productServices.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

// Update Product
const updateProduct = catchAsync(async (req, res) => {

   
const { body } = req;


  if (req.files && Array.isArray(req.files)) {
    body.images = (req.files as Express.Multer.File[]).map(file => file.path);
  }

  console.log(body, 'checking body data ==========>')


  const { id } = req.params;
  const result = await productServices.updateProductIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// Get Single Product
const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productServices.getSingleProductIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

// Get All Products
const getAllProduct = catchAsync(async (req, res) => {
  const { result, meta } = await productServices.getAllProductIntoDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Products retrieved successfully",
    meta,
    data: result,
  });
});

// Delete Product
const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productServices.deleteProductIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const productControllers = {
  createProduct,
  updateProduct,
  getSingleProduct,
  getAllProduct,
  deleteProduct,
};
