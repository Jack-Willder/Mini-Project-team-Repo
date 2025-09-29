const bodyParser = require("body-parser");
const path = require("path");
const registerRoute = require("./src/routes/register");


// ################ dont change anything below this line ################
const express = require('express');
const app = express();

const usersRouter = require('./src/routes/users');
// const routesRouter = require('./src/routes/auth');
const chalk = require('chalk');
const color = new chalk.Instance({ level: 1 });
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const open = require('open');
// ################ dont change anything above this line ################

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', usersRouter);
// app.use('/routes', routesRouter);

const PORT = process.env.PORT || 5000;

// Serve static files for button and poster apps
const projectRoot = path.join(__dirname, "src", "content");

// #####################Live Reload Start###################
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(projectRoot);
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
// ########################Live Reload End###################

// Static mounts so assets like script.js, images, and fonts load
app.use('/home', express.static(path.join(projectRoot, 'home.html')));
app.use('/home.css', express.static(path.join(projectRoot, 'home.css')));
app.use('/user_login', express.static(path.join(projectRoot, 'user_login.html')));
app.use('/user_login.css', express.static(path.join(projectRoot, 'user_login.css')));
// Also serve shared assets (e.g., images, fonts) from project root
app.use('/', express.static(projectRoot));

app.listen(PORT, () => {
  console.log(color.bold.redBright(`Server running on port ${PORT}`));
  console.log(color.bold.yellow(`Static files served from ${projectRoot}`));
  console.log(color.bold.blue(`http://localhost:${PORT}/home`));
  // open.default(`http://localhost:${PORT}/home`);

  // Basic route to check server status

  app.get('/', (req, res) => {
    res.send('Welcome to the Art Gallery API!');
  });

});

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/routes/register", registerRoute);

// server start

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

