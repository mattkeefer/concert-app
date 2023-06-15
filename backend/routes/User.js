const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { userSchema } = require("../db/schemas");

const User = mongoose.model("User", userSchema);

// Get user with given email or get all users
router.get("/", async (req, res) => {
  if (req.query.email) {
    const data = await User.findOne({ email: req.query.email });
    res.send(data);
  } else {
    const data = await User.find({});
    res.send(data);
  }
});

module.exports = router;
