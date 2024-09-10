const express = require('express');
const SongController = require('../controllers/songController');
const { route } = require('./meditationRoutes');

const router = express.Router();

router.get('/all' , SongController.all);

module.exports = router;