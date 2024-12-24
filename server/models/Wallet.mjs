import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  // Reference to User model
        required: true 
    },
    balance: { 
        type: Number, 
        default: 0  // The wallet balance for the user (farmer)
    },
}, { timestamps: true });

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;