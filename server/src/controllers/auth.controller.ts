import { RequestHandler } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import Err from "../utils/error";

export const signup: RequestHandler = asyncHandler(
  async (req, res, next) => {}
);
