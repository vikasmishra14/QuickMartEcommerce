const express=require('express');
const { AddtoCart, getCart, deleteProduct, deleteCart,updateProduct } = require('../controllers/CartController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
  
router.route('/').post(protect, AddtoCart).get(protect, getCart).delete(protect, deleteCart);
router.route('/:id').delete(protect, deleteProduct).put(protect, updateProduct);

module.exports = router;