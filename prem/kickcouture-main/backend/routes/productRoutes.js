const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addProduct, getProducts, deleteProduct } = require("../controllers/productController");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Use multer middleware for the /add route
router.post("/add", upload.single("image"), addProduct);

// Use the /:id route to get a product by ID
router.get("/get", getProducts);

router.delete("/:id", deleteProduct);

module.exports = router;