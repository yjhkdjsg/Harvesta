<<<<<<< HEAD
import React from 'react';

const Inventory = () => {
    // Replace with actual data fetching logic
    const inventoryItems = [
        { id: 1, name: 'Tomatoes', price: '$2/kg', quantity: '50kg', image: 'path/to/tomatoes.jpg' },
        { id: 2, name: 'Potatoes', price: '$1/kg', quantity: '100kg', image: 'path/to/potatoes.jpg' },
    ];
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInventoryItems = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/inventory', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setInventoryItems(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch inventory items');
                setLoading(false);
            }
        };

        fetchInventoryItems();
    }, []);

    const handleDelete = async (itemId) => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/inventory/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setInventoryItems(inventoryItems.filter(item => item._id !== itemId));
            toast.success('Item deleted successfully');
        } catch (err) {
            toast.error('Failed to delete item');
        }
    };

    const handleEdit = (itemId) => {
        navigate(`/edit-item/${itemId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
>>>>>>> 0e77bbc (inventory)

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Inventory</h2>
<<<<<<< HEAD
            <ul className="space-y-2">
                {inventoryItems.map((item) => (
                    <li key={item.id} className="p-4 border border-gray-300 rounded flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                            <p><strong>Item:</strong> {item.name}</p>
                            <p><strong>Price:</strong> {item.price}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                        </div>
                    </li>
                ))}
            </ul>
=======
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Item Name</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Quantity</th>
                        <th className="py-2">Category</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryItems.map(item => (
                        <tr key={item._id}>
                            <td className="py-2">{item.itemName}</td>
                            <td className="py-2">{item.price}</td>
                            <td className="py-2">{item.quantity}</td>
                            <td className="py-2">{item.category}</td>
                            <td className="py-2">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                                    onClick={() => handleEdit(item._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
>>>>>>> 0e77bbc (inventory)
        </div>
    );
};

export default Inventory;