import { Schema, model, InferSchemaType } from "mongoose";

const orderSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["FAILED", "DONE", "PROCESSING"],
    },
    paymentMode: {
      type: String,
      enum: ["COD", "CARD"],
    },
    status: {
      type: String,
      enum: ["DELIVERED", "CANCELLED", "PROCESSING", "CONFIRMED"],
      default: "PROCESSING",
    },
    transactionID: String,
    deliveryAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      phone: [
        {
          number: String,
          prefix: String,
          required: true,
        },
      ],
    },
    invoice: {
      sellingPrice: Number,
      discount: Number,
      shippingFee: Number,
      totalAmount: Number,
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: "reviews",
    },
  },
  { timestamps: true }
);

type orderSchemaType = InferSchemaType<typeof orderSchema>;
export default model<orderSchemaType>("orders", orderSchema);
