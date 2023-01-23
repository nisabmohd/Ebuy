import asyncHandler from "express-async-handler";
import Product from "../models/product";
import Blunder from "../utils/error";
import Review from "../models/review";
import User from "../models/user";

export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) throw new Blunder("No products found", 404);
  res.json(product);
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const updated = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.json({
    success: updated.modifiedCount != 0,
    message: updated.modifiedCount
      ? "Successfully  updated"
      : "Could not find the product",
  });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const deleted = await Product.deleteOne({ _id: req.params.id });
  res.json({
    success: deleted.deletedCount != 0,
    message: deleted.deletedCount
      ? "Successfully  deleted"
      : "Could not find the product",
  });
});

export const createProduct = asyncHandler(async (req, res, next) => {
  const product = await new Product(req.body).save();
  res.json(product);
});

export const reviewProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;
  const product = await Product.findOne({ _id: id });
  if (!product) throw new Blunder("No products found", 404);
  const review = await new Review({
    userId,
    productId: id,
    ...req.body,
  }).save();
  const reviewed = await Product.updateOne(
    { _id: id },
    {
      $push: { reviews: review._id },
      $set: {
        rating:
          (product!.rating + req.body.rating) / (product!.reviews.length + 1),
      },
    }
  );
  await User.updateOne({ _id: userId }, { $push: { reviews: review._id } });
  res.json({
    success: reviewed.modifiedCount != 0,
    message: reviewed.modifiedCount
      ? "Succesfully added review"
      : "Unable to review",
  });
});
