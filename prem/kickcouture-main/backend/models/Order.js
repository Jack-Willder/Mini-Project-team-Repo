const { boolean } = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
  status: { type: String, enum: ["cart", "pending", "shipped", "delivered"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("order", orderSchema,"order");