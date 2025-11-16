const db = require('../config/db');
const path = require('path');
const fs = require('fs');

// ------------------
// Upload new art
// ------------------
exports.uploadArt = (req, res) => {
    const { title, description, price, art_size } = req.body;
    const artist = req.session.artist;
    const image = req.file ? `artworks/${req.file.filename}` : null;

    if (!title || !description || !price || !image || !art_size) {
        return res.status(400).send('All fields are required.');
    }

    const sql = "INSERT INTO arts (artist_id, title, description, price, art_size, image) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [artist.id, title, description, price, art_size, image], (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error');
        }
        res.redirect('/artist_dashboard.html');
    });
};

// ------------------
// Get all arts (for home page)
// ------------------
exports.getAllArts = (req, res) => {
    const sql = `
        SELECT a.id, a.title, a.description, a.price, a.image, ar.username AS artist_name 
        FROM arts a 
        JOIN artists ar ON a.artist_id = ar.id 
        ORDER BY a.id ASC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Database error");
        }
        res.json(results);
    });
};

// ------------------
// Get logged-in artist's arts (My Arts)
// ------------------
exports.getMyArts = (req, res) => {
    if (!req.session.artist) {
        return res.status(401).send("Unauthorized");
    }
    const artistId = req.session.artist.id;
    const sql = "SELECT id, title, description, price, image, art_size FROM arts WHERE artist_id = ? ORDER BY id ASC";
    db.query(sql, [artistId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Database error");
        }
        res.json(results);
    });
};

// ------------------
// Delete art (admin or artist)
// ------------------
exports.deleteArt = (req, res) => {
    const artId = req.params.id;
    const isAdmin = req.session.admin;
    const artist = req.session.artist;

    if (!isAdmin && !artist) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Admin deletes directly
    if (isAdmin) {
        db.query('SELECT * FROM arts WHERE id = ?', [artId], (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            if (results.length === 0) return res.status(404).json({ message: 'Art not found' });

            const imagePath = path.join(__dirname, '../../uploads', results[0].image);

            db.query('DELETE FROM arts WHERE id = ?', [artId], (err2) => {
                if (err2) return res.status(500).json({ message: 'Failed to delete art' });

                fs.unlink(imagePath, (unlinkErr) => {
                    if (unlinkErr && unlinkErr.code !== 'ENOENT') console.error(unlinkErr);
                });

                return res.json({ success: true, message: 'Art deleted successfully by admin' });
            });
        });
        return;
    }

    // Artist deletes their own art
    db.query('SELECT * FROM arts WHERE id = ? AND artist_id = ?', [artId, artist.id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length === 0) return res.status(403).json({ message: 'Not authorized to delete this art' });

        const imagePath = path.join(__dirname, '../../uploads', results[0].image);

        db.query('DELETE FROM arts WHERE id = ? AND artist_id = ?', [artId, artist.id], (err2) => {
            if (err2) return res.status(500).json({ message: 'Failed to delete art' });

            fs.unlink(imagePath, (unlinkErr) => {
                if (unlinkErr && unlinkErr.code !== 'ENOENT') console.error(unlinkErr);
            });

            return res.json({ success: true, message: 'Art deleted successfully' });
        });
    });
};

// ------------------
// Get single art by ID
// ------------------
exports.getArtById = (req, res) => {
    const artId = req.params.id;
    const sql = `
        SELECT a.id, a.title, a.description, a.price, a.art_size, a.image, 
               ar.username AS artist_name, 
               ar.profile_image AS artist_image,
               c.name AS category_name
        FROM arts a
        JOIN artists ar ON a.artist_id = ar.id
        LEFT JOIN categories c ON a.category_id = c.id
        WHERE a.id = ?
    `;
    db.query(sql, [artId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length === 0) return res.status(404).json({ message: 'Art not found' });
        res.json(results[0]);
    });
};

