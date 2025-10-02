function ensureArtist(req, res, next) {
    if (req.session && req.session.artist) {
        next();
    } else {
        res.redirect("/artist_login.html");
    }
}
// authMiddleware.js
exports.ensureArtist = (req, res, next) => {
    if (req.session.artistId) next();
    else res.redirect('/artist_login.html');
};

module.exports = ensureArtist;
