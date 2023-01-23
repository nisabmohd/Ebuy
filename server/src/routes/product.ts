import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  reviewProduct,
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

router.route("/review/:id").post(isAuthenticated, reviewProduct);

export default router;
