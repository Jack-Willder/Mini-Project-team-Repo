// src/middleware/artistAuth.js
function ensureArtist(req, res, next) {
    if (req.session && req.session.artist) {
        return next(); // Artist logged in → continue
    }
    res.redirect('/artist_login.html'); // Not logged in → go to artist login
}

module.exports = ensureArtist;
