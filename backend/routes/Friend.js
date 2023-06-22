const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { userSchema } = require("../db/schemas");

const User = mongoose.model("User", userSchema);

// Get list of users this user is friends with
router.get("/", async (req, res) => {
  if (req.query.user) {
    const user = await User.findOne({ username: req.query.user });
    if (!user) {
      res.status(404).send({
        message: "Could not find user",
      });
    } else {
      res.send(user.friends);
    }
  } else {
    res.status(400).send({
      message: "No username provided",
    });
  }
});

// Add user to user's friend list
router.post("/", async (req, res) => {
  try {
    const username = req.body.user;
    const friendUsername = req.body.friend;
    const user = await User.findOne({ username: username });
    const friend = await User.findOne({ username: friendUsername });
    if (!user) {
      res.status(404).send({
        message: "Could not find user",
      });
    } else if (!friend) {
      res.status(404).send({
        message: "Could not find friend username",
      });
    } else {
      if (!user.friends.includes(friend.username)) {
        const friends = user.friends;
        friends.push(friend.username);
        user.friends = friends;
        await user.save();
        res.status(202).send(user);
      } else {
        res.status(400).send({
          message: "Already friends",
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: "Error adding friend",
      err,
    });
  }
});

// Remove user from user's friend list
router.delete("/", async (req, res) => {
  if (req.body.user && req.body.friend) {
    const username = req.body.user;
    const friendUsername = req.body.friend;
    const user = await User.findOne({ username: username });
    const friend = await User.findOne({ username: friendUsername });
    if (!user) {
      res.status(404).send({
        message: "Could not find user",
      });
    } else if (!friend) {
      res.status(404).send({
        message: "Could not find friend to remove",
      });
    } else {
      user.friends = user.friends.filter((u) => u !== friend.username);
      await user.save();
      res.status(204).send({
        message: "Successfully removed friend",
        user,
      });
    }
  } else {
    res.status(400).send({
      message: "Missing required usernames",
    });
  }
});

module.exports = router;
