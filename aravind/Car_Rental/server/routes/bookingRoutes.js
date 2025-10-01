const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookingsController");

// GET all bookings
router.get("/", bookingsController.getAllBookings);

// POST create a booking
router.post("/", bookingsController.createBooking);

// GET a booking by ID
router.get("/:id", bookingsController.getBookingById);

// PUT update a booking
router.put("/:id", bookingsController.updateBooking);

// DELETE a booking
router.delete("/:id", bookingsController.deleteBooking);

module.exports = router;
