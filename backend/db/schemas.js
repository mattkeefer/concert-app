const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email taken"],
  },
  username: {
    type: String,
    required: [true, "Please pick a username"],
    unique: [true, "Username taken"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  spotifyId: {
    type: String,
    required: false,
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Concert",
    },
  ],
});

const concertSchema = new mongoose.Schema({
  id: String,
  name: String,
  url: String,
  date: mongoose.Schema.Types.Date,
  venue: {
    name: String,
    postalCode: String,
    city: String,
    stateCode: String,
    countryCode: String,
    address: String,
  },
  images: [String],
});

const interestSchema = new mongoose.Schema({
  userEmail: String,
  concertID: String,
});

module.exports = { userSchema, concertSchema, interestSchema };
