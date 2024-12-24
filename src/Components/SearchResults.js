import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';

const SearchResults = () => {
    const location = useLocation();
    const items = location.state?.items || [];
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (itemId, quantity) => {
        setQuantities({
            ...quantities,
            [itemId]: quantity
        });
    };

    const addToCart = async (item) => {
        const quantity = quantities[item._id] || 50; // Default to 50 if no quantity is selected
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/cart', {
                itemName: item.itemName,
                price: item.price,
                quantity: quantity,
                image: item.image,
                category: item.category
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            toast.error('Failed to add item to cart');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="h-20"></div>
            <div className="container mx-auto p-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Search Results</h2>
                {items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {items.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-300 relative group shadow-md hover:shadow-lg transition-shadow duration-300">
                                <img src={item.image} alt={item.itemName} className="w-full h-48 object-cover rounded-t-lg" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{item.itemName}</h3>
                                    <p className="text-gray-600">Price: ₹{item.price}</p>
                                    <p className="text-gray-600">Available Quantity: {item.quantity}</p>
                                    <input
                                        type="number"
                                        min="50"
                                        max={item.quantity}
                                        value={quantities[item._id] || 50}
                                        onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded mt-2 mb-9"
                                    />
                                </div>
                                <div className="absolute inset-x-0 bottom-0 transition-all duration-200 translate-y-full group-hover:translate-y-0">
                                    <button
                                        type="button"
                                        onClick={() => addToCart(item)}
                                        className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-darkGreen hover:bg-darkBrown"
                                    >
                                        <i className="fas fa-cart-plus mr-2"></i>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700 text-center">No items found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;