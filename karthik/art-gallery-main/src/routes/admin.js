const express = require('express');
const path = require('path');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAdmin } = require('../middleware/authMiddleware');

// ------------------------
// Serve admin login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin_login.html'));
});

// Handle admin login (POST)
router.post('/login', adminController.adminLogin);
// File: routes/adminRoutes.js (or wherever your admin login route is)
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // 1️⃣ Check admin in DB
    db.query('SELECT * FROM admins WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send('Database error');
        if (results.length === 0) return res.status(401).send('Invalid credentials');

        const admin = results[0];

        // 2️⃣ Compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).send('Invalid credentials');

        // 3️⃣ ← SET SESSION HERE
        req.session.admin = {
            id: admin.id,
            username: admin.username,
            email: admin.email
        };

        // 4️⃣ Redirect to dashboard
        res.redirect('/admin_dashboard.html');
    });
});

// Admin dashboard (protected)
router.get('/dashboard', ensureAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin_dashboard.html'));
});

router.get('/check-session', (req, res) => {
    res.json({ session: req.session });
});




// Admin logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.send("❌ Logout error.");
        }
        res.redirect('/admin/login');
    });
  

});

module.exports = router;
