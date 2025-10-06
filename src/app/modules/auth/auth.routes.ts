import express from "express";
import { authValidation } from "./auth.validation";
import { authControllers } from "./auth.controllers";
import validateRequest from "../../../middlewares/ValidateRequest";
import auth from "../../../middlewares/auth";

const router = express.Router();

// User register
router.post(
  "/register-user",
  validateRequest(authValidation.userRegisterSchema),
  authControllers.registerUser
);

// User login
router.post(
  "/login",
  validateRequest(authValidation.loginValidationschema),
  authControllers.loginUser
);

// Logout Route
router.post("/logout", auth("Admin", "Customer", "Vendor"), authControllers.logoutUser);

// getAll User
router.get("/get",auth("Admin", "Customer", "Vendor"), authControllers.getAllUser);

// getSingle User
router.get("/get/:id",auth("Admin", "Customer", "Vendor"), authControllers.getSingleUser);

// getSingle User
router.delete("/delete/:id", auth("Admin"), authControllers.deleteUser);



export const AuthRoutes = router;
