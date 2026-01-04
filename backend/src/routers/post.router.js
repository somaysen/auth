const express = require('express');
const router = express.Router();
const { getMedia } = require('../controllers/post.Controller');

router.get('/media', getMedia);

module.exports = router;