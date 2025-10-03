const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const artsController = require('../controllers/artsController');
const ensureArtist = require('../middleware/artistAuth'); // middleware

// ------------------
// Multer setup for artworks
// ------------------
const uploadDir = path.join(__dirname, '../../uploads/artworks');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ------------------
// Upload new artwork
// ------------------
router.post('/upload', ensureArtist, upload.single('image'), artsController.uploadArt);

// ------------------
// Show all artworks (for home page)
// ------------------
router.get('/all', artsController.getAllArts);

// ------------------
// Show only logged-in artist's artworks (My Arts)
// ------------------
router.get('/my', ensureArtist, artsController.getMyArts);

// ------------------
// Delete artwork by ID (only artist who uploaded)
// ------------------
router.delete('/:id', ensureArtist, artsController.deleteArt);

module.exports = router;
