const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { addCar, getCars, updateCar, deleteCar } = require("../controllers/carController");

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads/cars");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);
  if (extName && mimeType) cb(null, true);
  else cb(new Error("Only image files allowed"));
};

const upload = multer({ storage, fileFilter });

// Routes
router.post("/add", upload.single("carImage"), addCar);
router.get("/", getCars);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

// Serve images
router.use("/images", express.static(uploadDir));
// Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

module.exports = router;
