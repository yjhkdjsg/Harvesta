import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';

const Navbar = () => {
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
        <header className="fixed w-full z-10">
            <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900 shadow-md">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                    <a href="#" className="flex items-center">
                        <img src={logo} className="h-6 mr-3 sm:h-9" alt="Harvesta Logo" />
                        <span className="self-center text-[40px] font-anton whitespace-nowrap dark:text-white text-darkGreen">Harvesta</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="/YourShop"
                            className="text-black outline outline-2 outline-darkGreen font-medium rounded-lg text-sm px-4 lg:px-5 py-2 dark:bg-lightGreen focus:outline-darkBrown mr-3 hover:scale-105 transition-transform duration-200"
                        >
                            Your Shop
                        </Link>
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
                    </div>
                    <div className="flex items-center justify-between w-full lg:w-auto lg:order-1" id="mobile-menu-2">
                        <div className="relative">
                            <input
                                type="text"
                                className="block w-full lg:w-96 pl-10 pr-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-darkGreen focus:outline-none"
                                placeholder="Search..."
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <i className="fas fa-search text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;