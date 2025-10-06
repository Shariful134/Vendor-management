import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { ProductRouters } from "../modules/products/product.rotues";
import { OrderRoutes } from "../modules/order/order.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/product",
    route: ProductRouters,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
