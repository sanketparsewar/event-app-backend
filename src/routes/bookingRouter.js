const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Route to create a new booking
router.post("/", bookingController.createBooking);

// Route to get all bookings
router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingById);

// Route to get bookings for a specific show
router.get("/show/:showId", bookingController.getBookingsByShow);

module.exports = router;
