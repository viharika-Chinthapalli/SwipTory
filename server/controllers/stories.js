const Story = require("../models/stories");

const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json({ stories });
  } catch (error) {
    console.error("Error getting stories:", error);
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

const getStoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    console.error('Error fetching story bookmark status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllStories,
  getStoriesBasedOnType,
  getStoryById,
};
