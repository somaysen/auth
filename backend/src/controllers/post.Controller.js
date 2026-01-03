const imageService = require("../services/images.service");
const videosService = require("../services/videos.service");
const gifService = require("../services/gif.service");

const getImages = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter "query" is required',
      });
    }

    const data = await imageService.searchPhotos(query);
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching images:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch images",
      error: error.message,
    });
  }
};

const getVideos = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter "query" is required',
      });
    }
    const data = await videosService.searchVideos(query);
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch videos",
      error: error.message,
    });
  }
};

const getGifs = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter "query" is required',
      });
    }
    const data = await gifService.searchGifs(query);
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching gifs:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch gifs",
      error: error.message,
    });
  }
};

module.exports = {
  getImages,
  getVideos,
  getGifs
};
