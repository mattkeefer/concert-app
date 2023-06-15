const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { userSchema } = require("../db/schemas");

const User = mongoose.model("User", userSchema);

// Get list of users this user is following
router.get("/", async (req, res) => {
  if (req.query.userEmail) {
    const user = await User.findOne({ email: req.query.userEmail });
    if (!user) {
      res.status(404).send({
        message: "Could not find user",
      });
    } else {
      res.send(user.following);
    }
  } else {
    res.status(400).send({
      message: "No email provided",
    });
  }
});

// Add user to user's following list
router.post("/", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const followEmail = req.body.followEmail;
    const user = await User.findOne({ email: userEmail });
    const userToFollow = await User.findOne({ email: followEmail });
    if (!user) {
      res.status(404).send({
        message: "Could not find user",
      });
    } else if (!userToFollow) {
      res.status(404).send({
        message: "Could not find user to follow",
      });
    } else {
      if (!user.following.includes(userToFollow._id)) {
        const following = user.following;
        following.push(userToFollow._id);
        user.following = following;
        await user.save();
        res.status(202).send(user);
      } else {
        res.status(400).send({
          message: "Already following",
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: "Error following user",
      err,
    });
  }
});

// Remove user from user's following list
router.delete("/", async (req, res) => {
  if (req.body.userEmail && req.body.unfollowEmail) {
    const userEmail = req.body.userEmail;
    const unfollowEmail = req.body.unfollowEmail;
    const user = await User.findOne({ email: userEmail });
    const userToUnfollow = await User.findOne({ email: unfollowEmail });
    if (!user) {
      res.status(404).send({
        message: "Could not find user",
      });
    } else if (!userToUnfollow) {
      res.status(404).send({
        message: "Could not find user to unfollow",
      });
    } else {
      user.following = user.following.filter((u) => u != userToUnfollow._id);
      await user.save();
      res.status(204).send({
        message: "Successfully unfollowed user",
        user,
      });
    }
  } else {
    res.status(400).send({
      message: "User email or email of user to unfollow not provided",
    });
  }
});

module.exports = router;
