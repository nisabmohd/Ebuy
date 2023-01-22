import { Schema, model, InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    brand: String,
    description: {
      type: String,
      require: true,
    },
    colors: [
      {
        color: String,
        image: [{ type: String }],
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "reviews",
        required: true,
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
  },
  { timestamps: true }
);

type productSchemaType = InferSchemaType<typeof productSchema>;
export default model<productSchemaType>("products", productSchema);
