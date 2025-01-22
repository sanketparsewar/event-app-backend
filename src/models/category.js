const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    default:'https://res.cloudinary.com/dehpzebdo/image/upload/v1737542740/20210915-145842-OVATION-03030-min-min_xakbwe.jpg'
  },
});

// Create the model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
