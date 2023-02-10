import express from "express";
import { getWishList } from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.route("/wishlist").get(isAuthenticated, getWishList);

export default router;
