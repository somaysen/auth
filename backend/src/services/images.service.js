const axios = require('axios');
const env = require('../config/environment');

const imageInstance = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        'Authorization': `Client-ID ${env.UNSPLASH_KEY}`
    }
});

const searchPhotos = async (query, page = 1, perPage = 20) => {
  const response = await imageInstance.get("/search/photos", {
    params: {
      query: query,
      page,
      per_page: perPage,
    },
    });
    return response.data;
};

module.exports = {
    searchPhotos
};