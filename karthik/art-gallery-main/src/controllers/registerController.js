const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.registerUser = (req, res) => {
    const { username, email, password } = req.body;

    // check if user already exists
    User.findByEmail(email, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (result.length > 0) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // insert user
        User.create(username, email, hashedPassword, (err, result) => {
            if (err) return res.status(500).json({ error: "Failed to register user" });

            return res.status(201).json({ message: "User registered successfully" });
        });
    });
};
