const express = require("express");
const router = express.Router();
const LikeController = require("../controllers/likes");

router.post("/like/:userId/:storyId", LikeController.likeStory);

module.exports = router;
