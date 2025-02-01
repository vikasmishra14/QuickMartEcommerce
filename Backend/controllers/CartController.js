const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');
// @route POST /api/cart

const AddtoCart = asyncHandler(async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let Quantity = Number(quantity);

        if (isNaN(Quantity) || Quantity <= 0) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find or create the user's cart
        let cart = await Cart.findOne({ user: user._id });

        // If no cart exists, create a new cart
        if (!cart) {
            cart = new Cart({
                user: user._id,
                products: [{ product: productId, quantity: Quantity }]
            });
        } else {
            // Check if the product already exists in the cart
            const productExist = cart.products.find(p => p.product.toString() === productId.toString());

            if (productExist) {
                // If the product exists, update the quantity
                productExist.quantity += Quantity;
            } else {
                // If the product doesn't exist, add it to the cart
                cart.products.push({ product: productId, quantity: Quantity });
            }
        }

        // Save the cart
        await cart.save();

        // Populate the cart to get product details (e.g., price) for total calculation
        await cart.populate('products.product');

        // Return the updated cart along with the total price
        res.status(201).json(cart);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: error.message });
    }
});

// @route GET /api/cart
const getCart = asyncHandler(async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // The totalPrice virtual is included in the response
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: error.message });
    }
});

// @route DELETE /api/cart/:id
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        console.log(req.params.id,"iiid")
        const user = await User.findById(req.user._id);
        const cart = await Cart.findOne({ user: user._id });
        // p._id.toString() !== req.params.id
       const filtered= cart.products.filter(p =>p.product._id.toString() !== req.params.id);
       console.log(filtered,"filt")
       cart.products =filtered;
        await cart.save();
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// @route DELETE /api/cart
const deleteCart = asyncHandler(async (req, res) => {
    try {
        const
        user = await User.findById(req.user._id);
        const cart = await Cart.findOne({ user: user._id });
        cart.products = [];
        await cart.save();
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//@route Put /api/cart/:id
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const cart = await Cart.findOne({ user: user._id });
        const product = cart.products.find(p => p.product._id.toString() === req.params.id);

        if (product) {
            // Prevent quantity from going below 1
            let newQuantity =Number(req.body.quantity);
            if (newQuantity < 1) newQuantity = 1; // Set to 1 if less than 1

            product.quantity = newQuantity; // Update the product quantity
            await cart.save();
            res.status(200).json({ cart });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = { AddtoCart, getCart, deleteProduct, deleteCart ,updateProduct};