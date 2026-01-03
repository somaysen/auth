const ImageKit  = require('imagekit');
require('dotenv').config();

const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = process.env;

if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
    throw new Error('Missing ImageKit env vars. Copy `.env.example` to `.env` and set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT');
}

const storageInstance = new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT
});

const uploadImage = async (file, fileName) => {
    try {
        const response = await storageInstance.upload({
            file,
            fileName,
            folder: "pinterest-clone"
        });
        return response;
    } catch (error) {
        throw new Error(`Image upload failed: ${error.message}`);
    }
};

module.exports = uploadImage;