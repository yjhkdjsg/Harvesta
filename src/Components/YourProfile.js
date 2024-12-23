import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import f15 from '../Assets/15.jpg';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const YourProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfileData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch profile data');
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/user/${profileData._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Account deleted successfully');
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            navigate('/');
        } catch (err) {
            toast.error('Failed to delete account');
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen">{error}</div>;
    }

    return (
        <div>
        <Navbar />
        <div style={{ backgroundImage: `url(${f15})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            
            <div className="flex items-center justify-center min-h-screen">
                <div className="container mx-auto p-4">
                    <h2 className="text-3xl font-bold mb-6 text-center">Your Profile</h2>
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Name:</label>
                            <p className="text-gray-900">{profileData.name}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Email:</label>
                            <p className="text-gray-900">{profileData.email}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Phone:</label>
                            <p className="text-gray-900">{profileData.phone}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Address:</label>
                            <p className="text-gray-900">{profileData.address}</p>
                        </div>
                        <button
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                        onClick={handleDeleteAccount}
                    >
                        Delete Account
                    </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default YourProfile;