import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/inventory/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const item = response.data;
                setItemName(item.itemName);
                setPrice(item.price);
                setQuantity(item.quantity);
                setCategory(item.category);
            } catch (err) {
                toast.error('Failed to fetch item details');
            }
        };

        fetchItemDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/inventory/${id}`, {
                itemName,
                price,
                quantity,
                category
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Item updated successfully');
            navigate('/yourshop');
        } catch (err) {
            toast.error('Failed to update item');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Item Name</label>
                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Quantity</label>
                    <input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Category</option>
                        <option value="Atta, Rice & Dal">Atta, Rice & Dal</option>
                        <option value="Fresh Veggies">Fresh Veggies</option>
                        <option value="Fresh Fruits">Fresh Fruits</option>
                        <option value="Dairy & Eggs">Dairy & Eggs</option>
                        <option value="Chicken, Meat & Fish">Chicken, Meat & Fish</option>
                        <option value="Masala & Spices">Masala & Spices</option>
                    </select>
                </div>
                <button type="submit" className="px-4 py-2 bg-darkGreen text-white rounded">
                    Update Item
                </button>
            </form>
        </div>
    );
};

export default EditItem;