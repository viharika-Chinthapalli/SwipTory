const mongoose = require("mongoose");

const UserStoriesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userStories: [{}],
});

module.exports = mongoose.model("UserStory", UserStoriesSchema);
