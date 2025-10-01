// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/users', userRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/user_login.html'));

 app.get('/home', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/home.html'));
    });

});


module.exports = app;
