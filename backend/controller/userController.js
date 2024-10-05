const User = require("../model/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const CarbonFootprint = require("../model/carbonFootprintModel");
const Goal = require("../model/goalModel");

const createUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email: email.toLowerCase(), password: hashedPassword, age });
    const savedUser = await user.save();

    res.status(201).json({ message: "User created successfully", data: savedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log(process.env.JWT_SECRET)

    return res.status(200).json({ token, userId: user._id, userName: user.name, message: 'Login Successful!' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Fetch a user by ID (now using JWT for authentication)
const fetchUser = async (req, res) => {
  try {
    const userId = req.user.userId; // Get userId from JWT

    const user = await User.findById(userId)
      .populate("carbonFootprints")
      .populate("goals");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User fetched successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

module.exports = { createUser, loginUser, fetchUser };
