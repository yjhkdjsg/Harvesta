import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png'; // Adjust the path if necessary

const OrderHistory = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Order History - Harvesta";
    }, []);

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/order-history', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Fetched order items:', response.data); // Debugging statement
                setOrderItems(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching order items:', err); // Debugging statement
                setError('Failed to fetch order items');
                setLoading(false);
            }
        };

        fetchOrderItems();
    }, []);

    const handleReview = (itemId) => {
        navigate(`/review/${itemId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
            <div className="flex justify-center mb-6">
                <img src={logo} alt="Harvesta Logo" className="w-32 h-32 object-contain" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Order History</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {orderItems.map(order => (
                    <div key={order._id} className="bg-white rounded-lg overflow-hidden border border-gray-300 relative group shadow-md hover:shadow-lg transition-shadow duration-300">
                        <img src={order.image} alt={order.itemName} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{order.itemName}</h3>
                            <p className="text-gray-600">Price: ₹{order.price}</p>
                            <p className="text-gray-600">Quantity: {order.quantity}</p>
                            <button
                                className="w-full px-4 py-2 bg-green-500 text-white rounded mt-4"
                                onClick={() => handleReview(order._id)}
                            >
                                Review
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;