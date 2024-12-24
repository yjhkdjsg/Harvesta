import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png'; // Adjust the path if necessary

const PaymentSuccess = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Harvesta Logo" className="w-32 h-32 object-contain" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-green-600">Payment Successful!</h2>
                <p className="text-gray-700 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>
                <div className="flex justify-center space-x-4">
                    <Link to="/order-history" className="px-4 py-2 bg-darkGreen text-white rounded hover:bg-darkBrown">
                        View Order History
                    </Link>
                    <Link to="/dashboard" className="px-4 py-2 bg-darkGreen text-white rounded hover:bg-darkBrown">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;