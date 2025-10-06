import express from "express";

import { productValidation } from "./product.validation";
import validateRequest from "../../../middlewares/ValidateRequest";
import { productControllers } from "./product.controllers";
import { fileUploader } from "../../../utils/uploads";
import auth from "../../../middlewares/auth";
import { parseBodyData } from "../../../utils/parsBody";

const router = express.Router();


router.post("/",auth("Admin", "Vendor"), fileUploader.upload.array("images"), 
 parseBodyData,  validateRequest(productValidation.createProductSchema), productControllers.createProduct);
router.get("/", productControllers.getAllProduct);
router.get("/:id", productControllers.getSingleProduct);
router.patch("/update/:id", auth("Admin", "Vendor"), fileUploader.upload.array("images"), 
 parseBodyData, validateRequest(productValidation.updateProductSchema), productControllers.updateProduct);
router.delete("/delete/:id", auth("Admin", "Vendor"), productControllers.deleteProduct);


export const ProductRouters = router;


