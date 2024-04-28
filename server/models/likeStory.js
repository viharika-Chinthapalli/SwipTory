const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  likedStories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story"
  }]
});

module.exports = mongoose.model("Like", LikeSchema);

