import asyncHandler from "express-async-handler";
import User from "../models/user";
import ServerError from "../utils/error";

export const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { id } = req.params;
  if (userId != id) throw new ServerError("No permission", 403);
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ServerError("No user found", 404);
  res.json(user);
});

export const getWishList = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { id } = req.params;
  if (userId != id) throw new ServerError("No permission", 403);
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ServerError("No user found", 404);
  res.json(user.wishlists);
});

export const editUserDetails = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { id } = req.params;
  if (userId != id) throw new ServerError("No permission", 403);
  const updated = await User.findOneAndUpdate(
    { _id: userId },
    { $set: req.body },
    { new: true }
  );
  res.json(updated);
});
