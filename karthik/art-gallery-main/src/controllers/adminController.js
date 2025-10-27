const bcrypt = require('bcryptjs');
const Admin = require('../models/AdminModel');

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
        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
            return res.status(401).send("❌ Invalid email or password");
        }

        // ✅ Store admin in session
        req.session.admin = {
            id: admin.admin_id,
            email: admin.email,
            username: admin.username || ''
        };

        // ✅ Save session before redirect
        req.session.save(err => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).send("Session error");
            }

            console.log("✅ Admin logged in, session stored:", req.session.admin);
            res.redirect('/admin_dashboard.html');
        });
    });
};
