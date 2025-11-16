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

// ✅ Session MUST come BEFORE cors, bodyparser, and routes
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

// ✅ CORS setup (after session)
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500','http://localhost:3000'],
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}));

// ✅ Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Prevent browser from caching old sessions
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
const categoryRoutes = require('./src/routes/categories');
const adminReports = require('./src/routes/adminReports');
const cartRoutes = require("./src/routes/cart");



// ✅ Use routes
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/artists', artistRoutes);
app.use('/arts', artsRoutes);
app.use('/purchases', purchaseRoutes);
app.use('/categories', categoryRoutes);
app.use('/admin', adminReports);
app.use('/api/cart', cartRoutes);



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
