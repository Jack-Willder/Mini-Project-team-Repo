const Booking = require("../models/Booking");

// Get bookings between fromDate and endDate
exports.getBookingsByDateRange = async (req, res) => {
  try {
    const { fromDate, endDate } = req.query;

    if (!fromDate || !endDate) {
      return res.status(400).json({ success: false, message: "fromDate and endDate are required" });
    }

    const bookings = await Booking.find({
      startDate: { $gte: new Date(fromDate) },
      endDate: { $lte: new Date(endDate) },
    }).sort({ startDate: 1 });

    res.json({ success: true, bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
