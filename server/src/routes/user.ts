import express from "express";
import {
  editUserDetails,
  getNotifications,
  getOrders,
  getUser,
  getWishList,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.route("/wishlist").get(isAuthenticated, getWishList);
router.route("/myprofile").get(isAuthenticated, getUser);
router.route("/myorders").get(isAuthenticated, getOrders);
router.route("/mynotifications").get(isAuthenticated, getNotifications);
router.route("/edit").put(isAuthenticated, editUserDetails);

export default router;
