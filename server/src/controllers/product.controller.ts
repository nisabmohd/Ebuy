import asyncHandler from "express-async-handler";
import Product from "../models/product";
import ServerError from "../utils/error";
import Review from "../models/review";
import User from "../models/user";

// Generic
//---------
export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) throw new ServerError("No products found", 404);
  res.json(product);
});

export const getReviewsOfProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) throw new ServerError("No products found", 404);
  const reviews = await Promise.all(
    product.reviews.map(
      async (item) => await Review.findOne({ _id: item.reviewId })
    )
  );
  res.send(reviews);
});

// User
//------
export const reviewProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;
  const product = await Product.findOne({ _id: id });
  if (!product) throw new ServerError("No products found", 404);
  const review = await new Review({
    userId,
    productId: id,
    ...req.body,
  }).save();
  const reviewed = await Product.updateOne(
    { _id: id },
    {
      $push: { reviews: { userId, reviewId: review._id } },
      $set: {
        rating:
          (product!.rating + req.body.rating) / (product!.reviews.length + 1),
      },
    }
  );
  await User.updateOne(
    { _id: userId },
    { $push: { reviews: { review: review._id } } }
  );
  res.json({
    success: reviewed.modifiedCount != 0,
    message: reviewed.modifiedCount
      ? "Succesfully added review"
      : "Unable to review",
    review,
  });
});

export const updateReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findOne({ _id: id });
  if (!review) throw new ServerError("No review found", 400);
  if (review.userId.toString() !== req.userId)
    throw new ServerError("No permission", 403);
  const newReview = await Review.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true }
  );
  const product = await Product.findOne({ productId: review.productId });
  await Product.updateOne(
    { productId: review.productId },
    {
      rating:
        (product!.rating - review.rating + newReview!.rating) /
        product!.reviews!.length,
    }
  );
  res.json({
    newReview,
  });
});

export const deleteReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findOne({ _id: id });
  if (!review) throw new ServerError("No review found", 400);
  if (review.userId.toString() !== req.userId)
    throw new ServerError("No permission", 403);
  await Review.deleteOne({ _id: id });
  const product = await Product.findOne({ productId: review.productId });
  await Product.updateOne(
    { productId: review.productId },
    {
      $set: {
        rating: (product!.rating - review.rating) / product!.reviews.length - 1,
      },
    }
  );
  await User.updateOne(
    { _id: req.userId },
    { reviews: { $pull: { review: review._id } } }
  );
  res.json({ message: "deleted" });
});

export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.findOne(req.body);
  res.json(products);
});

// Admin
//--------
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

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.json(products);
});
