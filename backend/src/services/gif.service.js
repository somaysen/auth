const axios = require('axios');
const env = require('../config/environment');

const gifInstance = axios.create({
    baseURL: 'https://tenor.googleapis.com/v2/search',
    headers: {
        'Authorization': `Client-ID ${env.TENOR_KEY}`
    }
});

const searchGifs = async (query, limit = 20, pos = '') => {
  const response = await gifInstance.get("", {
    params: {
        q: query,
        key: env.TENOR_KEY,
        limit: limit,
        pos: pos
    },
    });
    return response.data;
};
module.exports = {
    searchGifs
};