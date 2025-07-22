const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  createItem,
  getItems,
  getImage,
  updateItem,   // ✅ new
  deleteItem    // ✅ new
} = require("../controllers/itemController");

// Routes
router.post("/items", upload.single("image"), createItem);
router.get("/items", getItems);
router.get("/items/image/:id", getImage);

// ✅ New: Update Item
router.put("/items/:id", upload.single("image"), updateItem);

// ✅ New: Delete Item
router.delete("/items/:id", deleteItem);

module.exports = router;
