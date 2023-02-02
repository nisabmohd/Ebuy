import { Schema, model, InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    brand: String,
    colors: [
      {
        color: String,
        images: [{ type: String }],
      },
    ],
    reviews: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        reviewId: {
          type: Schema.Types.ObjectId,
          ref: "reviews",
          required: true,
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    originalPrice: {
      type: Number,
      require: true,
    },
    discountedPrice: {
      type: Number,
      require: true,
    },
    highlights: [
      {
        type: String,
      },
    ],
    highlightedImages: [
      {
        type: String,
      },
    ],
    specifications: {
      type: {},
    },
    category: [
      {
        type: String,
      },
    ],
    query: [{ type: String }],
    sex: {
      type: String,
      enum: ["MALE", "FEMALE", "NONE"],
      default: "NONE",
    },
  },
  { timestamps: true }
);

type productSchemaType = InferSchemaType<typeof productSchema>;
export default model<productSchemaType>("products", productSchema);
