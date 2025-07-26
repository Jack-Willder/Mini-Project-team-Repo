const express = require("express");
const router = express.Router();
const multer = require("multer");

// Use memory storage for image uploads
const upload = multer({ storage: multer.memoryStorage() });

const {
  createItem,
  getItems,
  getImage,
  updateItem,
  deleteItem
} = require("../controllers/itemController");

// Create item with image + fields like productId, name, price, stock
router.post("/items", upload.single("image"), createItem);

// Get all items
router.get("/items", getItems);

// Get image for a specific item
router.get("/items/image/:id", getImage);

// Update an item (including image and productId)
router.put("/items/:id", upload.single("image"), updateItem);

// Delete an item
router.delete("/items/:id", deleteItem);

module.exports = router;
