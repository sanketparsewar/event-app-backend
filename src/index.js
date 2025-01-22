const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const eventRoutes = require("./routes/eventRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
const cors = require("cors");
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());

app.use("/api/event", eventRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/upload", cloudinaryRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
