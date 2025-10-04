// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

// Routes
const userRoutes = require('./src/routes/users');
const adminRoutes = require('./src/routes/admin');
const artistRoutes = require('./src/routes/artists');
const artsRoutes = require('./src/routes/arts');


// Middleware
const { ensureUser, ensureAdmin } = require('./src/middleware/authMiddleware');
const ensureArtist = require('./src/middleware/artistAuth');

const app = express();
const PORT = 3000;

// ✅ Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Sessions (works for both User & Admin)
app.use(session({
  secret: 'Karthikeyan8888',   // change to a strong secret
  resave: false,
  saveUninitialized: false,
}));

// ✅ Routes
app.use('/users', userRoutes);   // User register/login
app.use('/admin', adminRoutes);  // Admin login
app.use('/artists', artistRoutes);



// ------------------------
// Default route → home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});


// User dashboard (protected)
app.get('/home', ensureUser, (req, res) => {
  // Load the real home.html instead of inline HTML
  res.sendFile(path.join(__dirname, 'public/home_login.html'));
});


// ------------------------
// User logout
app.get('/users/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/users/login');
});

// ------------------------
// Admin dashboard (protected)
app.get('/admin_dashboard.html', ensureAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin_dashboard.html'));
});

// Admin logout
app.get('/admin/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Artist dashboard
app.use('/uploads', express.static('uploads'));
app.use('/arts', artsRoutes);

app.get('/artist_dashboard.html', ensureArtist, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/artist_dashboard.html'));
});

// ------------------------
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
