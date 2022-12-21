const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/UserModel");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();

dotenv.config({ path: "./.env" });
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

app.post("/signup", jsonParser, async (req, res) => {
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
});

app.post("/login",jsonParser, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "No email or pass",
    });
  }

  const user = await User.findOne({ email, password }).select("+password");

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

const port = process.env.PORT || 1337;

// function handler(req, res) {
//      if(req.url === "/"){
//         res.writeHead(200, {'Content-type':'text/plain'});
//          res.write('Hello, I am a webserver !');
//          res.end();
//     }
//     else if(req.url === "/users"){
//         const users = data.users
//         res.end(JSON.stringify(users))
//     }
//     else if(req.url === "/materials"){
//         const materials = data.materials
//         res.end(JSON.stringify(materials))
//     }
//     else if(req.url === "/vrscans"){
//         const vrscans = data.vrscans
//         res.end(JSON.stringify(vrscans))
//     }
//     else if(req.url === "/tags"){
//         const tags = data.tags
//         res.end(JSON.stringify(tags))
//     }
//     else if(req.url === "/colors"){
//         const colors = data.colors
//         res.end(JSON.stringify(colors))
//     }
//     else if(req.url === "/industries"){
//         const industries = data.industries
//         res.end(JSON.stringify(industries))
//     }
//     else if(req.url === "/manufacturers"){
//         const manufacturers = data.manufacturers
//         res.end(JSON.stringify(manufacturers))
//     }
//     else if(req.url === "/favorites"){
//         res.writeHead(200, {'Content-type':'text/plain'});
//         res.write('Sorry, no such path exists YET');
//         res.end();
//     }
//     // TODO: Add favorites
//     else{
//         res.writeHead(200, {'Content-type':'text/plain'});
//         res.write('Sorry, no such path exists');
//         res.end();
//     }
// }

app.listen(port);
