const express = require("express");
const router = express.Router();
const showController = require("../controllers/showController");

// Create a new show
router.post("/", showController.createShow);

// Get all shows
router.get("/", showController.getAllShows);

// Get shows by event ID
router.get("/event/:eventId", showController.getShowsByEvent);

// Get a single show by ID
router.get("/:id", showController.getShowById);

// Update available seats for a show
router.patch("/:id/seats", showController.updateAvailableSeats);

module.exports = router;
