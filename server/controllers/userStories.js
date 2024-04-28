const Bookmark = require("../models/bookmarks");
const Story = require("../models/stories");
const User = require("../models/user");
const UserStory = require("../models/userStories");

const userStory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await User.find();
    let user = await User.findOne({_id: userId});
    if (!user) {
      return res.status(404).json({ errorMessage: "User not found" });
    } else {
      const { img, header, description, type, likeCount } = req.body;
      const newStory = new Story({
        img,
        header,
        description,
        type,
        likeCount,
      });

      await newStory.save();

      let userStory = await UserStory.findOne({ userId });
      if (!userStory) {
        userStory = new UserStory({
          userId,
          userStories: [],
        });
      }

      userStory.userStories.push(newStory._id);
      await userStory.save();

      res.json({ message: "Story added successfully", userStory });
    }
  } catch (error) {
    console.error("Error adding story:", error);
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
};

const getUserStories = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({_id: userId});
    if (!user) {
      return res.status(404).json({ errorMessage: "User not found" });
    }
    const userStory = await UserStory.findOne({ userId: user._id }).populate('userStories');
    if (!userStory) {
      return res.status(404).json({ errorMessage: "User stories not found" });
    }
    res.json({ userStories: userStory.userStories });
  } catch (error) {
    console.error("Error getting user stories:", error);
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
};

const updateUserStory = async (req, res) => {
  try {
    const { img, header, description, type } = req.body;
    const storyId = req.params.storyId;

    // Find the story by ID
    const storyToUpdate = await Story.findById(storyId);
    
    if (!storyToUpdate) {
      return res.status(404).json({ errorMessage: "Story not found" });
    }

    // Update story fields
    if (img !== undefined) {
      storyToUpdate.img = img;
    }
    if (header !== undefined) {
      storyToUpdate.header = header;
    }
    if (description !== undefined) {
      storyToUpdate.description = description;
    }
    if (type !== undefined) {
      storyToUpdate.type = type;
    }

    // Save the updated story
    await storyToUpdate.save();

    res.json({ message: "Story updated successfully", story: storyToUpdate });
  } catch (error) {
    console.error("Error updating story:", error);
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
};




module.exports = { userStory, getUserStories, updateUserStory };
