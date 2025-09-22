import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "items", required: true }, // <-- ref matches items model
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, trim: true },
  reviewDate: { type: Date, default: Date.now },
});

reviewSchema.index({ productId: 1, orderId: 1, userId: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
