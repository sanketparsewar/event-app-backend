// eventController.js
const Event = require("../models/event");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { name, image, location, headliners, performers, categoryId, description } = req.body;

    // Validations
    if (!name || !image || !location || !categoryId || !description) {
      return res.status(400).json({ message: "All required fields must be provided." });
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
    res.status(500).json({ message: "Failed to create event", error: error.message });
  }
};

// Get All Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve events", error: error.message });
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
    res.status(500).json({ message: "Failed to retrieve event", error: error.message });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedEvent = await Event.findByIdAndUpdate({ id }, updates, { new: true });

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

    const deletedEvent = await Event.findByIdAndDelete({ _id:id });

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error: error.message });
  }
};
