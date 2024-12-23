import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Atta, Rice & Dal',
            'Fresh Veggies',
            'Fresh Fruits',
            'Dairy & Eggs',
            'Chicken, Meat & Fish',
            'Masala & Spices'
        ]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;