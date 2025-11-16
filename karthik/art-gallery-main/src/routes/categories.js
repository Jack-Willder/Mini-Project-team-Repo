const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 🔹 Get artworks by category (for Paintings, Sculptures, etc.)
router.get('/:id', (req, res) => {
    const categoryId = req.params.id;
    console.log("✅ Category route hit! ID:", categoryId);

    const sql = `
    SELECT a.id, a.title, a.description, a.price, a.image, a.category_id,
           c.name AS category_name, ar.name AS artist_name
    FROM arts a
    JOIN categories c ON a.category_id = c.id
    JOIN artists ar ON a.artist_id = ar.id
    WHERE a.category_id = ?
    ORDER BY a.id DESC
  `;

    db.query(sql, [categoryId], (err, results) => {
        if (err) {
            console.error("❌ DB Error:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.json(results);
    });
});

module.exports = router;
