const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { userSchema, concertSchema, interestSchema } = require("../db/schemas");

const User = mongoose.model("User", userSchema);
const Concert = mongoose.model("Concert", concertSchema);
const Interest = mongoose.model("Interest", interestSchema);

// Get concert with specified id or get all concerts
// If email provided, get all concerts user's followings are attending/interested in
router.get("/", async (req, res) => {
  if (req.query.concertID) {
    const data = await Concert.find({ id: req.query.concertID });
    res.send(data);
  } else if (req.query.userEmail) {
    const user = await User.findOne({ email: req.query.userEmail });
    if (!user) {
      res.status(404).send({
        message: "User not found",
      });
    } else {
      const users = await Promise.all(
        user.following.map((id) => User.findById(id))
      );
      const nestedInterests = await Promise.all(
        users.map((user) => Interest.find({ userEmail: user.email }))
      );
      const interests = nestedInterests.flat(1);
      const concerts = await Promise.all(
        interests.map((i) => Concert.findOne({ id: i.concertID }))
      );
      // remove duplicates
      const uniqueConcerts = [
        ...new Map(concerts.map((v) => [v.id, v])).values(),
      ];
      res.send(uniqueConcerts);
    }
  } else {
    // const data = await Concert.find({});
    // res.send(data);
    res.send(EXAMPLE_DATA);
  }
});

// Create new concert
router.post("/", (req, res) => {
  const existing = Concert.findOne({ id: req.body.id });
  if (existing) {
    res.status(400).send({
      message: "Concert already exists",
    });
  } else {
    try {
      const concert = new Concert({
        id: req.body.id,
        name: req.body.name,
        url: req.body.url,
        date: req.body.date,
        venue: req.body.venue,
        images: req.body.images,
      });
      concert.save().then((result) => {
        res.status(201).send({
          message: "Concert created successfully",
          result,
        });
      });
    } catch (err) {
      res.status(500).send({
        message: "Error creating concert",
        err,
      });
    }
  }
});

module.exports = router;
