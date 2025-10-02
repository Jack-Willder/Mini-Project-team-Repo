const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reportsController");

// GET /api/reports?fromDate=YYYY-MM-DD&endDate=YYYY-MM-DD
router.get("/", reportsController.getBookingsByDateRange);

module.exports = router;
