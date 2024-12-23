import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';

const Item2 = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/items/Fresh%20Veggies');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    const addToCart = async (item) => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/cart', {
                itemName: item.itemName,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                category: item.category
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast(response.data.message);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            toast('Failed to add item to cart');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="h-20"></div>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Fresh Veggies</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-300 relative group">
                            <img src={item.image} alt={item.itemName} className="w-full h-48 object-cover rounded-t-lg" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{item.itemName}</h3>
                                <p className="text-gray-600">Price: ₹{item.price}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
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
            </div>
        </div>
    );
};

export default Item2;