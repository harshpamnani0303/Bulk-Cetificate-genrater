const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.send({ message: "User registered successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ message: "Email already exists" });
    } else {
      res.status(500).send({ message: "Database error" });
    }
  }
});

module.exports = router;
