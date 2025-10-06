import { StatusCodes } from "http-status-codes";
import { User } from "./auth.model";
import jwt from "jsonwebtoken";
import AppError from "../../../errors/AppError";
import { IUser, TUserLogin } from "./auth.interface";
import config from "../../../config";
import QueryBuilder from "../../builder/QueryBuilder";


const userSearchableFields =[ "name", "email","role"]
//register User
const registerUserIntoDB = async (payload: IUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email Already Registered!");
  }
  const result = await User.create(payload);
  const { password, ...userData } = result.toObject();

  return userData;
};

// loggin user
const loginUserIntoDB = async (payload: TUserLogin) => {
  const user = await User.isUserExistsByEmail(payload.email);

  //checking user is exists
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User is not found!");
  }

  //checking if the password is correct or uncorrect
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Password does not match!");
  }

  const jwtPayload = {
    id: user._id,
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "30d",
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: "30d",
    }
  );

  return { accessToken, refreshToken };
};

// Get Single User
const getSingleUserIntoDB = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is not Found!");
  }
  return result;
};


// Get All User 
const getAllUserIntoDB = async (query: Record<string, unknown>) => {
  const user = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await user.modelQuery;
  const meta = await user.countTotal();

  //checking user is exists
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is not Found!");
  }
  return { result, meta };
};

// Delete User
const deleteUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);

  //checking user is exists
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is not Found!");
  }

  return result;
};

export const authServices = {
  registerUserIntoDB,
  loginUserIntoDB,
  getAllUserIntoDB,
  getSingleUserIntoDB,
  deleteUserIntoDB,

};
