const express = require('express');
const router = express.Router();
const { auth, requireAdmin } = require('../middleware/auth');
const userCtrl = require('../controllers/userController');

router.get('/me', auth, userCtrl.getMyProfile);
router.put('/me', auth, userCtrl.updateMyProfile);
router.delete('/me', auth, userCtrl.deleteMyAccount);

// Admin-only to list all users
router.get('/', auth, requireAdmin, userCtrl.listUsers);

module.exports = router;
