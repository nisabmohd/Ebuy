const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    brand: {
      name: String,
      warranty: String,
    },
    description: {
      type: String,
      require: true,
    },
    colors: [
      {
        color: String,
        image: String,
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
    images: {
      type: [
        {
          img: String,
        },
      ],
      validate: [imagesValidator, "Atleast there should be 3 product images"],
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
        note: String,
      },
    ],
    highlightedImages: [
      {
        img: String,
      },
    ],
  },
  { timestamps: true }
);

function imagesValidator(val) {
  return val.length >= 3;
}

module.exports = new model("products", productSchema);
