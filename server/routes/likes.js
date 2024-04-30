const express = require("express");
const router = express.Router();
const LikeController = require("../controllers/likes");

router.post("/like/:userId/:storyId", LikeController.likeStory);
router.get("/likes/:userId", LikeController.getUserLikes);

module.exports = router;
