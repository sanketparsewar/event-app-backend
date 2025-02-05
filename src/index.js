const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const eventRouter = require("./routes/eventRouter");
const categoryRouter = require("./routes/categoryRouter");
const cloudinaryRouter = require("./routes/cloudinaryRouter");
const showRouter = require("./routes/showRouter");
const bookingRouter = require("./routes/bookingRouter");
const app = express();

const corsOptions = {
  origin: "*", // Replace with the actual origin of your frontend
  credentials: true, // Allow credentials (cookies, authorization headers)
};

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Apply CORS middleware with configuration
app.use(cors(corsOptions));

app.use("/api/auth", authRouter);
app.use("/api/event", eventRouter);
app.use("/api/category", categoryRouter);
app.use("/api/upload", cloudinaryRouter);
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
