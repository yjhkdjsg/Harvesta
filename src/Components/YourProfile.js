import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const YourProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="h-20 max-sm:h-40 md:h-30"></div>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p><strong>Name:</strong> {profileData.name}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>Phone:</strong> {profileData.phone}</p>
                    <p><strong>Address:</strong> {profileData.address}</p>
                </div>
            </div>
        </div>
    );
};

export default YourProfile;