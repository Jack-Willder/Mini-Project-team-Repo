const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureUser } = require('../middleware/authMiddleware');

// ------------------------
// User registration
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);
// User dashboard (protected)
router.get('/home', ensureUser, (req, res) => {
    // Load the  home.html 
    res.sendFile(path.join(__dirname, '../../public/home.html'));
});
// User logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.send("❌ Logout error.");
        }
        res.redirect('/home.html'); 
    });
});

module.exports = router;
