import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/product.controller";
import { isAdmin, isAuthenticated } from "../middlewares/auth";
const router = express.Router();

router.route("/new").post(isAuthenticated, isAdmin, createProduct);

router
  .route("/:id")
  .get(isAuthenticated, getProduct)
  .put(isAuthenticated, isAdmin, updateProduct)
  .delete(isAuthenticated, isAdmin, deleteProduct);

export default router;
