const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const eventRouter = require("./routes/eventRouter");
const categoryRouter = require("./routes/categoryRouter");
const cloudinaryRouter = require("./routes/cloudinaryRouter");
const showRouter = require("./routes/showRouter");
const bookingRouter = require("./routes/bookingRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

const corsOptions = {
  origin: ["http://localhost:8100", "https://event-app-backend-ntri.onrender.com", "capacitor://localhost", "http://localhost"],
  credentials: true,
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
app.use("/api/transaction", transactionRouter);
app.use("/api/user", userRouter);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
