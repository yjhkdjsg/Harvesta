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
                setOrderItems(response.data);
                setLoading(false);
            } catch (err) {
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
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Image</th>
                        <th className="py-2">Item Name</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Quantity</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItems.map(order => order.items.map(item => (
                        <tr key={item._id}>
                            <td className="py-2">
                                {item.item.image && <img src={`http://localhost:5000/${item.item.image}`} alt={item.item.itemName} className="w-16 h-16 object-cover" />}
                            </td>
                            <td className="py-2">{item.item.itemName}</td>
                            <td className="py-2">{item.item.price}</td>
                            <td className="py-2">{item.quantity}</td>
                            <td className="py-2">
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                    onClick={() => handleReview(item.item._id)}
                                >
                                    Review
                                </button>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;