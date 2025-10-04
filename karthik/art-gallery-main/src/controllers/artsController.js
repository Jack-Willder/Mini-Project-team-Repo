const db = require('../config/db');
const path = require('path');
const fs = require('fs');

// Function to handle uploading new art
exports.uploadArt = (req, res) => {
    const { title, description, price } = req.body;
    const artist = req.session.artist; // ✅ we stored whole artist object in session
    const image = req.file ? `artworks/${req.file.filename}` : null;


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

// Show all arts for Home Page (order by latest at bottom)
exports.getAllArts = (req, res) => {
    const sql = "SELECT a.id, a.title, a.description, a.price, a.image, ar.username AS artist_name FROM arts a JOIN artists ar ON a.artist_id = ar.id ORDER BY a.id ASC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Database error");
        }
        res.json(results); // send JSON to frontend
    });
};

// Show only logged-in artist's arts for "My Arts"
exports.getMyArts = (req, res) => {
    if (!req.session.artist) {
        return res.status(401).send("Unauthorized");
    }
    const artistId = req.session.artist.id;
    const sql = "SELECT id, title, description, price, image FROM arts WHERE artist_id = ? ORDER BY id ASC";
    db.query(sql, [artistId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Database error");
        }
        res.json(results);
    });
};



// Delete Art
exports.deleteArt = (req, res) => {
    if (!req.session.artist) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const artId = req.params.id;
    const artistId = req.session.artist.id; // ✅ FIXED: use artist.id from session

    // 1. Check if the art belongs to this artist
    db.query('SELECT * FROM arts WHERE id = ? AND artist_id = ?', [artId, artistId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(403).json({ message: 'Not authorized to delete this art' });
        }

        const art = results[0];
        const imagePath = path.join(__dirname, '../../uploads', art.image);


        // 2. Delete the record from DB
        db.query('DELETE FROM arts WHERE id = ? AND artist_id = ?', [artId, artistId], (err2, result) => {
            if (err2) {
                console.error(err2);
                return res.status(500).json({ message: 'Failed to delete art' });
            }

            // 3. Delete the image file if it exists
            fs.unlink(imagePath, (unlinkErr) => {
                if (unlinkErr && unlinkErr.code !== 'ENOENT') {
                    console.error('Failed to delete image file:', unlinkErr);
                }
            });

            return res.json({ success: true, message: 'Art deleted successfully' });
        });
    });
};


//view each arts through homepage
// Get single art by ID
exports.getArtById = (req, res) => {
    const artId = req.params.id;
    const sql = `
    SELECT arts.*, artists.profile_image AS artist_image, artists.name AS artist_name
    FROM arts
    JOIN artists ON arts.artist_id = artists.id
    WHERE arts.id = ?`;

    db.query(sql, [artId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: 'Art not found' });
        res.json(result[0]);
    });
};


