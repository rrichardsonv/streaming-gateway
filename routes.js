const express = require('express');
const router = express.Router();

const videosController = require('./videos/controller');
const thumbsController = require('./thumbs/controller');

router.get('/videos/:id', videosController.show);
router.get('/videos', videosController.index);

router.get('/thumbs/:id', thumbsController.show);

module.exports = router;
