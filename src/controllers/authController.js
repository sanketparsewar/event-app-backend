// using cookie------------------------------
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = await User.create({ name, email, phone, password });

    const token = generateToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" }); // ⬅️ Now it properly exits
    }

    // ✅ Only generate token if password is correct
    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,  // If you need to access it via `document.cookie`
      sameSite: "None", // Required for cross-origin cookies
      secure: true,     // Must be true for HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.logoutUser = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .json({ message: "Logged out successfully" });
};
