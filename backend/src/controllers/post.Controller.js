const imageService = require("../services/images.service");
const videosService = require("../services/videos.service");
const gifService = require("../services/gif.service");

const getMedia = async (req, res) => {
  try {
    const { query, type } = req.query;

    // query required
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter "query" is required',
      });
    }

    let data;

    // ✅ agar type NA ho → teeno ka data
    if (!type) {
      const [images, videos, gifs] = await Promise.all([
        imageService.searchPhotos(query),
        videosService.searchVideos(query),
        gifService.searchGifs(query),
      ]);

      data = {
        images,
        videos,
        gifs,
      };
    } 
    // ✅ agar type ho
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
    console.error("Error fetching media:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch media",
      error: error.message,
    });
  }
};

module.exports = { getMedia };
