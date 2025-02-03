const Show = require("../models/show");
const Event = require("../models/event");

// Create a new show
exports.createShow = async (req, res) => {
  try {
    const { eventId, date, time, ticketPrice, totalSeats } = req.body;

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Create a new show
    const newShow = new Show({
      eventId,
      date,
      time,
      ticketPrice,
      totalSeats,
      availableSeats: totalSeats, // Initially, availableSeats equals totalSeats
    });

    const savedShow = await newShow.save();

    // Push the new show's ID into the event's 'shows' array
    // event.shows = event.shows || []; // Ensure 'shows' is initialized as an array
    // event.shows.push(savedShow._id);
    // await event.save();

    res
      .status(201)
      .json({ message: "Show created successfully", show: savedShow });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create show", details: error.message });
  }
};

// Get all shows
exports.getAllShows = async (req, res) => {
  try {
    const shows = await Show.find();
    res.status(200).json(shows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch shows", details: error.message });
  }
};

// Get all shows by Event ID
exports.getShowsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Fetch all matching shows
    const shows = await Show.find({ eventId:eventId }).select('-eventId -__v');

    if (!shows.length) {
      return res
        .status(404)
        .json({ message: "No shows found for this event." });
    }

    return res.status(200).json(shows); // Returning list directly
  } catch (error) {
    console.error("Error fetching shows:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch shows", error: error.message });
  }
};

// Get a single show by ID
exports.getShowById = async (req, res) => {
  try {
    const { id } = req.params;

    const show = await Show.findById(id).populate("eventId");
    if (!show) {
      return res.status(404).json({ error: "Show not found" });
    }

    res.status(200).json(show);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch show", details: error.message });
  }
};

// Update available seats for a show
exports.updateAvailableSeats = async (req, res) => {
  try {
    const { id } = req.params;
    const { seatsBooked } = req.body;

    const show = await Show.findById(id);
    if (!show) {
      return res.status(404).json({ error: "Show not found" });
    }

    if (show.availableSeats < seatsBooked) {
      return res.status(400).json({ error: "Not enough seats available" });
    }

    show.availableSeats -= seatsBooked;
    const updatedShow = await show.save();

    res
      .status(200)
      .json({ message: "Seats updated successfully", show: updatedShow });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update seats", details: error.message });
  }
};
