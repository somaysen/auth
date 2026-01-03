const axios = require('axios');
const env = require('../config/environment');

const videoInstance = axios.create({
    baseURL: 'https://api.pexels.com',
    headers: {
        'Authorization': `Client-ID ${env.PEXELS_KEY}`
    }
});

const searchVideos = async (query, page = 1, perPage = 20) => {
  const response = await videoInstance.get("/videos/search", {
    params: {
        query: query,
        page,
        per_page: perPage,
    },
    });
    return response.data;
};
module.exports = {
    searchVideos
};