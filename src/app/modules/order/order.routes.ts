import express from "express";
import { orderControllers } from "./order.controllers";


const router = express.Router();

// CRUD Routes
router.post("/", orderControllers.createOrder);
router.get("/", orderControllers.getAllOrders);
router.get("/:id", orderControllers.getSingleOrder);
router.patch("/:id", orderControllers.updateOrder);
router.delete("/:id", orderControllers.deleteOrder);



export const OrderRoutes = router;
