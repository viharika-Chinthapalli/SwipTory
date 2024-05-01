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
        like.likedStories = like.likedStories.filter(
          (liked) => liked.toString() !== storyId
        );
        if (story.likeCount > 0) {
          story.likeCount -= 1;
        }
      } else {
        like.likedStories.push(storyId);
        story.likeCount += 1;
      }
    }

    await like.save();
    await story.save();

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
      return res.json({ userId, likes: [] });
    }
    res.json(likes);
  } catch (error) {
    console.error("Error fetching user likes:", error);
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
};

module.exports = { likeStory, getUserLikes };
