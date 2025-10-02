import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
  checkoutCart,      
  clearCart,         
} from "../controllers/cartController.js";

const router = express.Router();
router.post("/add", addToCart);
router.get("/:userId", getCart);
router.delete("/remove", removeFromCart);
router.put("/update", updateQuantity);
router.post("/checkout", checkoutCart);
router.post("/clear", clearCart);

export default router;
