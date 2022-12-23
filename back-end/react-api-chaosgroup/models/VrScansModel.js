const mongoose = require("mongoose");

const vrScanSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "Please provide id for scan"],
  },
  name: {
    type: String,
  },
  thump: {
    type: String,
  },
  fileName: { type: String },
});

const VrScan = mongoose.model("VrScan", vrScanSchema);

module.exports = VrScan;
