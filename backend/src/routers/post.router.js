const express = require('express');
const router = express.Router();
const { getImages, getVideos,getGifs } = require('../controllers/post.Controller');

router.get('/getdata', getImages);
router.get('/getvideos', getVideos);
router.get('/getgifs', getGifs);

module.exports = router;