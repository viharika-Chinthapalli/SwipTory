const Story = require("../models/stories");

const postStory = async (req, res) => {
  try {
    const { img, header, description, type } = req.body;
    // Set default values for bookmark and like as false
    const newStory = new Story({
      img,
      header,
      description,
      type,
      bookmark: false,
      like: false,
    });

    const savedStory = await newStory.save();
    console.log(savedStory);
    res
      .status(201)
      .json({ message: "Story posted successfully", story: savedStory });
  } catch (error) {
    console.error("Error posting story:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json({ stories });
  } catch (error) {
    console.error("Error getting stories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getStoriesBasedOnBookmark = async (req, res) => {
  try {
    const stories = await Story.find({ bookmark: true });
    res.status(200).json({ stories });
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getStoriesBasedOnType = async (req, res) => {
  try {
    const { type } = req.query;
    const filteredStories = await Story.find({ type });
    res.status(200).json({ stories: filteredStories });
  } catch (error) {
    console.error("Error filtering stories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);
    story.bookmark = !story.bookmark;
    const updatedStory = await story.save();
    res.json(updatedStory);
  } catch (error) {
    console.error('Error updating story bookmark:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const updateLike = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);
    story.like = !story.like;
    const updatedStory = await story.save();
    res.json(updatedStory);
  } catch (error) {
    console.error('Error updating story Like:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getStoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json({ isBookmarked: story.bookmark });
  } catch (error) {
    console.error('Error fetching story bookmark status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  getAllStories,
  postStory,
  getStoriesBasedOnType,
  getStoriesBasedOnBookmark,
  updateBookmark,
  getStoryById,
  updateLike
};
