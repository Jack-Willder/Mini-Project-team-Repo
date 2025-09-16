import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
  checkoutCart,      // ✅ new controller
  clearCart,         // ✅ optional (clear cart manually)
} from "../controllers/cartController.js";

const router = express.Router();

// Add or update item
router.post("/add", addToCart);

// Get cart items
router.get("/:userId", getCart);

// Remove specific item
router.delete("/remove", removeFromCart);

// Increase/Decrease quantity
router.put("/update", updateQuantity);

// ✅ Checkout cart → changes status to "ordered"
router.post("/checkout", checkoutCart);

// ✅ Clear cart → changes status to "cleared"
router.post("/clear", clearCart);

export default router;
