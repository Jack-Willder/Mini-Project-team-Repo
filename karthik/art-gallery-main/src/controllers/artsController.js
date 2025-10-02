// src/controllers/artsController.js
const db = require('../config/db');// make sure this is your MySQL connection

// Function to handle uploading new art
exports.uploadArt = (req, res) => {
    const { title, description, price } = req.body;
    const artist_id = req.session.artistId; // Make sure artist is logged in
    const image = req.file ? req.file.filename : null;

    if (!title || !description || !price || !image) {
        return res.status(400).send('All fields are required.');
    }

    const sql = "INSERT INTO arts (artist_id, title, description, price, image) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [artist_id, title, description, price, image], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error');
        }
        // Redirect artist back to dashboard after upload
        res.redirect('/artist_dashboard.html');
    });
};
