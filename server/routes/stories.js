const express = require("express");
const router = express.Router();
const storyController = require("../controllers/stories");

router.post("/post-story", storyController.postStory);
router.get("/get-stories", storyController.getAllStories);
router.get("/stories", storyController.getStoriesBasedOnType);
router.get("/bookmarks", storyController.getStoriesBasedOnBookmark);
router.put("/:id", storyController.updateBookmark);
router.put("/updateLike/:id", storyController.updateLike);
router.get("/:id", storyController.getStoryById);

module.exports = router;
