const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const artsController = require('../controllers/artsController');
const { ensureArtist } = require('../middleware/artistAuth');

// Create uploads folder if it doesn't exist
const fs = require('fs');
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
// POST route to upload art
router.post('/upload', ensureArtist, upload.single('image'), artsController.uploadArt);

// Debug logs to confirm everything is a function
console.log('ensureArtist:', ensureArtist);
console.log('artsController.uploadArt:', artsController.uploadArt);
console.log('upload.single:', typeof upload.single('image'));


module.exports = router;
