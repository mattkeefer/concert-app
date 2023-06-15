const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { userSchema, concertSchema, interestSchema } = require("../db/schemas");

const User = mongoose.model("User", userSchema);
const Concert = mongoose.model("Concert", concertSchema);
const Interest = mongoose.model("Interest", interestSchema);

// Get interest pairs involving user, concert, or all pairs
router.get("/", async (req, res) => {
  if (req.query.userEmail) {
    const data = await Interest.find({ userEmail: req.query.userEmail });
    res.send(data);
  } else if (req.query.concertID) {
    const data = await Interest.find({ concertID: req.query.concertID });
    res.send(data);
  } else {
    const data = await Interest.find({});
    res.send(data);
  }
});

// Add (user, concert) pair to interest collection
router.post("/", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const concertID = req.body.concertID;
    const user = await User.findOne({ email: userEmail });
    const concert = await Concert.findOne({ id: concertID });
    if (!user) {
      res.status(400).send({
        message: "Unknown user email provided",
      });
    } else if (!concert) {
      res.status(400).send({
        message: "Unknown concert id provided",
      });
    } else {
      const dupInterest = await Interest.findOne({
        userEmail,
        concertID,
      });
      if (!dupInterest) {
        const interest = new Interest({
          userEmail,
          concertID,
        });
        interest.save().then((result) => {
          res.status(201).send({
            message: "Interest saved successfully",
            result,
          });
        });
      } else {
        res.status(400).send({
          message: "Interest already exists",
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: "Error saving interest",
      err,
    });
  }
});

// Remove (user, concert) pair from interest collection
router.delete("/", async (req, res) => {
  if (req.body.userEmail && req.body.concertID) {
    Interest.deleteOne({
      userEmail: req.body.userEmail,
      concertID: req.body.concertID,
    })
      .then((response) => {
        res.status(204).send({
          message: "Successfully deleted interest pair",
        });
      })
      .catch((err) => {
        res.status(404).send({
          message: "Could not delete interest pair",
          err,
        });
      });
  } else {
    res.status(400).send({
      message: "User email or concert ID not provided",
    });
  }
});

module.exports = router;
