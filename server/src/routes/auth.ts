import express from "express";
import {
  signup,
  signin,
  signout,
  handleToken,
} from "../controllers/auth.controller";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/signout").post(signout);
router.route("/token").post(handleToken);

export default router;
