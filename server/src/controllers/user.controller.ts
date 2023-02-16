import asyncHandler from "express-async-handler";
import Order from "../models/order";
import Product from "../models/product";
import User from "../models/user";
import ServerError from "../utils/error";

export const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ServerError("No user found", 404);
  res.json(user);
});

export const getOrders = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ServerError("No user found", 404);
  const orders = await Promise.all(
    user.orders.map(async (item) => {
      return await Order.findOne({ _id: item.orderId });
    })
  );
  res.json(orders);
});

export const getNotifications = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ServerError("No user found", 404);
  res.json(user.notifications);
});

export const getWishList = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ServerError("No user found", 404);
  const list = await Promise.all(
    user.wishlists
      .reverse()
      .map(async (item) => await Product.findOne({ _id: item }))
  );
  res.json(list);
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
