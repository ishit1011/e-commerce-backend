const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // user, products, assignedRider, status, address
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    products: [{
        product:{
            type: mongoose.Schema.ObjectId,
            ref: 'Product'
        },
        size: String,
        color: String,
        quantity: Number,
        price: Number,
    }],
    address: String,
    status: {
        type: String,
        enum: ['Paid', 'Delivered', 'Unpaid', 'Undelivered', 'Shipped'],
        default: 'Paid'
    },
    assignedRider: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Order',orderSchema);