import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError('Failed to fetch cart items');
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="h-20"></div>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
                {cartItems.length > 0 ? (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {cartItems.map((item, index) => (
                                <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-300 relative group">
                                    <img src={`http://localhost:5000/${item.image}`} alt={item.itemName} className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{item.itemName}</h3>
                                        <p className="text-gray-600">Price: ₹{item.price}</p>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleCheckout}
                                className="px-4 py-2 text-white font-medium bg-darkGreen hover:bg-darkBrown active:bg-darkGreen rounded-lg duration-150"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-700 text-center">Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Cart;