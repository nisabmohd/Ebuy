const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: [1, "Minimum ratings could be 1"],
      max: [5, "Maximum ratings could be 5"],
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: [true, "Please mention product id"],
    },
    images: [{ img: { type: String, required: true } }],
    likes: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
      },
    ],
    dislikes: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = new model("reviews", reviewSchema);
