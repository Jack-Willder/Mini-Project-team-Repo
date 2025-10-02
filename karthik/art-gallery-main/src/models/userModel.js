// src/models/userModel.js
// src/models/userModel.js
const db = require('../config/db');

const User = {
    create: (username, email, password, callback) => {
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(sql, [username, email, password], callback);
    },

    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], callback);
    }
};

module.exports = User;


module.exports = User;
