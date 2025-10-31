import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import { addProduct,showProducts,deleteProduct,updateProduct,getProduct,displayProducts } from "../controllers/productController.js";

const Router = express.Router();

// Debug middleware
Router.use((req, res, next) => {
  console.log(`📦 Product Route: ${req.method} ${req.path}`);
  next();
});

//user - public routes (no auth needed)
Router.get("/all", displayProducts);

//admin - protected routes (auth required)
Router.get("/", authenticate, authorize("admin"), showProducts);
Router.get("/:id", getProduct); // Public - for viewing single product
Router.post("/", authenticate, authorize("admin"), addProduct);
Router.patch("/:id", authenticate, authorize("admin"), updateProduct);
Router.delete("/:id", authenticate, authorize("admin"), deleteProduct);

export default Router;
