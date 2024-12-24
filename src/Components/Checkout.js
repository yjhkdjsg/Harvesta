import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCartItems(response.data);
                const total = response.data.reduce((sum, item) => sum + item.price * item.quantity, 0);
                setTotalAmount(total);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const handlePayment = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/checkout', {
                items: cartItems.map(item => ({
                    item: item._id,
                    quantity: item.quantity
                })),
                totalAmount
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Payment successful!');
            // Clear the order summary
            setCartItems([]);
            setTotalAmount(0);
            // Navigate to payment success page
            navigate('/payment-success');
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Payment failed. Please try again.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="h-20"></div>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index} className="mb-4">
                                <div className="flex justify-between">
                                    <span>{item.itemName} (x{item.quantity})</span>
                                    <span>₹{item.price * item.quantity}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-4">
                        <span className="text-xl font-bold">Total:</span>
                        <span className="text-xl font-bold">₹{totalAmount}</span>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
                        <button
                            onClick={handlePayment}
                            className="w-full px-4 py-2 text-white font-medium bg-darkGreen hover:bg-darkBrown active:bg-darkGreen rounded-lg duration-150"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;