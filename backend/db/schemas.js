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
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  interestedConcerts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Concert",
    },
  ],
  attendingConcerts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Concert",
    },
  ],
  pastConcerts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Concert",
    },
  ],
});

const concertSchema = new mongoose.Schema({
  name: String,
  date: mongoose.Schema.Types.Date,
  venue: String,
  images: [String],
});
/**
 * name
 * date
 * 
 */

module.exports = { userSchema, concertSchema };
