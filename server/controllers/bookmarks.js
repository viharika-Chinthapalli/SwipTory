const Bookmark = require("../models/bookmarks");
const Story = require("../models/stories");

const bookmarkStory = async (req, res) => {
  try {
    const userId = req.params.userId; // Retrieve userId from request parameters
    const storyId = req.params.storyId; // Retrieve storyId from request parameters
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ errorMessage: "Story not found" });
    }
    let bookmark = await Bookmark.findOne({ userId });
    if (!bookmark) {
      bookmark = new Bookmark({
        userId: userId,
        bookmarkedStories: [story],
      });
    } else {
      const isBookmarked = bookmark.bookmarkedStories.some(
        (bookmark) => bookmark._id.toString() === storyId
      );

      if (isBookmarked) {
        bookmark.bookmarkedStories = bookmark.bookmarkedStories.filter(
          (bookmark) => bookmark._id.toString() !== storyId
        );
      } else {
        bookmark.bookmarkedStories.push(story);
      }
    }
    await bookmark.save();
    res.json({ message: "Bookmark status toggled successfully", bookmark });
  } catch (error) {
    console.error("Error toggling bookmark status:", error);
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
};

const getUserBookmarks = async (req, res) => {
  try {
    const userId = req.params.userId; // Retrieve userId from request parameters
    const bookmarks = await Bookmark.findOne({ userId });
    if (!bookmarks) {
      // If no bookmarks found, return an empty array with userId
      return res.json({ userId, bookmarks: [] });
    }
    res.json(bookmarks);
  } catch (error) {
    console.error("Error fetching user bookmarks:", error);
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
};

module.exports = { bookmarkStory, getUserBookmarks };
