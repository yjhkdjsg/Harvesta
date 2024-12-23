import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from '../Assets/logo.png'; // Adjust the path if necessary

const Review = () => {
    const { itemId } = useParams(); // Get the item ID from the URL
    const [name, setName] = useState('');
    const [rating, setRating] = useState(1);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/reviews', {
                name,
                rating,
                feedback,
                item: itemId // Include the item ID in the request
            });
            toast.success(response.data.message);
            setName('');
            setRating(1);
            setFeedback('');
        } catch (error) {
            toast.error('Failed to submit review. Please try again.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
                <img src={logo} alt="Harvesta Logo" className="w-32 h-32 object-contain" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Leave a Review</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-darkGreen focus:border-darkGreen sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating:</label>
                    <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-darkGreen focus:border-darkGreen sm:text-sm"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback:</label>
                    <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-darkGreen focus:border-darkGreen sm:text-sm"
                    ></textarea>
                </div>
                <button type="submit" className="w-full bg-darkGreen text-white py-2 px-4 rounded-md shadow-sm hover:bg-darkBrown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkGreen">Submit</button>
            </form>
        </div>
    );
};

export default Review;