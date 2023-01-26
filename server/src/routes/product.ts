import express from "express";
import {
  createProduct,
  deleteProduct,
  deleteReview,
  getProduct,
  reviewProduct,
  updateProduct,
  updateReview,
} from "../controllers/product.controller";
import { isAdmin, isAuthenticated } from "../middlewares/auth";
const router = express.Router();

router.route("/new").post(isAuthenticated, isAdmin, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .put(isAuthenticated, isAdmin, updateProduct)
  .delete(isAuthenticated, isAdmin, deleteProduct);

router
  .route("/review/:id")
  .post(isAuthenticated, reviewProduct)
  .put(isAuthenticated, updateReview)
  .delete(isAuthenticated, deleteReview);

export default router;
