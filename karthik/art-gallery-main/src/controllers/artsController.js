const db = require('../config/db');

// Function to handle uploading new art
exports.uploadArt = (req, res) => {
    const { title, description, price } = req.body;
    const artist = req.session.artist; // ✅ we stored whole artist object in session
    const image = req.file ? req.file.filename : null;

    if (!title || !description || !price || !image) {
        return res.status(400).send('All fields are required.');
    }

    const sql = "INSERT INTO arts (artist_id, title, description, price, image) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [artist.id, title, description, price, image], (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error');
        }
        res.redirect('/artist_dashboard.html');
    });
};
