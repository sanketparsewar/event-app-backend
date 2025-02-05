const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const { protect } = require("../middleware/authMiddleware"); // Assuming you have JWT authentication middleware

router.put("/:userId", userController.updateUser);

module.exports = router;
