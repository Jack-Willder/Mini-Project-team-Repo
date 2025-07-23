const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  createItem,
  getItems,
  getImage,
  updateItem,
  deleteItem
} = require("../controllers/itemController");

router.post("/items", upload.single("image"), createItem);
router.get("/items", getItems);
router.get("/items/image/:id", getImage);
router.put("/items/:id", upload.single("image"), updateItem);
router.delete("/items/:id", deleteItem);

module.exports = router;
