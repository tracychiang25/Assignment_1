var express = require('express');
var router = express.Router();
const gifController = require('../controllers/gifController');
const middleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path')

// Set up multer for file upload
const upload = multer({ dest: 'uploads/' });

//POST- Route to handle video upload and transformation
router.post('/upload', middleware.authenticateJWT, upload.single('video'), gifController.uploadVideo);
//GET- Route to download one gif
router.get('/download/:filename', gifController.downloadGif);
//GET- Route  for getting user history
router.get('/history/:username', middleware.authenticateJWT, gifController.getHistory);
//GET- Upload progress
router.get('/progress/:taskname', gifController.displayProgress);

module.exports = router;