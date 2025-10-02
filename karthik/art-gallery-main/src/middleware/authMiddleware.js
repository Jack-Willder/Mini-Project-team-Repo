// src/middleware/authMiddleware.js

// Middleware to protect user routes
function ensureUser(req, res, next) {
    if (req.session.user) {
        return next(); // user logged in → continue
    }
    res.redirect('/user/login'); // not logged in → go to user login
}

// Middleware to protect admin routes
function ensureAdmin(req, res, next) {
    if (req.session.admin) {
        return next(); // admin logged in → continue
    }
    res.redirect('/admin/login'); // not logged in → go to admin login
}

module.exports = { ensureUser, ensureAdmin };
