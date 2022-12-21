const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please provide email"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
