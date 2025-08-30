const Order = require("../models/order");
const Item = require("../models/item");
const User = require("../models/user");

const placeOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body; 
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const itemsDetails = await Promise.all(
      items.map(async (cartItem) => {
        const product = await Item.findById(cartItem.productId);
        if (!product) throw new Error("Product not found");

        return {
          productId: product._id,
          name: product.name,
          image: product.image,
          woodType: cartItem.woodType,
          price: product.price,
          quantity: cartItem.quantity,
        };
      })
    );

    const newOrder = new Order({
      userId: user._id,
      items: itemsDetails,
      totalAmount,
      shippingAddress: {
        name: user.name,
        address: user.address || "No address provided",
        phone: user.phone || "No phone provided",
        email: user.email,
      },
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Order placing error:", error);
    res.status(500).json({ message: "Server error while placing order" });
  }
};

module.exports = { placeOrder };
