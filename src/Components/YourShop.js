import React, { useState } from 'react';
import ItemsSold from './ItemsSold';
import SellItems from './SellItems';
import Inventory from './Inventory';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const YourShop = () => {
    const [activeTab, setActiveTab] = useState('sell');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            <Navbar />
            <div className="h-20 max-sm:h-40 md:h-30"></div>
            <div className="flex min-h-screen bg-gray-100">
                <aside className="w-1/5 bg-white shadow-md">
                    <nav className="flex flex-col p-4 space-y-2">
                        <button
                            className={`p-4 text-left rounded-lg transition-colors duration-300 ${activeTab === 'sell' ? 'bg-darkGreen text-white' : 'text-darkGreen hover:bg-gray-200'}`}
                            onClick={() => setActiveTab('sell')}
                        >
                            Sell Items
                        </button>
                        <button
                            className={`p-4 text-left rounded-lg transition-colors duration-300 ${activeTab === 'sold' ? 'bg-darkGreen text-white' : 'text-darkGreen hover:bg-gray-200'}`}
                            onClick={() => setActiveTab('sold')}
                        >
                            Items Sold
                        </button>
                        <button
                            className={`p-4 text-left rounded-lg transition-colors duration-300 ${activeTab === 'inventory' ? 'bg-darkGreen text-white' : 'text-darkGreen hover:bg-gray-200'}`}
                            onClick={() => setActiveTab('inventory')}
                        >
                            Inventory
                        </button>
                    </nav>
                </aside>
                <main className="flex-1 p-8">
                    {activeTab === 'sell' && <SellItems />}
                    {activeTab === 'sold' && <ItemsSold />}
                    {activeTab === 'inventory' && <Inventory />}
                </main>
            </div>
        </div>
    );
};

export default YourShop;