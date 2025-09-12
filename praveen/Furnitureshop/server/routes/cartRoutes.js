const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// ✅ Get user cart (pass userId in request body or query param)
router.get("/", cartController.getCart);

// ✅ Add item to cart
router.post("/add", cartController.addToCart);

// ✅ Update quantity
router.put("/update", cartController.updateQuantity);

// ✅ Remove item
router.delete("/remove/:itemId", cartController.removeItem);

module.exports = router;
