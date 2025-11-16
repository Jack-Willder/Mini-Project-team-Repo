const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureUser } = require('../middleware/authMiddleware');
const { ensureAdmin } = require('../middleware/authMiddleware');


// 🟢----------------------------🟢
// 🔓 USER AUTHENTICATION ROUTES
// 🟢----------------------------🟢

// ✅ User Registration
router.post('/register', userController.register);

// ✅ User Login
router.post('/login', userController.login);


// ✅ Check if user is logged in (used in frontend)
router.get('/check-session', (req, res) => {
    if (req.session && req.session.user) {
        return res.json({
            loggedIn: true,
            user: req.session.user
        });
    }
    res.json({ loggedIn: false });
});


// ✅ Existing routes…
router.get('/dashboard', ensureUser, userController.getDashboard);

// ✅ New route for user orders
router.get('/orders', ensureUser, userController.getUserOrders);

// ✅ Logout Route
router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error('Logout error:', err);
                return res.status(500).json({ success: false, message: 'Error logging out' });
            }
            res.clearCookie('connect.sid', { path: '/' });
            return res.status(200).json({ success: true, message: 'Logged out successfully' });
        });
    } else {
        return res.status(200).json({ success: true, message: 'No active session' });
    }
});

// 🟢----------------------------🟢
// 🔐 ADMIN FEATURES
// 🟢----------------------------🟢

// ✅ Get All Users (Admin only)
router.get('/all', ensureAdmin, userController.getAllUsers);

// ✅ Delete User by ID (Admin only)
router.delete('/:id', ensureAdmin, userController.deleteUser);

// ✅ Export router
module.exports = router;
