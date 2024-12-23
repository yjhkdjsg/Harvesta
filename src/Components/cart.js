import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

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
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="h-20"></div>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {cartItems.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-300 relative group">
                                <img src={item.image} alt={item.itemName} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{item.itemName}</h3>
                                    <p className="text-gray-600">Price: ₹{item.price}</p>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700 text-center">Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Cart;