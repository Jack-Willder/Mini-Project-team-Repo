const express = require('express');
const router = express.Router();
const db = require('../config/db');
const dayjs = require('dayjs');

router.get('/reports/:type', async (req, res) => {
    const { type } = req.params;

    try {
        let groupQuery = "";

        if (type === "weekly") {
            groupQuery = `
                SELECT 
                    COALESCE(a.title, 'Untitled') AS artwork_title,
                    WEEK(p.purchase_date, 1) AS week,
                    YEAR(p.purchase_date) AS year,
                    MIN(p.purchase_date) AS start_date,
                    MAX(p.purchase_date) AS end_date,
                    COUNT(*) AS total_sales,
                    SUM(p.price) AS total_revenue
                FROM purchases p
                LEFT JOIN arts a ON p.art_id = a.id   -- ✅ LEFT JOIN ensures title fetched
                WHERE p.status = 'Completed'
                GROUP BY a.title, YEAR(p.purchase_date), WEEK(p.purchase_date, 1)
                ORDER BY YEAR(p.purchase_date) DESC, WEEK(p.purchase_date, 1) DESC;
            `;
        }
        else if (type === "monthly") {
            groupQuery = `
                SELECT 
                    COALESCE(a.title, 'Untitled') AS artwork_title,
                    MONTH(p.purchase_date) AS month,
                    YEAR(p.purchase_date) AS year,
                    COUNT(*) AS total_sales,
                    SUM(p.price) AS total_revenue
                FROM purchases p
                LEFT JOIN arts a ON p.art_id = a.id   -- ✅ LEFT JOIN
                WHERE p.status = 'Completed'
                GROUP BY a.title, YEAR(p.purchase_date), MONTH(p.purchase_date)
                ORDER BY YEAR(p.purchase_date) DESC, MONTH(p.purchase_date) DESC;
            `;
        }

        else if (type === "daily") {
            groupQuery = `
                SELECT 
                    COALESCE(a.title, 'Untitled') AS artwork_title,
                    MONTH(p.purchase_date) AS month,
                    YEAR(p.purchase_date) AS year,
                    COUNT(p.purchase_date) AS total_sales,
                FROM purchases p
                LEFT JOIN arts a ON p.art_id = a.id   -- ✅ LEFT JOIN
                WHERE p.status = 'Completed'
                GROUP BY a.title, YEAR(p.purchase_date), MONTH(p.purchase_date)
                ORDER BY YEAR(p.purchase_date) DESC, MONTH(p.purchase_date) DESC;
            `;
        }
        else if (type === "yearly") {
            groupQuery = `
                SELECT 
                    COALESCE(a.title, 'Untitled') AS artwork_title,
                    YEAR(p.purchase_date) AS year,
                    COUNT(*) AS total_sales,
                    SUM(p.price) AS total_revenue
                FROM purchases p
                LEFT JOIN arts a ON p.art_id = a.id   -- ✅ LEFT JOIN
                WHERE p.status = 'Completed'
                GROUP BY a.title, YEAR(p.purchase_date)
                ORDER BY YEAR(p.purchase_date) DESC;
            `;
        }
        else {
            return res.status(400).json({ message: "Invalid report type" });
        }

        const [rows] = await db.promise().query(groupQuery);

        // ✅ Format week range and month name
        const enhancedRows = rows.map(row => {
            if (type === "weekly") {
                const start = row.start_date ? dayjs(row.start_date).format('DD MMM') : '-';
                const end = row.end_date ? dayjs(row.end_date).format('DD MMM') : '-';
                return {
                    artwork_title: row.artwork_title || 'Untitled',
                    week_range: `${start} - ${end}`,
                    year: row.year,
                    total_sales: row.total_sales,
                    total_revenue: row.total_revenue
                };
            }
            else if (type === "monthly") {
                const monthName = dayjs().month(row.month - 1).format('MMMM');
                return {
                    artwork_title: row.artwork_title || 'Untitled',
                    month: monthName,
                    year: row.year,
                    total_sales: row.total_sales,
                    total_revenue: row.total_revenue
                };
            }
            else {
                return {
                    artwork_title: row.artwork_title || 'Untitled',
                    year: row.year,
                    total_sales: row.total_sales,
                    total_revenue: row.total_revenue
                };
            }
        });

        res.json(enhancedRows);
    } catch (error) {
        console.error("Report Error:", error);
        res.status(500).json({ message: "Error generating report" });
    }
});

module.exports = router;
