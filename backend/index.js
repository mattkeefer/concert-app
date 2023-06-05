require("dotenv").config();

const { EXAMPLE_DATA } = require("./data/example.js");
const { userSchema, concertSchema } = require("./db/schemas.js");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", userSchema);
const Concert = mongoose.model("Concert", concertSchema);

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

app.get("/users", async (req, res) => {
  try {
    const data = await User.find({});
    if (!data) {
      res.send("No entries found");
    }
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.post("/register", (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        spotifyId: req.body.spotifyId,
        friends: [],
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

app.get("/concerts", (req, res) => {
  try {
    res.send(EXAMPLE_DATA);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error fetching concerts",
      err,
    });
  }
});

app.listen(3000, () => console.log("Server listening to port 3000"));
