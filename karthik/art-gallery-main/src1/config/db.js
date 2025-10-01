// src/config/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Karthikeyan8888',
    database: 'art_gallery'
});

db.connect((err) => {
    if (err) throw err;
    console.log('✅ Connected to MySQL database!');
});


module.exports = db;
