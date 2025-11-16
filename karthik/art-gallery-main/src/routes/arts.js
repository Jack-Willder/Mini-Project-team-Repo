const express = require('express');
const router = express.Router();
const db = require('../config/db');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const artsController = require('../controllers/artsController');
const ensureArtist = require('../middleware/artistAuth'); // middleware
const { ensureAdmin } = require('../middleware/authMiddleware');

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

router.get('/', ensureAdmin, artsController.getAllArts);

// Delete artwork by ID
router.delete('/:id', ensureAdmin, artsController.deleteArt);


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

// Show single artwork by ID (for view page)
router.get('/:id', artsController.getArtById);

// ✅ GET artworks by category
router.get('/category/:id', (req, res) => {
    const categoryId = req.params.id;
    console.log("🟢 Route hit! Category ID:", categoryId);

    const sql = `
    SELECT a.id, a.title, a.description, a.price, a.image, a.category_id,
           c.name AS category_name,
           ar.username AS artist_name,
           ar.profile_image AS artist_image
    FROM arts a
    JOIN categories c ON a.category_id = c.id
    JOIN artists ar ON a.artist_id = ar.id
    WHERE a.category_id = ?
    ORDER BY a.id DESC
`;


    db.query(sql, [categoryId], (err, results) => {
        if (err) {
            console.error("❌ Error fetching category artworks:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }
        console.log("✅ Query Results:", results);
        res.json(results);
    });
});


module.exports = router;
