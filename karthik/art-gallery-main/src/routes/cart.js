const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { ensureUser } = require("../middleware/authMiddleware");

// 🟢 Get user’s cart
router.get("/", ensureUser, async (req, res) => {
    const userId = req.session.user.id;
    const [rows] = await db.query(`
    SELECT a.id, a.title, a.image, a.price, ar.name AS artist_name
    FROM cart_items c
    JOIN artworks a ON c.art_id = a.id
    JOIN artists ar ON a.artist_id = ar.id
    WHERE c.user_id = ?`, [userId]);
    res.json(rows);
});

// 🟢 Add to cart
router.post("/add", ensureUser, async (req, res) => {
    const userId = req.session.user.id;
    const { artId } = req.body;
    await db.query("INSERT INTO cart_items (user_id, art_id) VALUES (?, ?)", [userId, artId]);
    res.json({ success: true, message: "Added to cart" });
});

// 🗑 Remove item
router.delete("/:id", ensureUser, async (req, res) => {
    const userId = req.session.user.id;
    const artId = req.params.id;
    await db.query("DELETE FROM cart_items WHERE user_id = ? AND art_id = ?", [userId, artId]);
    res.json({ success: true });
});

module.exports = router;
