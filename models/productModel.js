import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      require:true
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
