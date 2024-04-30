const express = require("express");
const router = express.Router();
const storyController = require("../controllers/stories");
const userStoriesController = require("../controllers/userStories");

router.post("/post-story/:userId", userStoriesController.userStory);
router.get("/get-userstories/:userId", userStoriesController.getUserStories);
router.patch("/users/:userId/:storyId", userStoriesController.updateUserStory);
router.get("/get-stories", storyController.getAllStories);
router.get("/stories", storyController.getStoriesBasedOnType);
router.get("/view-story/:storyId", storyController.viewStory);
router.get("/:id", storyController.getStoryById);

module.exports = router;
