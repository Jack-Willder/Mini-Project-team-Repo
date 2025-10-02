// hash_admin_passwords.js
const bcrypt = require('bcryptjs');
const db = require('./src/config/db'); // your DB connection

console.log("🔹 Starting hash conversion for admin passwords...");

db.query('SELECT admin_id, password FROM admin', (err, results) => {
    if (err) throw err;

    results.forEach(admin => {
        bcrypt.hash(admin.password, 10, (err, hashedPassword) => {
            if (err) throw err;

            db.query('UPDATE admin SET password = ? WHERE admin_id = ?', [hashedPassword, admin.admin_id], (err) => {
                if (err) throw err;
                console.log(`✅ Password for admin_id ${admin.admin_id} hashed`);
            });
        });
    });
});
