const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cors = require('cors');

// Routes
const userRoutes = require('./routes/users');   // User login (session-based)
const artistRoutes = require('./routes/artists'); // Artist login/register (JWT-based)
const ensureAuth = require('./middleware/authMiddleware');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // ✅ allow JSON parsing for API
app.use(express.static(path.join(__dirname, '../public')));

app.use(
    session({
        secret: 'mysecretkey',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } // true only if using HTTPS
    })
);

// Routes
app.use('/users', userRoutes);    // session-based routes
app.use('/artists', artistRoutes); // API routes for artists (JWT)

// User Login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/user_login.html'));
});

// Protected Home page for Users (session-based)
app.get('/home', ensureAuth, (req, res) => {
    // Load the real home.html instead of inline HTML
    res.sendFile(path.join(__dirname, '../public/home_login.html'));
});


// Artist test route (JWT)
app.get('/artists/test', (req, res) => {
    res.json({ msg: "🎨 Artist routes are working!" });
});

module.exports = app;
