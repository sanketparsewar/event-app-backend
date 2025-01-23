const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/dehpzebdo/image/upload/v1737542740/20210915-145842-OVATION-03030-min-min_xakbwe.jpg",
  },
  location: {
    type: String,
    required: true,
  },
  headliners: {
    type: [String],
    default: [],
  },
  performers: {
    type: [String],
    default: [],
  },
  categoryId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  shows: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show", // Reference to the Show schema for multiple shows in an event
    },
  ],
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking", // Reference to the Booking schema for scalability
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
