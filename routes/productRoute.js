import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import { addProduct,showProducts,deleteProduct,updateProduct,getProduct,displayProducts } from "../controllers/productController.js";

const Router = express.Router();


//user 
Router.get("/all", displayProducts);

//admin - protected routes
Router.get("/", authenticate, authorize("admin"), showProducts);
Router.post("/", authenticate, authorize("admin"), addProduct);
Router.get("/:id", authenticate, authorize("admin"), getProduct);
Router.patch("/:id", authenticate, authorize("admin"), updateProduct);
Router.delete("/:id", authenticate, authorize("admin"), deleteProduct);

export default Router;
