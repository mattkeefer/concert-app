require("dotenv").config();

const { EXAMPLE_DATA } = require("./data/example.js");
const {
  userSchema,
  concertSchema,
  interestSchema,
} = require("./db/schemas.js");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const userRoute = require("./routes/User.js");
const concertRoute = require("./routes/Concert.js");
const interestRoute = require("./routes/Interest.js");
const friendRoute = require("./routes/Friend.js");
const followingRoute = require("./routes/Following.js");
app.use("/users", userRoute);
app.use("/concerts", concertRoute);
app.use("/interests", interestRoute);
app.use("/friends", friendRoute);
app.use("/followings", followingRoute);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", userSchema);

// Check authorization token to protect endpoint
const auth = async (req, res, next) => {
  try {
    const token = await req.headers.Authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
    const user = await decodedToken;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

// Register a new user using username, password
app.post("/register", (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      user
        .save()
        .then((result) => {
          res.status(201).send({
            message: "User created successfully",
            result,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error creating user",
            err,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Password could not be hashed successfully",
        err,
      });
    });
});

// Login using email and password, return token if successful
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send({
        message: "Email not found",
      });
    } else {
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Incorrect password",
              err,
            });
          }

          // Create login token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          res.status(200).send({
            message: "Login successful",
            email: user.email,
            username: user.username,
            token,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({
            message: "Incorrect password",
            err,
          });
        });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error occurred while logging in",
      err,
    });
  }
});

app.listen(3000, () => console.log("Server listening to port 3000"));
