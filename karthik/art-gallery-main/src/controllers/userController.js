const User = require('../models/userModel');
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const userController = {
    // 🟢 Register user
    register: async (req, res) => {
        const { username, email, password, confirmPassword } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            return res.send(`<script>alert('All fields are required!'); window.history.back();</script>`);
        }

        if (password !== confirmPassword) {
            return res.send(`<script>alert('Passwords do not match!'); window.history.back();</script>`);
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            User.create(username, email, hashedPassword, (err) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.send(`<script>alert('Email already registered!'); window.history.back();</script>`);
                    }
                    console.error('❌ DB Insert Error:', err);
                    return res.send(`<script>alert('Error inserting user into database.'); window.history.back();</script>`);
                }

                // ✅ Success message + redirect
                return res.send(`<script>alert('Registration successful!'); window.location.href='/user_login.html';</script>`);
            });

        } catch (err) {
            console.error('❌ Register error:', err);
            return res.send(`<script>alert('Server error during registration.'); window.history.back();</script>`);
        }
    },


    // 🟢 User login
    login: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password required' });
        }

        try {
            User.findByEmail(email, async (err, results) => {
                if (err) {
                    console.error('❌ DB Error:', err);
                    return res.status(500).json({ success: false, message: 'Database error' });
                }

                if (results.length === 0) {
                    return res.status(401).json({ success: false, message: 'User not found' });
                }

                const user = results[0];
                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                    return res.status(401).json({ success: false, message: 'Invalid password' });
                }

                // ✅ Save user session
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                };

                req.session.save(err => {
                    if (err) {
                        console.error('❌ Session save error:', err);
                        return res.status(500).json({ success: false, message: 'Error saving session' });
                    }

                    console.log('✅ Session created for:', req.session.user);
                    return res.json({
                        success: true,
                        message: 'Login successful',
                        user: req.session.user
                    });
                });
            });
        } catch (error) {
            console.error('❌ Login error:', error);
            return res.status(500).json({ success: false, message: 'Server error during login' });
        }
    },

    // 🟢 User Dashboard API
    getDashboard: async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ error: 'Not logged in' });
            }

            const userId = req.session.user.id;

            const queryAsync = (sql, params = []) => new Promise((resolve, reject) => {
                db.query(sql, params, (err, results) => err ? reject(err) : resolve(results));
            });

            const [userResult, orderCountResult, orderStatusResult] = await Promise.all([
                queryAsync('SELECT username, email FROM users WHERE id = ?', [userId]),
                queryAsync('SELECT COUNT(*) AS totalOrders FROM purchases WHERE user_id = ?', [userId]),
                queryAsync(`
                SELECT 
                    p.id, 
                    a.title AS artTitle, 
                    p.status, 
                    p.purchase_date 
                FROM purchases p
                JOIN arts a ON p.art_id = a.id
                WHERE p.user_id = ?
                ORDER BY p.purchase_date DESC
            `, [userId])
            ]);


            if (!res.headersSent) {
                res.status(200).json({
                    message: 'User dashboard data fetched successfully',
                    user: userResult[0] || {},
                    totalOrders: orderCountResult[0]?.totalOrders || 0,
                    orders: orderStatusResult || []
                });
            }

        } catch (err) {
            console.error("❌ Dashboard Error:", err.message);
            if (!res.headersSent)
                return res.status(500).json({ error: 'Error fetching dashboard data' });
        }
    },



    // 🟢 New API — Get user's own orders (used by my_orders.html)
    getUserOrders: async (req, res) => {
        if (!req.session.user) {
            return res.status(401).json({ error: 'Not logged in' });
        }

        const userId = req.session.user.id;
        console.log("📦 Fetching orders for user:", userId);

        const query = `
            SELECT 
                p.id, 
                a.title AS artTitle, 
                p.status, 
                p.purchase_date AS created_at 
            FROM purchases p
            JOIN arts a ON p.art_id = a.id
            WHERE p.user_id = ?
            ORDER BY p.purchase_date DESC
        `;

        db.query(query, [userId], (err, results) => {
            if (err) {
                console.error('❌ Error fetching user orders:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            return res.status(200).json({ orders: results });
        });
    },

    // 🟢 Get all users (for Admin)
    getAllUsers: (req, res) => {
        const query = 'SELECT id, username, email, created_at FROM users';
        db.query(query, (err, results) => {
            if (err) {
                console.error('❌ SQL Error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            return res.json(results);
        });
    },

    // 🟢 Delete user by ID (for Admin)
    deleteUser: (req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], (err) => {
            if (err) {
                console.error('Delete User Error:', err);
                return res.status(500).json({ error: 'Failed to delete user' });
            }
            return res.json({ message: 'User deleted successfully' });
        });
    }
};

module.exports = userController;
