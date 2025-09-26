const express = require('express');
const app = express();
const path = require("path");
const usersRouter = require('./routes/users');

app.use(express.json());
app.use('/users', usersRouter);

const PORT = process.env.PORT || 5000;

// Serve static files for button and poster apps
const projectRoot = __dirname;
const buttonDir = path.join(projectRoot, 'home.html');
const posterDir = path.join(projectRoot, 'home.css');

// Static mounts so assets like script.js, images, and fonts load
app.use('/home', express.static(buttonDir));
app.use('/home.css', express.static(posterDir));
// Also serve shared assets (e.g., images, fonts) from project root
// app.use('/', express.static(projectRoot));


// Serve static files for button and poster apps
const userloginhtmlDir = path.join(projectRoot, 'user_login.html');
const userlogincssDir = path.join(projectRoot, 'user_login.css');

// Static mounts so assets like script.js, images, and fonts load
app.use('/user_login', express.static(userloginhtmlDir));
app.use('/user_login.css', express.static(userlogincssDir));
// Also serve shared assets (e.g., images, fonts) from project root
// app.use('/', express.static(projectRoot));



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  app.get('/', (req, res) => {
    res.send('Welcome to the Art Gallery API!');
  });

});
