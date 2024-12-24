import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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

    const handleQuantityChange = async (itemId, quantity) => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/api/cart/${itemId}`, { quantity }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCartItems(response.data);
            toast.success('Quantity updated successfully');
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast.error('Failed to update quantity');
        }
    };

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
                                    <img src={item.image} alt={item.itemName} className="w-full h-48 object-cover rounded-t-lg" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{item.itemName}</h3>
                                        <p className="text-gray-600">Price: ₹{item.price}</p>
                                        <div className="flex items-center mt-2">
                                            <label className="mr-2 text-gray-600">Quantity:</label>
                                            <input
                                                type="number"
                                                min="1"
                                                max={item.availableQuantity}
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                                className="w-16 p-2 border border-gray-300 rounded"
                                            />
                                        </div>
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