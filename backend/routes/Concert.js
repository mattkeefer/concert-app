const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { EXAMPLE_DATA } = require("../data/example");
const { userSchema, concertSchema, interestSchema } = require("../db/schemas");
const axios = require("axios");

const User = mongoose.model("User", userSchema);
const Concert = mongoose.model("Concert", concertSchema);
const Interest = mongoose.model("Interest", interestSchema);

const apiKey = process.env.TICKETMASTER_API_KEY;

// Get concert information
router.get("/", async (req, res) => {
  if (req.query.concertID) {
    // get concert with specified id
    const data = await Concert.find({ id: req.query.concertID });
    res.send(data);
  } else if (req.query.keyword) {
    // query ticketmaster with keyword search, return list of concerts
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&keyword=${req.query.keyword}&sort=date,name,asc&size=20&apikey=${apiKey}`
      )
      .then((response) => res.send(response.data))
      .catch((err) =>
        res
          .status(500)
          .send({ message: "Error while querying Ticketmaster API", err })
      );
  } else {
    // get all concerts
    // const data = await Concert.find({});
    // res.send(data);
    res.send(EXAMPLE_DATA);
  }
});

// Get all concerts user's friends are interested in
router.get("/friends", async (req, res) => {
  if (!req.query.user) {
    res.status(400).send({ message: "No user provided" });
  } else {
    const user = await User.findOne({ username: req.query.user });
    if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      const users = await Promise.all(
        user.friends.map((u) => User.find({ username: u }))
      );
      const nestedInterests = await Promise.all(
        users.map((user) => Interest.find({ username: user.username }))
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
  }
});

// Get concerts involving artists the user is following
router.get("/following", async (req, res) => {
  if (!req.query.user) {
    res.status(400).send({ message: "No user provided" });
    return;
  }
  const user = await User.findOne({ username: req.query.username });
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  const concerts = [];
  user.following.forEach(async (artist) => {
    const relevant = await Concert.find({ "artists.name": artist });
    concerts.push(relevant);
  });
  let uniqueConcerts = [...new Map(concerts.map((v) => [v.id, v])).values()];
  uniqueConcerts.sort((a, b) => a.date - b.date); // this might not work correctly (idea is to sort by date desc)
  res.send(sortedConcerts);
});

// Create new concert
router.post("/", (req, res) => {
  const existing = Concert.findOne({ id: req.body.id });
  if (existing) {
    res.status(400).send({ message: "Concert already exists" });
  } else {
    try {
      const concert = new Concert({
        id: req.body.id,
        artists: req.body.artists,
        name: req.body.name,
        url: req.body.url,
        date: req.body.date,
        venue: req.body.venue,
        image: req.body.image,
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
