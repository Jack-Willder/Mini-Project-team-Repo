//purchases.js
 const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

// Route to purchase an art
router.post('/buy', purchaseController.buyArt);


// ✅ Route to get all purchases of a user
router.get('/my-purchases/:userId', purchaseController.getMyPurchases);

router.post('/buy-multiple', purchaseController.buyMultipleArts);


module.exports = router;
