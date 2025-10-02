const Booking = require("../models/Booking");
const Car = require("../models/Cars");
const Customer = require("../models/Customer");

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).populate("car").populate("customer");

    const today = new Date();

    // Loop through bookings to update status automatically
    for (let booking of bookings) {
      let updated = false;

      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);

      if (booking.status === "pending" && today >= start && today <= end) {
        booking.status = "confirmed";
        updated = true;
      } else if (booking.status === "confirmed" && today > end) {
        booking.status = "completed";
        updated = true;
      }

      if (updated) {
        await booking.save(); // save updated status
      }
    }

    res.json({ success: true, bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { car: carId, customer: customerId, customerNumber, startDate, endDate, carType, chargeType, driver } = req.body;

    if (!carId || !customerId || !customerNumber || !startDate || !endDate || !carType || !chargeType) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ success: false, message: "Car not found" });

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return res.status(400).json({ success: false, message: "End date cannot be before start date" });

    const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const farePerDay = carType === "With AC" ? car.acFarePerDay : car.nonAcFarePerDay;
    const totalAmount = numberOfDays * farePerDay;

    const newBooking = new Booking({
      car: carId,
      customer: customerId,
      customerNumber,
      startDate,
      endDate,
      carType,
      chargeType,
      driver,
      totalAmount,
      status: "pending",
      paymentStatus: "unpaid",
    });

    await newBooking.save();

    const savedBooking = await Booking.findById(newBooking._id)
      .populate("car")
      .populate("customer");

    res.json({ success: true, booking: savedBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create booking" });
  }
};

// Get a booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("car")
      .populate("customer");
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update booking" });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json({ success: true, message: "Booking deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete booking" });
  }
};
