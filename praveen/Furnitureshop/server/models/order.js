import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
      name: { type: String, required: true },
      woodType: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: { 
    type: String, 
    enum: ["Pending", "Paid", "Failed"], 
    required: true 
  },
  orderStatus: { 
    type: String, 
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"], 
    required: true 
  },
  shippingAddress: {
    doorNo: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    landmark: { type: String },
  },
  orderDate: { type: Date, required: true, default: Date.now },
  stockReduced: { type: Boolean, default: false },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
