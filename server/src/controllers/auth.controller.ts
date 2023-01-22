import { RequestHandler } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import Err from "../utils/error";
import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../utils/envalid";
import Token from "../models/token";

export const signup: RequestHandler = asyncHandler(async (req, res, next) => {
  const { email, password, firstname, mobile } = req.body;
  const ifUser = await User.findOne({ email });
  if (ifUser) throw new Err("User already exist", 409);
  const newUser = new User({
    email,
    password: hashSync(password, 10),
    firstname,
    mobile,
  });
  const user = await newUser.save();
  const access_token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
    expiresIn: "30m",
  });
  const refresh_token = jwt.sign({ id: user._id }, env.JWT_REFRESH_SECRET);
  const saveToken = new Token({
    token: refresh_token,
  });
  await saveToken.save();
  res.json({ user, refresh_token, access_token });
});
