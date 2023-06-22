const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { userSchema } = require("../db/schemas");

const User = mongoose.model("User", userSchema);

// Get list of artists followed by the user
router.get("/", async (req, res) => {
  if (!req.query.user) {
    res.status(400).send({ message: "No user provided" });
    return;
  }
  const user = User.findOne({ username: req.query.user });
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  res.send(user.following);
});

// Follow an artist
router.post("/", async (req, res) => {
  if (!(req.body.user && req.body.artist)) {
    res.status(400).send({ message: "Missing required params" });
    return;
  }
  const username = req.body.user;
  const artist = req.body.artist;
  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  if (user.following.includes(artist)) {
    res.status(400).send({ message: "User already following artist" });
    return;
  }
  const following = user.following;
  following.push(artist);
  try {
    user.following = following;
    await user.save();
    res.send({ message: "Successfully followed artist", user });
  } catch (err) {
    res.status(500).send({ message: "Error while following artist", err });
  }
});

// Unfollow artist
router.delete("/", async (req, res) => {
  if (!(req.body.user && req.body.artist)) {
    res.status(400).send({ message: "Missing required params" });
    return;
  }
  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  try {
    user.following = user.following.filter(
      (artist) => artist !== req.body.artist
    );
    await user.save();
    res.send({ message: "Successfully unfollowed artist", user });
  } catch (err) {
    res.status(500).send({ message: "Error while unfollowing artist", err });
  }
});

module.exports = router;
