import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from '../Assets/favicon.jpg';

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/send-otp", { email });
            toast.success(res.data.message);
            setSuccess("OTP sent to your email!");
<<<<<<< HEAD
=======
            toast.success("OTP sent to your email!");
>>>>>>> 0e77bbc (inventory)
            setError(null);
            setOtpSent(true);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to send OTP. Please try again.");
            }
            setSuccess(null);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/verify-otp", { email, otp, newPassword });
            toast.success(res.data.message);
            setSuccess("Password reset successful!");
            setError(null);
<<<<<<< HEAD
            navigate('/login'); // Navigate to the login page
=======
            navigate('/login'); 
>>>>>>> 0e77bbc (inventory)
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to reset password. Please try again.");
            }
            setSuccess(null);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-[500px] w-full text-gray-600 space-y-5 bg-white p-6 rounded-lg shadow-md">
                <div className="text-center pb-4">
                    <img src={logo} width={300} className="m-auto" alt="Logo" />
                    <h3 className="text-gray-800 text-3xl font-bold mt-2">Forgot Password</h3>
                </div>
                {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-5">
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
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-darkGreen hover:bg-darkBrown active:bg-darkGreen rounded-lg duration-150"
                            type='submit'
                        >
                            Send OTP
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-5">
                        <div>
                            <input
                                type="text"
                                required
                                placeholder='OTP'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                placeholder='New Password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                            />
                        </div>
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-darkGreen hover:bg-darkBrown active:bg-darkGreen rounded-lg duration-150"
                            type='submit'
                        >
                            Reset Password
                        </button>
                    </form>
                )}
                <p className="text-center">
                    <br></br>
                    Don't have an account?
                    <Link to="/signup" className="font-medium text-darkGreen hover:text-darkBrown ml-1">
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Forgot;