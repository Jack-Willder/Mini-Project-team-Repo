// src/config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
module.exports = pool;


const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",     // your MySQL username
  password: "",     // your MySQL password
  database: "art_gallery"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL Database");
});

module.exports = db;

