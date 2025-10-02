const express = require("express");
const { addDriver, getDrivers, updateDriver, deleteDriver } = require("../controllers/driverController");

const router = express.Router();

// Add new driver
router.post("/add", addDriver);

// Get all drivers
router.get("/", getDrivers);

// Update driver
router.put("/:id", updateDriver);

// Delete driver
router.delete("/:id", deleteDriver);

module.exports = router;
