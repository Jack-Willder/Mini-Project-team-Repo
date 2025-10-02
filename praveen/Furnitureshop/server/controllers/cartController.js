import Cart from "../models/Cart.js";
import Item from "../models/items.js"; 

const calculateTotal = (items) => items.reduce((acc, item) => acc + item.price * item.quantity, 0);

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, name, woodType, price, quantity } = req.body;

    let cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) cart = new Cart({ userId, items: [], status: "active" });

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

export const removeFromCart = async (req, res) => {
  const { userId, productId, woodType } = req.body;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) return res.status(404).json({ message: "Active cart not found" });

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

export const updateQuantity = async (req, res) => {
  const { userId, productId, woodType, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) return res.status(404).json({ message: "Active cart not found" });

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

export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });

    if (!cart) return res.status(200).json({ items: [], totalAmount: 0, status: "empty" });

    cart.totalAmount = calculateTotal(cart.items);
    await cart.save();

    res.status(200).json({
      items: cart.items,
      totalAmount: cart.totalAmount,
      status: cart.status
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkoutCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) return res.status(404).json({ message: "Active cart not found" });

    cart.status = "ordered"; 
    await cart.save();

    res.status(200).json({ message: "Cart checked out successfully", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const clearCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) return res.status(404).json({ message: "Active cart not found" });

    cart.items = [];
    cart.totalAmount = 0;
    cart.status = "cleared"; 
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
