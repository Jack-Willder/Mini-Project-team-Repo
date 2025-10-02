function ensureArtist(req, res, next) {
    if (req.session && req.session.artist) {
        next();
    } else {
        res.redirect("/artist_login.html");
    }
}

module.exports = ensureArtist;
