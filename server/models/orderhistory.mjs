import mongoose from 'mongoose';

const orderHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            itemName: { type: String, required: true, trim: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
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
            item: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }
});

const OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);

export default OrderHistory;