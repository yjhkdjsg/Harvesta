import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wallet = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/wallet', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching wallet balance:', error);
            }
        };

        fetchWallet();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Your Wallet</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Balance</h2>
                <p className="text-lg">₹{balance}</p>
            </div>
        </div>
    );
};

export default Wallet;