import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    mobile: {
      prefix: String,
      number: String,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    fistname: {
      type: String,
      required: true,
    },
    lastname: String,
    avatar: String,
    savedAddress: [
      {
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
    ],
    wishlists: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
        },
      },
    ],
    orders: [
      {
        orderId: {
          type: Schema.Types.ObjectId,
          ref: "orders",
          required: true,
        },
      },
    ],
    notifications: [
      {
        notification: {
          notificationType: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          image: String,
        },
      },
    ],
    notify: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        review: { type: Schema.Types.ObjectId, ref: "reviews" },
      },
    ],
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

type userSchemaType = InferSchemaType<typeof userSchema>;

export default model<userSchemaType>("users", userSchema);
