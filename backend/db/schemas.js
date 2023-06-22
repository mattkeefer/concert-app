const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone_no: {
    type: String,
    required: false,
    unique: [true, "Phone number in use"],
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
  name: {
    type: String,
    required: false,
    unique: false,
  },
  image: {
    type: String,
    required: false,
    unique: false,
  },
  location: {
    type: String,
    required: false,
    unique: false,
  },
  following: [String],
  friends: [
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
  artists: [{ name: String, image: String }],
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
  image: String,
});

const interestSchema = new mongoose.Schema({
  username: String,
  concertID: String,
});

module.exports = { userSchema, concertSchema, interestSchema };
