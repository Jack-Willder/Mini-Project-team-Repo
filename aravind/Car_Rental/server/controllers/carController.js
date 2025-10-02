const Car = require("../models/Cars");

// Add Car
const addCar = async (req, res) => {
  try {
    const { carName, vehicleNumber, acFarePerKm, nonAcFarePerKm, acFarePerDay, nonAcFarePerDay, insuranceStatus } = req.body;

    if (!carName || !vehicleNumber || !acFarePerKm || !nonAcFarePerKm || !acFarePerDay || !nonAcFarePerDay || !insuranceStatus) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) return res.status(400).json({ message: "Car image is required" });
    const carImage = req.file.filename;

    const existingCar = await Car.findOne({ vehicleNumber });
    if (existingCar) return res.status(400).json({ message: "Vehicle number already exists" });

    const newCar = new Car({ carName, vehicleNumber, acFarePerKm, nonAcFarePerKm, acFarePerDay, nonAcFarePerDay, insuranceStatus, carImage });
    await newCar.save();

    res.status(201).json({ success: true, message: "Car added successfully", car: newCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get Cars
const getCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, cars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cars", error: error.message });
  }
};

// Update Car
const updateCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const updatedCar = await Car.findByIdAndUpdate(carId, req.body, { new: true });
    if (!updatedCar) return res.status(404).json({ success: false, message: "Car not found" });
    res.status(200).json({ success: true, message: "Car updated successfully", car: updatedCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Delete Car
const deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const deletedCar = await Car.findByIdAndDelete(carId);
    if (!deletedCar) return res.status(404).json({ success: false, message: "Car not found" });
    res.status(200).json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = { addCar, getCars, updateCar, deleteCar };
