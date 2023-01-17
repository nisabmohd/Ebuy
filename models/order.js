const { Schema, model } = require("mongoose");

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
    transactionID: string,
    deliveryAddress: {
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required for an address feild"],
      },
      state: {
        type: String,
        required: [true, "State is required for an address feild"],
      },
      phone: [
        {
          number: String,
          prefix: String,
          required: [true, "Invalid phone number provided"],
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

module.exports = new model("orders", orderSchema);
