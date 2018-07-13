const express = require('express');
const router = express.Router();

const videosController = require('./videos/controller');

router.post('/videos', videosController.create);
router.get('/videos/:id', videosController.show);
router.get('/videos', videosController.index);

module.exports = router;
