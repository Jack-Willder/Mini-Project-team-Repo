const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ensureArtist = require('../middleware/artistAuth'); // middleware to check login

// ------------------
// Multer setup for profile image
// ------------------
const uploadDir = path.join(__dirname, '../../uploads/profile');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ------------------
// Register Artist
// ------------------
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send("❌ Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO artists (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err, result) => {
            if (err) {
                console.error("❌ Database error:", err); // <--- add this
                return res.status(500).send("❌ Database error");
            }
            res.redirect('/artist_login.html');
        }
    );
});

// ------------------
// Artist Login
// ------------------
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM artists WHERE email = ?", [email], async (err, results) => {
        if (err) {
            console.error("Database error:", err); // <-- detailed error
            return res.status(500).send("❌ Database error");
        }
        if (results.length === 0) return res.status(401).send("❌ Invalid email or password");

        const artist = results[0];
        const isMatch = await bcrypt.compare(password, artist.password);
        if (!isMatch) return res.status(401).send("❌ Invalid email or password");

        req.session.artist = { id: artist.id, username: artist.username, email: artist.email };
        res.redirect('/artist_dashboard.html'); // after login
    });
});

// ------------------
// Logout
// ------------------
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/home.html');
});

// ------------------
// Edit/Update Artist Profile
// ------------------
router.post('/update', ensureArtist, upload.single('profile_image'), (req, res) => {
    const artistId = req.session.artist.id;
    const { name, bio } = req.body;

    let query = 'UPDATE artists SET name = ?, bio = ?';
    const params = [name, bio];

    if (req.file) {
        query += ', profile_image = ?';
        params.push('/uploads/profile/' + req.file.filename);
    }

    query += ' WHERE id = ?';
    params.push(artistId);

    db.query(query, params, (err, result) => {
        if (err) return res.status(500).send("❌ Database error");
        res.redirect('/artist_profile.html'); // redirect after update
    });
});

// ------------------
// Get Logged-in Artist Profile with their Artworks
// ------------------
router.get('/me', ensureArtist, (req, res) => {
    const artistId = req.session.artist.id;
    const artistQuery = 'SELECT id, username, name, bio, profile_image FROM artists WHERE id = ?';
    const artsQuery = 'SELECT id, title, description, price, image FROM arts WHERE artist_id = ?';

    db.query(artistQuery, [artistId], (err, artistResult) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!artistResult.length) return res.status(404).json({ message: 'Artist not found' });

        db.query(artsQuery, [artistId], (err, artsResult) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                artist: artistResult[0],
                artworks: artsResult
            });
        });
    });
});

module.exports = router;
