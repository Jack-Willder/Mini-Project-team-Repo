const bcrypt = require('bcryptjs');
const Admin = require('../models/AdminModel');

// Handle admin login POST
exports.adminLogin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("⚠️ Email and password are required!");
    }

    Admin.findByEmail(email, async (err, results) => {
        if (err) return res.status(500).send("❌ Database error");

        if (!results || results.length === 0) {
            return res.status(401).send("❌ Invalid email or password");
        }

        const admin = results[0];

        // Use bcrypt to compare plain password with hashed password
        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
            return res.status(401).send("❌ Invalid email or password");
        }

        // Store admin session
        req.session.admin = { id: admin.admin_id, email: admin.email, username: admin.username || '' };
        res.redirect("/admin_dashboard.html"); // Redirect after successful login
    });
};
