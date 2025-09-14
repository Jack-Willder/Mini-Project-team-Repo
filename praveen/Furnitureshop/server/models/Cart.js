import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String },
      woodType: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalAmount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["active", "ordered", "cleared", "abandoned"],
    default: "active"
  }
}, { timestamps: true });
const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
