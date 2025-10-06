import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authServices } from "./auth.services";
import config from "../../../config";

//register User
const registerUser = catchAsync(async (req, res) => {
  const result = await authServices.registerUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Registration Successfully",
    data: result,
  });
});

//login User
const loginUser = catchAsync(async (req, res, next) => {
  const result = await authServices.loginUserIntoDB(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Login Successfully!",
    data: accessToken,
  });
});

// Logout User
const logoutUser = catchAsync(async (req, res) => {
  // Clear the refresh token cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Logged out successfully!",
    data: null,
  });
});

//getSingle User
const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await authServices.getSingleUserIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Retrived Successfully",
    data: result,
  });
});

//getAll User
const getAllUser = catchAsync(async (req, res) => {
  const { result, meta } = await authServices.getAllUserIntoDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All User Retrived Successfully",
    meta,
    data: result,
  });
});


//getAll 
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await authServices.deleteUserIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Deleted Successfully",
    data: result,
  });
});

export const authControllers = {
  registerUser,
  loginUser,
  getSingleUser,
  logoutUser,
  getAllUser,
  deleteUser,

};
