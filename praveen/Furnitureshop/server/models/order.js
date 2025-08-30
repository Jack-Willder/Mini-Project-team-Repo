const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", 
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "items", 
        required: true
      },
      name: String,
      woodType: String,
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      image: String 
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    name: String,
    phone: String,
    email: String,
    address: String 
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
