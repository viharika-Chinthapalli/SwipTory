const Story = require("../models/stories");
const Like = require("../models/likeStory");

const likeStory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const storyId = req.params.storyId;
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ errorMessage: "Story not found" });
    }

    let like = await Like.findOne({ userId });

    if (!like) {
      like = new Like({
        userId: userId,
        likedStories: [storyId],
      });
    } else {
      const isLiked = like.likedStories.some(
        (liked) => liked.toString() === storyId
      );

      if (isLiked) {
        // Unlike the story
        like.likedStories = like.likedStories.filter(
          (liked) => liked.toString() !== storyId
        );
        if (story.likeCount > 0) {
          story.likeCount -= 1; // Decrement like count
        }
      } else {
        // Like the story
        like.likedStories.push(storyId);
        story.likeCount += 1; // Increment like count
      }
    }

    await like.save();
    await story.save(); // Save the updated story

    res.json({ message: "Like status toggled successfully", like });
  } catch (error) {
    console.error("Error toggling like status:", error);
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
};

const getUserLikes = async (req, res) => {
  try {
    const userId = req.params.userId;
    const likes = await Like.findOne({ userId });
    if (!likes) {
      // If no likes found, return an empty array with userId
      return res.json({ userId, likes: [] });
    }
    res.json(likes);
  } catch (error) {
    console.error("Error fetching user likes:", error);
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
};

module.exports = { likeStory, getUserLikes };
