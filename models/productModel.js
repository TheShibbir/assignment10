const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    ProductCreatedBy: {
      type: String,
      trim: true,
      required: [true, "ProductCreator name is required"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Price is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;