import { Schema, model, InferSchemaType } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    images: [{ type: String, required: true }],
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

type reviewSchemaType = InferSchemaType<typeof reviewSchema>;
export default model<reviewSchemaType>("reviews", reviewSchema);
