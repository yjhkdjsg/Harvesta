import React, { useState } from 'react';
<<<<<<< HEAD
=======
import axios from 'axios';
import toast from 'react-hot-toast';
>>>>>>> 0e77bbc (inventory)

const SellItems = () => {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');

<<<<<<< HEAD
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to send data to backend
        console.log({ itemName, price, quantity, image, category });
=======
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('category', category);
        if (image) {
            formData.append('image', image);
        }

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/sell-items', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error uploading item:', error);
            toast.error('Failed to add item to inventory');
        }
>>>>>>> 0e77bbc (inventory)
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Sell Items</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
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
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default SellItems;