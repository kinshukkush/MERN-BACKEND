import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import {
  newOrder,
  showOrders,
  showAllOrders,
  updateOrder,
  deleteOrder
} from "../controllers/orderController.js";
const Router = express.Router();

Router.post("/", newOrder);
Router.get("/", authenticate, authorize("admin"), showAllOrders);
Router.patch("/:id", authenticate, authorize("admin"), updateOrder);
Router.delete("/:id", authenticate, authorize("admin"), deleteOrder);
Router.get("/:id", showOrders);

export default Router;
