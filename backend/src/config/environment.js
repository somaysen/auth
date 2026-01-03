const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
    UNSPLASH_KEY: process.env.UNSPLASH_KEY,
    PEXELS_KEY: process.env.PEXELS_KEY,
    TENOR_KEY: process.env.TENOR_KEY
};