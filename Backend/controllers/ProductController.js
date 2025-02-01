const Product = require('../models/ProductModel');
const asyncHandler = require('express-async-handler');

// add products
// @route POST /api/products
const addProducts = asyncHandler(async (req, res) => {
    const products = req.body;
  
    // Validate the incoming data
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'No products to add' });
    }
  
    // Insert many products at once
    try {
      const createdProducts = await Product.insertMany(products);
      res.status(201).json({ message: 'Products added successfully', products: createdProducts });
    } catch (error) {
      res.status(500).json({ message: 'Error adding products', error: error.message });
    }
  });
  


// @route GET /api/products 
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});


//fetch by category
const getProductsByQuery= asyncHandler(async (req, res) => {

    const { category, minPrice, maxPrice , id} = req.query;

    // Build the query object
    let query = {};

    
    if (category && category !== 'all') {
        query.category = category;  // Filter by category
    }

    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = minPrice;  // Greater than or equal to minPrice
        if (maxPrice) query.price.$lte = maxPrice;  // Less than or equal to maxPrice
    }
    if(id){
      query._id = id;
    } 
    const products = await Product.find(query);
    res.json(products);
 
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (product) {
      await Product.findByIdAndDelete(req.params.id);  // Delete the product by its ID
      res.json({ message: 'Product removed' });
  } else {
      res.status(404).json({ message: 'Product not found' });
  }
});


module.exports = { addProducts, getProducts, getProductsByQuery ,deleteProduct};