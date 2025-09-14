// server/controllers/orderController.js
import Order from "../models/order.js";
import Cart from "../models/Cart.js";
import Item from "../models/items.js";

// -------------------- Place Order --------------------
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, paymentMethod, upiId, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Validate shippingAddress fields
    const requiredFields = ["doorNo", "street", "city", "state", "postalCode", "country"];
    for (const field of requiredFields) {
      if (!shippingAddress?.[field]) {
        return res.status(400).json({ message: `Shipping address field '${field}' is required.` });
      }
    }

    // 1️⃣ Create new order
    const order = new Order({
      userId,
      items,
      totalAmount,
      paymentStatus: paymentMethod === "Online" ? "Paid" : "Pending",
      orderStatus: "Processing",
      shippingStatus: "Pending", // optional field if you want to track shipping
      shippingAddress,
      orderDate: new Date(),
    });

    await order.save();

    // 2️⃣ Update cart status to "checkout"
    await Cart.findOneAndUpdate({ userId }, { status: "checkout" });

    // 3️⃣ Reduce stock for each item variant
    for (const cartItem of items) {
      const item = await Item.findById(cartItem.productId);
      if (item) {
        const variant = item.variants.find(v => v.woodType === cartItem.variant);
        if (variant) {
          variant.stock -= cartItem.quantity;
          if (variant.stock < 0) variant.stock = 0;
          await item.save();
        }
      }
    }

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order", error: err });
  }
};

// -------------------- Update Order (Admin) --------------------
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus, shippingStatus } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (shippingStatus) order.shippingStatus = shippingStatus;

    await order.save();
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order", error: err });
  }
};

// -------------------- Get All Orders (Admin) --------------------
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders", error: err });
  }
};

// -------------------- Get User-Specific Orders --------------------
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders", error: err });
  }
};

// -------------------- Cancel Order (Admin) --------------------
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to cancel order", error: err });
  }
};
