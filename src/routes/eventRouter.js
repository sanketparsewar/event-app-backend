const express = require("express");
const eventController = require("../controllers/eventController");

const router = express.Router();

// Event routes
router.post("/", eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/filter", eventController.getFilteredEvents);

router.get("/city/:city", eventController.getEventsByCity);
router.get("/category/:categoryId", eventController.getEventsByCategory);
router.get("/:id", eventController.getEventById);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;

