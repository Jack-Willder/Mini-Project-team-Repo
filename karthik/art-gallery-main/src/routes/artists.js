const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

// ✅ Register Artist
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send("❌ Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query("INSERT INTO artists (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err, result) => {
            if (err) return res.status(500).send("❌ Database error");
            res.redirect('/artist_login.html'); // ✅ redirect after register
        });
});

// ✅ Artist Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM artists WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).send("❌ Database error");
        if (results.length === 0) return res.status(401).send("❌ Invalid email or password");

        const artist = results[0];
        const isMatch = await bcrypt.compare(password, artist.password);
        if (!isMatch) return res.status(401).send("❌ Invalid email or password");

        req.session.artist = { id: artist.id, username: artist.username, email: artist.email };
        res.redirect('/artist_dashboard.html'); // ✅ after login
    });
});

// ✅ Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/home.html');
});

module.exports = router;
