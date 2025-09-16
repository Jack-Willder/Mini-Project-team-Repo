import Cart from "../models/Cart.js";
import Item from "../models/items.js"; // your products collection

// Helper to calculate total
const calculateTotal = (items) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, name, woodType, price, quantity } = req.body;

    let cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId && item.woodType === woodType
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, name, woodType, price, quantity });
    }

    cart.totalAmount = calculateTotal(cart.items);
    await cart.save();
    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { userId, productId, woodType } = req.body;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      item => !(item.productId.toString() === productId && item.woodType === woodType)
    );

    cart.totalAmount = calculateTotal(cart.items);
    await cart.save();
    res.status(200).json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update quantity (+/-) with stock check
export const updateQuantity = async (req, res) => {
  const { userId, productId, woodType, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex(
      item => item.productId.toString() === productId && item.woodType === woodType
    );
    if (index === -1) return res.status(404).json({ message: "Item not found" });

    const product = await Item.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const variant = product.variants.find(v => v.woodType === woodType);
    if (!variant) return res.status(404).json({ message: "Variant not found" });

    const newQuantity = cart.items[index].quantity + quantity;

    if (newQuantity > variant.stock)
      return res.status(400).json({ message: `Cannot exceed stock of ${variant.stock}` });

    if (newQuantity <= 0) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].quantity = newQuantity;
    }

    cart.totalAmount = calculateTotal(cart.items);
    await cart.save();
    res.status(200).json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get cart
export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart)
      return res.status(200).json({ items: [], totalAmount: 0, status: "empty" });

    cart.totalAmount = calculateTotal(cart.items);
    res.status(200).json({
      items: cart.items,
      totalAmount: cart.totalAmount,
      status: cart.status
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Checkout cart
export const checkoutCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) return res.status(404).json({ message: "Active cart not found" });

    cart.status = "ordered";
    await cart.save();

    res.json({ message: "Cart checked out successfully", cart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) return res.status(404).json({ message: "Active cart not found" });

    cart.status = "cleared";
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.json({ message: "Cart cleared successfully", cart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
