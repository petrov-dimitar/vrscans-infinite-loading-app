const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/UserModel");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const data = require("./data.json");
const { promisify } = require("util");
const VrScan = require("./models/VrScansModel");

const app = express();

dotenv.config({ path: "../../.env" });
const jsonParser = bodyParser.json();

console.log(dotenv.config);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", false);

mongoose.connect(DB).then((con) => {
  console.log(con.connections);
  console.log("success");
});

app.post(
  "/signup",
  jsonParser,
  catchAsync(async (req, res, next) => {
    console.log("body", req.body);
    const newUser = await User.create(req.body);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  })
);

app.post("/login", jsonParser, async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "No email or pass",
    });
  }

  const user = await User.findOne({ email, password }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    user,
    token,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server", app: "name" });
});

app.post("/", (req, res) => {
  res.send("You can post to this endpoint...");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server", app: "name" });
});

app.get("/users", (req, res) => {
  const users = data.users;
  res.status(200).json(users);
});

app.get("/materials", (req, res) => {
  const materials = data.materials;
  res.status(200).json(materials);
});

app.get("/vrscans", (req, res) => {
  const vrscans = data.vrscans;
  res.status(200).json(vrscans);
});

app.post(
  "/vrscans",
  jsonParser,
  catchAsync(async (req, res, next) => {
    console.log("body", req.body);

    // 1) Identify user from token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    // Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    // 2) Add VrScans to user from model
    const updatedUser = await User.updateOne(currentUser, {
      $addToSet: { favorites: req.body },
    });

    // 3) Return response
    res.status(200).json({
      status: "success",
      token,
      data: {
        updatedUser: updatedUser,
      },
    });
  })
);

app.get("/tags", (req, res) => {
  const tags = data.tags;
  res.status(200).json(tags);
});

app.get("/colors", (req, res) => {
  const colors = data.colors;
  res.status(200).json(colors);
});

app.get("/industries", (req, res) => {
  const colors = data.industries;
  res.status(200).json(industries);
});

app.get("/manufacturers", (req, res) => {
  const colors = data.manufacturers;
  res.status(200).json(manufacturers);
});

// Favourites
// TODO: Make protected route
// TODO Add resource to user collection
app.get("/favorites", (req, res) => {
  res.status(400);
});

// Start server
const port = process.env.PORT || 1337;

app.listen(port);
