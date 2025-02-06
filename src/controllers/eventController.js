// eventController.js
const Event = require("../models/event");
const Category = require("../models/category");
// Create Event
exports.createEvent = async (req, res) => {
  try {
    const {
      name,
      image,
      location,
      headliners,
      performers,
      categoryId,
      description,
    } = req.body;

    // Validations
    if (!name || !image || !location || !categoryId || !description) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const event = new Event({
      name,
      // date,
      image,
      location,
      headliners,
      performers,
      categoryId,
      description,
    });

    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create event", error: error.message });
  }
};

// Get All Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve events", error: error.message });
  }
};

// Get Event By ID
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById({ _id: id });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve event", error: error.message });
  }
};

exports.getEventsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const events = await Event.find({ categoryId });

    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Event

exports.updateEvent = async (req, res) => {
  try {
    const id = req.params.id; // Extracting the ID correctly

    const updates = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(id, updates, {
      new: true,
    }); 

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Failed to update event", error: error.message });
  }
};


// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete({ _id: id });

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete event", error: error.message });
  }
};
