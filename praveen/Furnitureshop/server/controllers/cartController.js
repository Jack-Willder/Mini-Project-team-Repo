const Cart = require("../models/Cart");
const Item = require("../models/items"); // Product schema

// Helper: Recalculate totals
const calculateTotals = (cart) => {
  cart.totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return cart;
};

// ✅ Get Cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId; // ✅ Get userId from request
    if (!userId) return res.status(400).json({ message: "UserId required" });

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.json({ cart: { items: [], totalQuantity: 0, totalPrice: 0 } });
    }

    res.json({ cart });
  } catch (err) {
    console.error("Get Cart Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add Item to Cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, woodType, quantity } = req.body;
    if (!userId) return res.status(400).json({ message: "UserId required" });

    const product = await Item.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const variant = product.variants.find((v) => v.woodType === woodType);
    if (!variant) return res.status(400).json({ message: "Invalid wood type" });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (i) => i.productId.toString() === productId && i.woodType === woodType
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        productId,
        woodType,
        price: variant.price,
        quantity: quantity || 1,
      });
    }

    calculateTotals(cart);
    await cart.save();

    res.json({ message: "Item added to cart", cart });
  } catch (err) {
    console.error("Add to Cart Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Quantity
exports.updateQuantity = async (req, res) => {
  try {
    const { userId, itemId, action } = req.body;
    if (!userId) return res.status(400).json({ message: "UserId required" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease" && item.quantity > 1) {
      item.quantity -= 1;
    }

    calculateTotals(cart);
    await cart.save();

    res.json({ message: "Quantity updated", cart });
  } catch (err) {
    console.error("Update Quantity Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Remove Item
exports.removeItem = async (req, res) => {
  try {
    const { userId } = req.body; // ✅ Expect userId from frontend
    const { itemId } = req.params;
    if (!userId) return res.status(400).json({ message: "UserId required" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i._id.toString() !== itemId);

    calculateTotals(cart);
    await cart.save();

    res.json({ message: "Item removed", cart });
  } catch (err) {
    console.error("Remove Item Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
