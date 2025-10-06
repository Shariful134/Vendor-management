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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const auth_model_1 = require("./auth.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const config_1 = __importDefault(require("../../../config"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const userSearchableFields = ["name", "email", "role"];
//register User
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.isUserExistsByEmail(payload.email);
    if (user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Email Already Registered!");
    }
    const result = yield auth_model_1.User.create(payload);
    const _a = result.toObject(), { password } = _a, userData = __rest(_a, ["password"]);
    return userData;
});
// loggin user
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.isUserExistsByEmail(payload.email);
    //checking user is exists
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User is not found!");
    }
    //checking if the password is correct or uncorrect
    if (!(yield auth_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Password does not match!");
    }
    const jwtPayload = {
        id: user._id,
        userEmail: user.email,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: "30d",
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, {
        expiresIn: "30d",
    });
    return { accessToken, refreshToken };
});
// Get Single User
const getSingleUserIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User is not Found!");
    }
    return result;
});
// Get All User 
const getAllUserIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new QueryBuilder_1.default(auth_model_1.User.find(), query)
        .search(userSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield user.modelQuery;
    const meta = yield user.countTotal();
    //checking user is exists
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User is not Found!");
    }
    return { result, meta };
});
// Delete User
const deleteUserIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findByIdAndDelete(id);
    //checking user is exists
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User is not Found!");
    }
    return result;
});
exports.authServices = {
    registerUserIntoDB,
    loginUserIntoDB,
    getAllUserIntoDB,
    getSingleUserIntoDB,
    deleteUserIntoDB,
};
