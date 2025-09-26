const pool = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getMyProfile = async (req, res) => {
  const [rows] = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [req.user.id]);
  if (!rows.length) return res.status(404).json({ message: 'User not found' });
  res.json(rows[0]);
};

exports.updateMyProfile = async (req, res) => {
  const { name, password } = req.body;
  const updates = [];
  const params = [];

  if (name) { updates.push('name = ?'); params.push(name); }
  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    updates.push('password = ?'); params.push(hashed);
  }
  if (!updates.length) return res.status(400).json({ message: 'Nothing to update' });

  params.push(req.user.id);
  const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
  await pool.query(sql, params);
  res.json({ message: 'Profile updated' });
};

exports.deleteMyAccount = async (req, res) => {
  await pool.query('DELETE FROM users WHERE id = ?', [req.user.id]);
  res.json({ message: 'Account deleted' });
};

exports.listUsers = async (req, res) => {
  const [rows] = await pool.query('SELECT id, name, email, created_at FROM users ORDER BY created_at DESC');
  res.json(rows);
};
