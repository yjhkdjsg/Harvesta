import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../Assets/logo.png';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [userType, setUserType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserType(response.data.userType);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            console.log('Search query:', searchQuery);
            const response = await axios.get(`http://localhost:5000/api/search?query=${searchQuery}`);
            console.log('Search response:', response.data);
            navigate('/search-results', { state: { items: response.data } });
        } catch (error) {
            console.error('Error searching items:', error);
        }
    };

    return (
        <header className="fixed w-full z-10">
            <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900 shadow-md">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                    <Link to="/dashboard" className="flex items-center">
                        <img src={logo} className="h-6 mr-3 sm:h-9" alt="Harvesta Logo" />
                        <span className="self-center text-[40px] font-anton whitespace-nowrap dark:text-white text-darkGreen">Harvesta</span>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        {userType !== 'Consumer' && (
                            <Link
                                to="/YourShop"
                                className="text-black outline outline-2 outline-darkGreen font-medium rounded-lg text-sm px-4 lg:px-5 py-2 dark:bg-lightGreen focus:outline-darkBrown mr-3 hover:scale-105 transition-transform duration-200"
                            >
                                Your Shop
                            </Link>
                        )}
                        <Link
                            to="/cart"
                            className="text-white bg-darkGreen font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-lightGreen dark:hover:bg-darkGreen focus:outline-none hover:scale-105 transition-transform duration-200"
                        >
                            <i className="fas fa-shopping-cart inline-block mr-2"></i>
                            Cart
                        </Link>
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="text-gray-800 dark:text-white focus:outline-none"
                            >
                                <i className="fas fa-user-alt ml-2 text-darkGreen hover:scale-105 transition-transform duration-200 text-2xl"></i>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20 p-3">
                                    <Link
                                        to="/yourprofile"
                                        className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 hover:text-darkGreen dark:hover:bg-gray-700"
                                    >
                                        Your Profile
                                    </Link>
                                    <Link
                                        to="/order-history"
                                        className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 hover:text-darkGreen dark:hover:bg-gray-700"
                                    >
                                        Order History
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 hover:text-darkGreen dark:hover:bg-gray-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                        <div id="google_translate_element" className="ml-10"></div>
                    </div>
                    <div className="flex items-center justify-between w-full lg:w-auto lg:order-1" id="mobile-menu-2">
                        <div className="relative hidden lg:block">
                            <form onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full lg:w-96 pl-5 pr-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-darkGreen focus:outline-none"
                                    placeholder="Search..."
                                />
                                <button
                                    type="submit"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-darkGreen"
                                >
                                    <i className="fas fa-search"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;