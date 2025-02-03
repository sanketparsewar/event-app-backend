const Booking = require("../models/booking");
const Event = require("../models/event");
const Show = require("../models/show");

const validator = require("validator"); // Add this if you're using the 'validator' library for email validation

exports.createBooking = async (req, res) => {
  try {
    const { name, phone, email, tickets, showId, totalAmount } = req.body;

    // Input validations
    if (!name || name.length < 3) {
      return res
        .status(400)
        .json({ error: "Name must be at least 3 characters long" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res
        .status(400)
        .json({ error: "Phone number must be a valid 10-digit number" });
    }

    if (tickets > 6 || tickets <= 0) {
      return res
        .status(400)
        .json({ error: "Tickets must be a valid number between 1 and 6" });
    }

    // List of avatar URLs
    const avatarUrls = [
      "https://res.cloudinary.com/dehpzebdo/image/upload/v1737614384/public_agad3c.png",
      "https://res.cloudinary.com/dehpzebdo/image/upload/v1737614416/public_2_vvj4bh.png",
      "https://res.cloudinary.com/dehpzebdo/image/upload/v1737614430/public_3_nbpsnf.png",
      "https://res.cloudinary.com/dehpzebdo/image/upload/v1737614448/public_4_wxb2pu.png",
      "https://res.cloudinary.com/dehpzebdo/image/upload/v1737614535/public_5_rt9eln.png",
      "https://res.cloudinary.com/dehpzebdo/image/upload/v1737614606/public_6_ftynvg.png",
    ];

    // Randomly select an avatar image
    const randomAvatar =
      avatarUrls[Math.floor(Math.random() * avatarUrls.length)];

    const show = await Show.findById(showId).populate("eventId");
    if (!show) {
      return res.status(404).json({ error: "Show not found" });
    }

    if (show.availableSeats < tickets) {
      return res.status(400).json({ error: "Not enough seats available" });
    }

    const newBooking = new Booking({
      name,
      phone,
      email,
      tickets,
      showId,
      image: randomAvatar, // Assign the random avatar here
      totalAmount,
    });

    const savedBooking = await newBooking.save();

    // Update seats and link booking to show and event
    show.availableSeats -= tickets;
    await show.save();

    const event = await Event.findById(show.eventId);
    event.bookings.push(savedBooking._id);
    await event.save();

    // Populate the showId field before sending response
    const populatedBooking = await Booking.findById(savedBooking._id).populate({
      path: "showId",
      populate: {
        path: "eventId", // This assumes `eventId` is referenced in Show model
      },
    });

    res
      .status(201)
      .json({ message: "Ticket Booked", booking: populatedBooking });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create booking", details: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("showId");
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch bookings", details: error.message });
  }
};

// Get bookings for a specific show
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById( id ).populate({
      path: "showId",
      populate: {
        path: "eventId", // This assumes `eventId` is referenced in Show model
      },
    });
    if (!booking) {
      return res.status(404).json({ error: "No booking found for this id" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch booking", details: error.message });
  }
};

exports.getBookingsByShow = async (req, res) => {
  try {
    const { showId } = req.params;

    const bookings = await Booking.find({ showId });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: "No bookings found for this show" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch bookings", details: error.message });
  }
};
