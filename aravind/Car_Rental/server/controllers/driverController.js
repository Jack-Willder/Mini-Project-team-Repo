const Driver = require("../models/Driver");

// Add a new driver
const addDriver = async (req, res) => {
  try {
    const { name, licenseNumber, contact, address, gender, licenseStatus } = req.body;

    // Validation
    if (!name || !licenseNumber || !contact || !address || !gender || !licenseStatus) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check for existing license number
    const existingDriver = await Driver.findOne({ licenseNumber });
    if (existingDriver) {
      return res.status(400).json({ success: false, message: "License number already exists" });
    }

    const newDriver = new Driver({ name, licenseNumber, contact, address, gender, licenseStatus });
    await newDriver.save();

    res.status(201).json({ success: true, message: "Driver added successfully", driver: newDriver });
  } catch (error) {
    console.error("Error adding driver:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Get all drivers
const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, drivers });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Update driver
const updateDriver = async (req, res) => {
  try {
    const driverId = req.params.id;
    const updatedDriver = await Driver.findByIdAndUpdate(driverId, req.body, { new: true });
    if (!updatedDriver) return res.status(404).json({ success: false, message: "Driver not found" });
    res.status(200).json({ success: true, message: "Driver updated successfully", driver: updatedDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Delete driver
const deleteDriver = async (req, res) => {
  try {
    const driverId = req.params.id;
    const deletedDriver = await Driver.findByIdAndDelete(driverId);
    if (!deletedDriver) return res.status(404).json({ success: false, message: "Driver not found" });
    res.status(200).json({ success: true, message: "Driver deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = { addDriver, getDrivers, updateDriver, deleteDriver };
