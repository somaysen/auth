const express = require('express');
const router = express.Router();
const { getMedia } = require('../controllers/post.Controller');
const authmiddleware = require('../middlewares/auth.middleware');

router.get('/media',authmiddleware, getMedia);

module.exports = router;