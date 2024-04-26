const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    bookmark: {
      type: Boolean,
      default: false, // Default value is false
    },
    like: {
      type: Boolean,
      default: false, // Default value is false
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Story", storySchema);
