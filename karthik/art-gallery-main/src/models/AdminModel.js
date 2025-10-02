const db = require('../config/db');
const bcrypt = require('bcryptjs');

const Admin = {
    // Find admin by email
    findByEmail: (email, callback) => {
        db.query("SELECT * FROM admin WHERE email = ?", [email], callback);
    },

    // Create admin with hashed password
    create: async (admin, callback) => {
        try {
            const hashedPassword = await bcrypt.hash(admin.password, 10);
            db.query(
                "INSERT INTO admin (username, email, password) VALUES (?,?,?)",
                [admin.username, admin.email, hashedPassword],
                callback
            );
        } catch (err) {
            callback(err);
        }
    }
};

module.exports = Admin;
