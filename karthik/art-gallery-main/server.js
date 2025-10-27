const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const db = require('./src/config/db');

const app = express();
const PORT = 3000;

// 🟢 Serve static files (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ CORS setup (important for Live Server frontend)
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // add both!
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));

// ✅ Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Session setup
app.use(session({
  secret: 'Karthikeyan8888',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // false for localhost
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Prevent browser from caching old sessions
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// ✅ Middleware imports
const { ensureUser, ensureAdmin } = require('./src/middleware/authMiddleware');
const ensureArtist = require('./src/middleware/artistAuth');

// ✅ Route imports
const userRoutes = require('./src/routes/users');
const adminRoutes = require('./src/routes/admin');
const artistRoutes = require('./src/routes/artists');
const artsRoutes = require('./src/routes/arts');
const purchaseRoutes = require('./src/routes/purchases');

// ✅ Use routes
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/artists', artistRoutes);
app.use('/arts', artsRoutes);
app.use('/purchases', purchaseRoutes);

// ✅ Default route → homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});

// ✅ Protected home (for logged-in users only)
app.get('/home.html', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/user_login.html');
  }
  res.sendFile(path.join(__dirname, 'public/home.html'));
});

// ✅ API route for frontend to check login session
app.get('/api/session', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// ✅ Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/user_login.html');
  });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
