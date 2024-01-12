const mongoose = require("mongoose");

const videoDetailsSchema = new mongoose.Schema(
  {
    video: String,
    text: String,
    timestamp: String,
    title: String,
  },
  {
    collection: "videoDetails",
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("VideoDetail", videoDetailsSchema);
