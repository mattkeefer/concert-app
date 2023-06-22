const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { userSchema } = require("../db/schemas");

const User = mongoose.model("User", userSchema);

// Get user with given username or get all users
router.get("/", async (req, res) => {
  if (req.query.username) {
    const data = await User.findOne({ username: req.query.username });
    res.send(data);
  } else {
    const data = await User.find({});
    res.send(data);
  }
});

module.exports = router;
