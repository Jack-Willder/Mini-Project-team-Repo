const ProductModel = require("../models/Product");
const path = require("path");
const jwt = require("jsonwebtoken");
const OrderModel = require("../models/Order");

const SECRET = "productSecretKey";

// Add new Order from user using their email and the _id of the product no token just email and product id
exports.addOrder = async (req, res) => {
  try {
    const { email, productId, status } = req.body;
    if (!email || !productId) {
      return res.status(400).json({ message: "Email and Product ID are required" });
    }
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const newOrder = new OrderModel({
      email,
      productId,
      status: status || "pending"
    });
    await newOrder.save();

    return res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("productId");
    return res.status(200).json({ orders: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const orders = await OrderModel.find({ email }).populate("productId");
    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Order ID is required" });
    }
    const deletedOrder = await OrderModel.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};