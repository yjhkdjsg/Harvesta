import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [kccNumber, setKccNumber] = useState('');
    const [bankName, setBankName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/signup', {
                name,
                email,
                phone,
                address,
                password,
                confirmpassword: confirmPassword,
                userType,
                kccNumber: userType === 'Farmer' ? kccNumber : null,
                bankName: userType === 'Farmer' ? bankName : null
            });
            toast.success(response.data.message);
            localStorage.setItem('userType', userType); // Store user type in local storage
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Failed to sign up. Please try again.');
            }
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-[500px] w-full text-gray-600 space-y-5 bg-white p-6 rounded-lg shadow-md">
                <div className="text-center pb-4">
                    <h3 className="text-gray-800 text-3xl font-bold mt-2">Sign Up</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <input
                            type="text"
                            required
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            required
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            required
                            placeholder='Phone Number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            required
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            required
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Confirm Password</label>
                        <input
                            type="password"
                            required
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">User Type</label>
                        <div className="flex items-center mt-2">
                            <input
                                type="radio"
                                id="farmer"
                                name="userType"
                                value="Farmer"
                                checked={userType === 'Farmer'}
                                onChange={(e) => setUserType(e.target.value)}
                                className="mr-2"
                            />
                            <label htmlFor="farmer" className="mr-4">Farmer</label>
                            <input
                                type="radio"
                                id="consumer"
                                name="userType"
                                value="Consumer"
                                checked={userType === 'Consumer'}
                                onChange={(e) => setUserType(e.target.value)}
                                className="mr-2"
                            />
                            <label htmlFor="consumer">Consumer</label>
                        </div>
                    </div>
                    {userType === 'Farmer' && (
                        <div>
                            <input
                                type="text"
                                placeholder='KCC Number'
                                value={kccNumber}
                                onChange={(e) => setKccNumber(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder='Bank Name'
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-medium bg-darkGreen hover:bg-darkBrown active:bg-darkGreen rounded-lg duration-150"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center">
                    Already have an account?
                    <Link to="/login" className="font-medium text-darkGreen hover:text-darkBrown ml-1">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default SignUp;