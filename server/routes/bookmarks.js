const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmarks");

router.post("/bookmark/:userId/:storyId", bookmarkController.bookmarkStory);
router.get("/bookmarks/:userId", bookmarkController.getUserBookmarks);

module.exports = router;
