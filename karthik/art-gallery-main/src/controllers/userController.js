// src/controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');  // using bcryptjs

const userController = {
    register: async (req, res) => {
        const { username, email, password, confirmPassword } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            return res.send('⚠️ All fields are required!');
        }

        if (password !== confirmPassword) {
            return res.send('⚠️ Passwords do not match!');
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            User.create(username, email, hashedPassword, (err) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.send('⚠️ Email already registered!');
                    }
                    console.error(err);
                    return res.send('❌ Error inserting user into database.');
                }
                // Redirect to login page after successful registration
                res.redirect('/');
            });
        } catch (err) {
            console.error(err);
            res.send('❌ Error while registering user.');
        }
    },



    login: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send('⚠️ Email and password are required!');
        }

        User.findByEmail(email, async (err, results) => {
            if (err) {
                console.error(err);
                return res.send('❌ Error finding user.');
            }

            if (results.length === 0) {
                return res.send('⚠️ No user found with that email.');
            }

            const user = results[0];
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.send('⚠️ Invalid password.');
            }
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            };

            res.redirect('/home');

        });
    }

};

module.exports = userController;
