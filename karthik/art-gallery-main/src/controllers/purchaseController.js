const db = require('../config/db');

const purchaseController = {
    // 🛒 Buy an artwork
    buyArt: (req, res) => {
        // 🔐 Check if user is logged in
        if (!req.session.user) {
            return res.status(401).send('⚠️ You must be logged in to make a purchase.');
        }

        const userId = req.session.user.id;  // ✅ Logged-in user ID
        const { art_id, price, payment_method } = req.body;

        if (!art_id || !price || !payment_method) {
            return res.status(400).send('⚠️ Missing required fields.');
        }

        const sql = `
            INSERT INTO purchases (user_id, art_id, price, payment_method, status)
            VALUES (?, ?, ?, ?, 'Completed')
        `;

        db.query(sql, [userId, art_id, price, payment_method], (err, result) => {
            if (err) {
                console.error('Error saving purchase:', err);
                return res.status(500).send('❌ Error processing purchase.');
            }

            // ✅ Update art status to Sold
            const updateArtStatus = 'UPDATE arts SET status = "Sold" WHERE id = ?';
            db.query(updateArtStatus, [art_id], (err2) => {
                if (err2) console.error('Error updating art status:', err2);
            });

            res.send('✅ Purchase recorded successfully!');
        });
    },

    // 📜 Fetch logged-in user's purchases
    getMyPurchases: (req, res) => {
        // ✅ Use session user instead of param for security
        if (!req.session.user) {
            return res.status(401).send('⚠️ Please log in to view purchases.');
        }

        const userId = req.session.user.id;

        const sql = `
            SELECT 
                p.id AS purchase_id,
                a.title AS art_title,
                a.image AS art_image,
                p.price,
                p.payment_method,
                p.status,
                p.purchase_date
            FROM purchases p
            JOIN arts a ON p.art_id = a.id
            WHERE p.user_id = ?
            ORDER BY p.purchase_date DESC
        `;

        db.query(sql, [userId], (err, results) => {
            if (err) {
                console.error('Error fetching purchases:', err);
                return res.status(500).send('❌ Error fetching purchase history.');
            }
            res.json(results);
        });
    }
};

module.exports = purchaseController;
