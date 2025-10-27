const db = require('../config/db');

const artistController = {
    // 🟢 Get all artists (for Admin Manage Artists page)
    getAllArtists: (req, res) => {
        const query = 'SELECT id, username, name, email FROM artists ORDER BY id ASC';
        db.query(query, (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.json(results);
        });
    },

    // 🟢 Delete artist by ID (Admin)
    deleteArtist: (req, res) => {
        const { id } = req.params;
        console.log('Deleting artist ID:', id);

        if (!id) return res.status(400).json({ error: 'Artist ID is required' });

        // Start a transaction
        db.beginTransaction(err => {
            if (err) return res.status(500).json({ error: 'Transaction error' });

            // 1️⃣ Delete all artworks of this artist
            db.query('DELETE FROM arts WHERE artist_id = ?', [id], (err, result) => {
                if (err) {
                    console.error('Error deleting artworks:', err);
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Failed to delete artworks' });
                    });
                }

                // 2️⃣ Delete the artist
                db.query('DELETE FROM artists WHERE id = ?', [id], (err, result) => {
                    if (err) {
                        console.error('Error deleting artist:', err);
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Failed to delete artist' });
                        });
                    }

                    // Commit transaction
                    db.commit(err => {
                        if (err) {
                            console.error('Commit error:', err);
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Transaction commit failed' });
                            });
                        }

                        res.json({ message: 'Artist and all artworks deleted successfully' });
                    });
                });
            });
        });
    }

};

module.exports = artistController;
