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

// Admin dashboard (protected)
router.get('/dashboard', ensureAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin_dashboard.html'));
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
