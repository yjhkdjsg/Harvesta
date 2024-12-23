import React, { useState } from 'react';
import logo from '../Assets/logo.png';
import i2 from '../Assets/2.jpg';
import i4 from '../Assets/4.jpg';
import i5 from '../Assets/5.jpg';
import i6 from '../Assets/6.jpg';
import i7 from '../Assets/7.jpg';
import i8 from '../Assets/8.jpg';
import i9 from '../Assets/9.jpg';
import i10 from '../Assets/10.jpg';
import f1 from '../Assets/f1.jpg';
import f2 from '../Assets/f2.jpg';
import f3 from '../Assets/f3.jpg';
import f4 from '../Assets/f4.png';
import { Link } from "react-router-dom";

const images = [
    `url(${i7})`,
    `url(${i4})`,
    `url(${i5})`,
    `url(${i6})`,
    `url(${i2})`,
    `url(${i8})`,
    `url(${i9})`,
    `url(${i10})`,
];

const LandingPage = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const goToPreviousImage = () => {
        setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
    };
    const goToNextImage = () => {
        setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
    };
    return (
        <div>
            <header className="fixed w-full z-10">
                <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900 shadow-md">
                    <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                        <Link to="/" className="flex items-center">
                            <img src={logo} className="h-6 mr-3 sm:h-9" alt="Harvesta Logo" />
                            <span className="self-center text-[40px] font-anton whitespace-nowrap dark:text-white text-darkGreen">Harvesta</span>
                        </Link>
                        <div className="flex items-center lg:order-2">
                            <Link
                                to="/login"
                                className="text-gray-800 dark:text-white hover:bg-gray-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="text-white bg-darkGreen hover:bg-darkBrown font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-lightGreen dark:hover:bg-darkGreen focus:outline-none"
                            >
                                Sign Up
                            </Link>
                        </div>
                        <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-darkGreen rounded lg:bg-transparent lg:text-darkGreen lg:p-0 dark:text-white" aria-current="page">Home</Link>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-darkGreen lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                                </li>
                                <li>
                                    <Link to="/contactus" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-darkGreen lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="h-20"></div>

            {/** Hero Section */}
            <div
                className="banner bg-cover bg-center bg-no-repeat h-[710px] relative"
                style={{ backgroundImage: images[currentImage] }}
            >
                <div className="container mx-auto py-[200px] pb-[150px]">
                    <div className="banner-content text-center">
                        <div className="banner-title text-[80px] md:text-[160px] font-semibold text-white mb-4">Harvesta</div>
                        <div className="banner-desc text-xl text-white mb-6">Sell or buy your products straight from the farms.</div>
                    </div>
                    <div
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer text-white text-4xl"
                        onClick={goToPreviousImage}
                    >
                        &#10094; {/* Left Arrow */}
                    </div>
                    <div
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-white text-4xl"
                        onClick={goToNextImage}
                    >
                        &#10095; {/* Right Arrow */}
                    </div>
                </div>
            </div>

            {/** Features Section */}
            <section className="py-16 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h3 className="text-3xl font-semibold text-gray-900">Products</h3>
                        <p className="mt-2 text-lg text-gray-600">Get products straight from the farm delivered to your doorstep.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8 mt-12">
                        <div className="feature-item">
                            <div className="relative bg-slate-100 p-6 rounded-lg hover:shadow-xl transition-all duration-300">
                                <div className="feature-thumb">
                                    <img src={f1} alt="Fresh Vegetable" className="w-full h-48 object-cover rounded-md" />
                                </div>
                                <div className="feature-content mt-4 text-center">
                                    <a href="#" className="text-xl font-semibold text-gray-800 hover:text-darkGreen">
                                        Fresh Vegetables
                                    </a>
                                    <p className="text-gray-500 mt-2">Fresh organic vegetables, straight from the fields.</p>
                                </div>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="relative bg-slate-100 p-6 rounded-lg hover:shadow-xl transition-all duration-300">
                                <div className="feature-thumb">
                                    <img src={f2} alt="Natural Honey" className="w-full h-48 object-cover rounded-md" />
                                </div>
                                <div className="feature-content mt-4 text-center">
                                    <a href="#" className="text-xl font-semibold text-gray-800 hover:text-yellow-600">
                                        Natural Honey
                                    </a>
                                    <p className="text-gray-500 mt-2">Pure natural honey straight from the bees.</p>
                                </div>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="relative bg-slate-100 p-6 rounded-lg hover:shadow-xl transition-all duration-300">
                                <div className="feature-thumb">
                                    <img src={f3} alt="Fresh Fruits" className="w-full h-48 object-cover rounded-md" />
                                </div>
                                <div className="feature-content mt-4 text-center">
                                    <a href="#" className="text-xl font-semibold text-gray-800 hover:text-red-600">
                                        Fresh Fruits
                                    </a>
                                    <p className="text-gray-500 mt-2">Fresh and juicy fruits at your doorstep.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/** Fruit Section */}
            <section className="harvesta-fruits-section bg-cover bg-center relative py-16 bg-paleYellow">
                <div className="container mx-auto px-4">
                    <div className="section-wrapper">
                        <div className="flex flex-col lg:flex-row-reverse items-center">
                            <div className="lg:w-1/2 w-full">
                                <div className="fruits-left">
                                    <div className="harvesta-fruits-thumb">
                                        <img src={f4} alt="harvesta-farm" className="w-full h-auto object-cover" />
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full">
                                <div className="fruits-right ml-5">
                                    <div className="section-header text-center lg:text-left">
                                        <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800">Fresh Fruits at reasonable prices <span className="text-darkGreen">from the Farms</span></h2>
                                        <p className="mt-4 text-lg text-gray-600">Conveniently sell or buy farm products.</p>
                                        <a href="#" className="mt-6 inline-block bg-darkGreen text-white py-2 px-6 rounded-full text-lg hover:bg-darkBrown transition duration-300">
                                            <span>Buy Now</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/** FAQ Section */}
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto sm:py-16 lg:px-6">
                    <h2 className="mb-8 text-3xl font-semibold text-gray-900 dark:text-white text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="pt-8 text-left border-t border-gray-200 dark:border-gray-700">
                        {[
                            {
                                question: 'What is Harvesta?',
                                answer:
                                    'Harvesta is an online platform connecting farmers and consumers directly, offering fresh produce at fair prices while eliminating intermediaries.',
                            },
                            {
                                question: 'How does Harvesta ensure fair pricing?',
                                answer:
                                    'Farmers set their own prices for their produce, ensuring they receive fair compensation while consumers get affordable products.',
                            },
                            {
                                question: 'Are there shipping charges?',
                                answer:
                                    'Yes, shipping charges are applied based on your location and order size. These will be displayed during the checkout process.',
                            },
                            {
                                question: 'What is the platform fee?',
                                answer:
                                    'A small platform fee is added at checkout to support Harvesta’s operations and ensure seamless service.',
                            },
                            {
                                question: 'How fresh is the produce on Harvesta?',
                                answer:
                                    'All produce comes directly from farmers, ensuring freshness and high quality with minimal time spent in transit.',
                            },
                        ].map((faq, index) => (
                            <div key={index} className="mb-8">
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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
                            <span className="text-[40px] font-light font-anton whitespace-nowrap dark:text-white text-darkGreen">Harvesta</span>
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

export default LandingPage;