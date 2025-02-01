const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}, {
    timestamps: true,
});

// Virtual field to calculate the total price
CartSchema.virtual('totalPrice').get(async function() {
    let total = 0;

    // Iterate over all products in the cart to calculate the total price
    for (let i = 0; i < this.products.length; i++) {
        const product = await mongoose.model('product').findById(this.products[i].product);
        
        // Make sure the product exists
        if (product) {
            total += product.price * this.products[i].quantity;
        }
    }

    return total;
});

// Ensure virtual fields are included when converting to JSON
CartSchema.set('toJSON', {
    virtuals: true
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
