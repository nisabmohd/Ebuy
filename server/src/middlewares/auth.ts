import asyncHandler from "express-async-handler";
import ServerError from "../utils/error";
import jwt from "jsonwebtoken";
import env from "../utils/envalid";
import User from "../models/user";

export interface JWTPayload {
  id: string;
  iat: number;
}

export const isAuthenticated = asyncHandler((req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) throw new ServerError("Unauthorised", 401);
  const decoded = <JWTPayload>jwt.verify(token, env.JWT_SECRET);
  req.userId = decoded.id;
  next();
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.userId });
  if (user!.role === "USER") throw new ServerError("No permission", 403);
  next();
});
