const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  bookmarkedStories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story"
  }] 
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);

