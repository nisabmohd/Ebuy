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

export const getProducts = asyncHandler(async (req, res, next) => {
  let {
    category,
    page,
    sortby,
    ratings,
    low,
    high,
    search,
    limit = 1,
  } = req.body;
  page = page ? page - 1 : 0;
  const getQuery = () => {
    let query;
    if (category) {
      const categoryArray = (category as string)
        .split("-")
        .map((item: string) => new RegExp(item, "i"));
      query = Product.find({
        category: {
          $all: categoryArray,
        },
        rating: { $gte: ratings ? parseInt(ratings as string) : 0 },
        discountedPrice: {
          $gte: low ? parseInt(low as string) : 0,
          $lte: high ? parseInt(high as string) : 1000000,
        },
      });
    } else {
      const searchArray = [search as string].map(
        (item: string) => new RegExp(item, "i")
      );
      query = Product.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { query: { $in: searchArray } },
        ],
        rating: { $gte: ratings ? parseInt(ratings as string) : 0 },
        discountedPrice: {
          $gte: low ? parseInt(low as string) : 0,
          $lte: high ? parseInt(high as string) : 1000000,
        },
      });
    }
    if (sortby === "lowtohigh")
      query = query.sort({
        originalPrice: 1,
      });
    if (sortby === "hightolow")
      query = query.sort({
        originalPrice: -1,
      });
    if (sortby === "newestfirst") {
      query = query.sort({ updatedAt: -1 });
    }
    if (sortby === "popularity") {
      query = query.sort({ ratings: 1 });
    }
    return query;
  };
  const result: any = {};
  const total = await getQuery().countDocuments();
  result.total = total;
  const startIndex = page * limit;
  const endIndex = (page + 1) * limit;
  if (startIndex > 0) {
    result.previous = {
      pageNumber: page - 1,
      limit: limit,
    };
  }
  if (endIndex < total) {
    result.next = {
      pageNumber: page + 1,
      limit: limit,
    };
  }
  result.data = await getQuery().limit(limit).skip(startIndex);
  res.json(result);
});

// User
//------
export const reviewProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;
  const user = await User.findOne({ _id: userId });
  const product = await Product.findOne({ _id: id });
  if (!product) throw new ServerError("No products found", 404);
  const review = await new Review({
    userId,
    productId: id,
    username: user!.firstname,
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

export const addOrRemoveProductFromWishList = asyncHandler(
  async (req, res, next) => {
    const { productId } = req.params;
    if (!productId) throw new ServerError("Enter productId", 400);
    const wishlist = await User.findOne({ _id: req.userId });
    if (!wishlist?.wishlists.includes(productId!)) {
      const updated = await User.updateOne(
        { _id: req.userId },
        { $push: { wishlists: productId } }
      );
      res.json({
        success: updated.modifiedCount == 1,
      });
    } else {
      const updated = await User.updateOne(
        { _id: req.userId },
        { $pull: { wishlists: productId } }
      );
      res.json({
        success: updated.modifiedCount == 1,
      });
    }
  }
);

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
