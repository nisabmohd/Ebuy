const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      validate: [validateEmail, "Invalid email"],
    },
    mobile: { number: String, prefix: String },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [6, "Password is too short"],
    },
    firstName: {
      type: String,
      required: [true, "Firstname is needed"],
    },
    lastname: String,
    avatar: String,
    savedAddress: [
      {
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
    //   savedCards: [],
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

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = new model("users", userSchema);
