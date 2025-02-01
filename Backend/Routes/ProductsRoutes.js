const express = require('express')
const { addProducts, getProducts, getProductsByQuery , deleteProduct} = require('../controllers/ProductController');
const router = express.Router(); 

router.post('/Addproducts', addProducts);
router.get('/products', getProducts);
router.get('/products/q', getProductsByQuery);
router.delete('/products/:id', deleteProduct);
module.exports = router;