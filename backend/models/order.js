const mongoose = require('mongoose');

const order = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    book: {
            type: mongoose.Types.ObjectId,
            ref: "books",
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Order Shipped", "Order Delivered", "Order Cancelled"]
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("order", order);