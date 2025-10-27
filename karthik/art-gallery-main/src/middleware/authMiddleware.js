// src/middleware/authMiddleware.js
function ensureAdmin(req, res, next) {
    if (req.session && req.session.admin) {
        return next(); // ✅ admin logged in
    }
    // ❌ Not logged in as admin
    return res.status(401).json({ message: 'Access denied. Admins only.' });
}

function ensureUser(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    return res.status(401).json({ message: 'Not logged in' });
}

module.exports = { ensureUser, ensureAdmin };
