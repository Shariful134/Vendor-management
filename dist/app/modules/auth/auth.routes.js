"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_validation_1 = require("./auth.validation");
const auth_controllers_1 = require("./auth.controllers");
const ValidateRequest_1 = __importDefault(require("../../../middlewares/ValidateRequest"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const router = express_1.default.Router();
// User register
router.post("/register-user", (0, ValidateRequest_1.default)(auth_validation_1.authValidation.userRegisterSchema), auth_controllers_1.authControllers.registerUser);
// User login
router.post("/login", (0, ValidateRequest_1.default)(auth_validation_1.authValidation.loginValidationschema), auth_controllers_1.authControllers.loginUser);
// Logout Route
router.post("/logout", (0, auth_1.default)("Admin", "Customer", "Vendor"), auth_controllers_1.authControllers.logoutUser);
// getAll User
router.get("/get", (0, auth_1.default)("Admin", "Customer", "Vendor"), auth_controllers_1.authControllers.getAllUser);
// getSingle User
router.get("/get/:id", (0, auth_1.default)("Admin", "Customer", "Vendor"), auth_controllers_1.authControllers.getSingleUser);
// getSingle User
router.delete("/delete/:id", (0, auth_1.default)("Admin"), auth_controllers_1.authControllers.deleteUser);
exports.AuthRoutes = router;
