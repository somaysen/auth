const imageService = require("../services/images.service");
const videosService = require("../services/videos.service");
const gifService = require("../services/gif.service");

const getMedia = async (req, res) => {
  try {
    const { query, type } = req.query;

    // 🔴 query required
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter "query" is required',
      });
    }

    let data;

    // ✅ type NA ho → teeno ka data (SAFE way)
    if (!type) {
      const results = await Promise.allSettled([
        imageService.searchPhotos(query),
        videosService.searchVideos(query),
        gifService.searchGifs(query),
      ]);

      data = {
        images: results[0].status === "fulfilled" ? results[0].value : [],
        videos: results[1].status === "fulfilled" ? results[1].value : [],
        gifs: results[2].status === "fulfilled" ? results[2].value : [],
      };
    }

    // ✅ type diya ho
    else {
      switch (type) {
        case "images":
          data = await imageService.searchPhotos(query);
          break;

        case "videos":
          data = await videosService.searchVideos(query);
          break;

        case "gifs":
          data = await gifService.searchGifs(query);
          break;

        default:
          return res.status(400).json({
            success: false,
            message: 'Invalid type. Use images, videos, or gifs',
          });
      }
    }

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("Error fetching media:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch media",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { getMedia };
