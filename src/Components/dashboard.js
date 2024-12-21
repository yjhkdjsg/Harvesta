import React from 'react';
import Navbar from './Navbar';
import logo from '../Assets/logo.png';
import ard from '../Assets/ard.jpg';
import cmf from '../Assets/cmf.jpg';
import dne from '../Assets/dne.jpg';
import fruits from '../Assets/fruits.jpg';
import ms from '../Assets/ms.jpg';
import veg from '../Assets/veg.jpg';
import customer from '../Assets/customer.png';
import farmer from '../Assets/farmer.png';
import checkout from '../Assets/checkout.png';
import team from '../Assets/team.png';
import f15 from '../Assets/15.jpg';

const Dashboard = () => {
    const categories = [
        { title: 'Atta, Rice & Dal', subtitle: 'Organic', image: ard },
        { title: 'Fresh Veggies', subtitle: 'Organic & Fresh', image: veg },
        { title: 'Fresh Fruits', subtitle: 'Fresh from Farm', image: fruits },
        { title: 'Dairy & Eggs', subtitle: 'Fresh from Farm', image: dne },
        { title: 'Chicken, Meat & Fish', subtitle: 'Fresh from Farm', image: cmf },
        { title: 'Masala & Spices', subtitle: 'Freshly Grounded', image: ms }
    ];

    const counters = [
        { id: 1, icon: farmer, value: 5000, label: "Farmers Connected" },
        { id: 2, icon: customer, value: 16000, label: "Satisfied Customers" },
        { id: 3, icon: checkout, value: 100000, label: "Products Sold" },
        { id: 4, icon: team, value: 3, label: "Team Members" }
    ];

    return (
        <div>
            {/** Header */}
            <Navbar />
            <div className="h-20 max-sm:h-40 md:h-30"></div>
            
            {/** Banner */}
            <div className="banner p-10 m-10 rounded-md md:h-120 text-white bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${f15})` }}>
                <div className="container mx-auto flex items-center justify-center h-full">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-white dark:text-white">Fresh Goods</h1>
                        <p className="text-lg text-white dark:text-white">Fresh from Farm to Your Doorstep</p>
                        <button className="text-white outline outline-1 font-semibold px-6 py-2 rounded-lg mt-4 hover:scale-105 transition duration-300">Shop Now</button>
                    </div>
                </div>
            </div>

            {/** Main Content */}
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Shop By Categories</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {categories.map((category, index) => (
                        <div key={index} className="flex flex-col items-center bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                            <div className="w-24 h-24 mb-4 bg-white rounded-lg flex items-center justify-center">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-20 h-20 object-contain"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-sm font-medium text-gray-800">{category.title}</h3>
                                {category.subtitle && (
                                    <p className="text-sm text-gray-600">{category.subtitle}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/** Featured Products */}
            <div className="counter overflow-hidden p-10 bg-gray-100">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-center">
                        {counters.map((counter) => (
                            <div key={counter.id} className="counter__item bg-white shadow-lg p-7 rounded-lg text-center">
                                <div className="counter__inner transform hover:scale-105 transition duration-300">
                                    <div className="thumb mb-4">
                                        <img src={counter.icon} alt={counter.label} className="mx-auto w-16 h-16" />
                                    </div>
                                    <div className="counter__content">
                                        <div className="maincounter mb-2">
                                            <h4 className="text-2xl font-bold text-darkGreen">{counter.value.toLocaleString()}</h4>
                                        </div>
                                        <h6 className="text-lg font-medium text-gray-700">{counter.label}</h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/** Footer */}
            <footer className="bg-white dark:bg-gray-800">
                <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
                        {/** Company Section */}
                        <div>
                            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h3>
                            <ul className="text-gray-500 dark:text-gray-400">
                                {['About', 'Careers', 'Brand Center', 'Blog'].map((item) => (
                                    <li key={item} className="mb-4">
                                        <a href="#" className="hover:text-darkGreen">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/** Help Center Section */}
                        <div>
                            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help center</h3>
                            <ul className="text-gray-500 dark:text-gray-400">
                                {['Discord Server', 'Twitter', 'Facebook', 'Contact Us'].map((item) => (
                                    <li key={item} className="mb-4">
                                        <a href="#" className="hover:text-darkGreen">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/** Legal Section */}
                        <div>
                            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h3>
                            <ul className="text-gray-500 dark:text-gray-400">
                                {['Privacy Policy', 'Licensing', 'Terms'].map((item) => (
                                    <li key={item} className="mb-4">
                                        <a href="#" className="hover:text-darkGreen">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/** Duplicate Company Section */}
                        <div>
                            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h3>
                            <ul className="text-gray-500 dark:text-gray-400">
                                {['About', 'Careers', 'Brand Center', 'Blog'].map((item) => (
                                    <li key={item} className="mb-4">
                                        <a href="#" className="hover:text-darkGreen">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/** Download Section */}
                        <div>
                            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Download</h3>
                            <ul className="text-gray-500 dark:text-gray-400">
                                {['iOS', 'Android', 'Windows', 'MacOS'].map((item) => (
                                    <li key={item} className="mb-4">
                                        <a href="#" className="hover:text-darkGreen">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    {/** Footer Bottom */}
                    <div className="text-center">
                        <a
                            href="#"
                            className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white"
                        >
                            <img src={logo} className="h-6 mr-3 sm:h-9" alt="Harvesta Logo" />
                            <span className="text-[40px] font-light font-anton whitespace-nowrap text-darkGreen dark:text-white">Harvesta</span>
                        </a>
                        <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
                            © Copyright 2024. All Rights Reserved by Harvesta.
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;