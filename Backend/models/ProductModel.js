const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name: String,
    price: Number,
    image: String, 
    category: String,
    countInStock: Number,
    description: String,
    rating: Number,
    numReviews: Number,
    reviews: [
        {
        name: String,
        rating: Number,
        comment: String
        }
    ]
});
const Product = mongoose.model('product', Schema);
module.exports = Product;