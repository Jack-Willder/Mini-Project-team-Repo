import Order from "../models/order.js";
import Cart from "../models/Cart.js";
import Item from "../models/items.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, paymentMethod, upiId, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const requiredFields = ["doorNo", "street", "city", "state", "postalCode", "country"];
    for (const field of requiredFields) {
      if (!shippingAddress?.[field]) {
        return res.status(400).json({ message: `Shipping address field '${field}' is required.` });
      }
    }

    const order = new Order({
      userId,
      items,
      totalAmount,
      paymentStatus: paymentMethod === "Online" ? "Paid" : "Pending",
      orderStatus: "Processing",
      shippingStatus: "Pending",
      shippingAddress,
      orderDate: new Date(),
    });

    await order.save();

    await Cart.findOneAndUpdate({ userId }, { status: "checkout" });

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
    console.error("Error in placeOrder:", err);
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus, shippingStatus } = req.body;

    if (!orderId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (shippingStatus) order.shippingStatus = shippingStatus;

    await order.save();

   
    if (order.paymentStatus === "Paid" &&
        order.orderStatus === "Delivered" &&
        !order.stockReduced) {

      for (const cartItem of order.items) {
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

      order.stockReduced = true;
      await order.save();
    }

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (err) {
    console.error("Error in updateOrderStatus:", err);
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};



export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(orderId).populate({
      path: "items.productId",
      model: "items",          
      select: "name",
      strictPopulate: false
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    const orderItems = order.items.map(item => ({
      productId: item.productId?._id || item.productId || null,
      name: item.productId?.name || item.name || "Unknown Product",
      variant: item.variant,
      quantity: item.quantity,
      price: item.price,
    }));

    res.status(200).json({ ...order._doc, items: orderItems });
  } catch (err) {
    console.error("Error in getOrderById:", err);
    res.status(500).json({ message: "Server error fetching order", error: err.message });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error in getAllOrders:", err);
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error in getUserOrders:", err);
    res.status(500).json({ message: "Failed to fetch user orders", error: err.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.shippingStatus !== "Pending") {
      return res.status(400).json({ message: "Cannot cancel order once shipped/delivered" });
    }

    for (const cartItem of order.items) {
      const item = await Item.findById(cartItem.productId);
      if (item) {
        const variant = item.variants.find(v => v.woodType === cartItem.variant);
        if (variant) {
          variant.stock += cartItem.quantity;
          await item.save();
        }
      }
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (err) {
    console.error("Error in cancelOrder:", err);
    res.status(500).json({ message: "Failed to cancel order", error: err.message });
  }
};

export const getCompletedOrdersCount = async (req, res) => {
  try {
    const count = await Order.countDocuments({ orderStatus: "Delivered" });
    res.status(200).json({ completedOrdersCount: count });
  } catch (err) {
    console.error("Error in getCompletedOrdersCount:", err);
    res.status(500).json({ message: "Failed to fetch completed orders count", error: err.message });
  }
};

export const getOrdersCount = async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error in getOrdersCount:", err);
    res.status(500).json({ message: "Failed to fetch orders count", error: err.message });
  }
};
