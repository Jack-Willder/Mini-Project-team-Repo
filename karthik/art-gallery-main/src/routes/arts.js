const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const artsController = require('../controllers/artsController');
const ensureArtist = require('../middleware/artistAuth'); // ✅ FIXED

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ✅ Upload route
router.post('/upload', ensureArtist, upload.single('image'), artsController.uploadArt);

module.exports = router;
