import express from "express";
import {
  addOrRemoveProductFromWishList,
  createProduct,
  deleteProduct,
  deleteReview,
  generateHomePage,
  getProduct,
  getProducts,
  getReviewsOfProduct,
  reviewProduct,
  updateProduct,
  updateReview,
} from "../controllers/product.controller";
import { isAdmin, isAuthenticated } from "../middlewares/auth";
const router = express.Router();

router.route("/new").post(isAuthenticated, isAdmin, createProduct);

router.route("/query").post(getProducts);

router.route("/homepage").get(generateHomePage);

router
  .route("/:id")
  .get(getProduct)
  .put(isAuthenticated, isAdmin, updateProduct)
  .delete(isAuthenticated, isAdmin, deleteProduct);

router.route("/reviews/:id").get(getReviewsOfProduct);

router
  .route("/wishlist/:productId")
  .put(isAuthenticated, addOrRemoveProductFromWishList);

router
  .route("/review/:id")
  .post(isAuthenticated, reviewProduct)
  .put(isAuthenticated, updateReview)
  .delete(isAuthenticated, deleteReview);

export default router;
