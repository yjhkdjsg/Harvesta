import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from '../Assets/favicon.jpg';

const Login = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Clear state on component mount
        setEmail("");
        setPhone("");
        setPassword("");
        setRememberMe(false);

        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/login", { email, phone, password });
            toast.success(res.data.message);
            setSuccess("Login successful!");
            setError(null);

            if (rememberMe) {
                localStorage.setItem('token', res.data.token);
            } else {
                sessionStorage.setItem('token', res.data.token);
            }

         
            setEmail("");
            setPhone("");
            setPassword("");
            setRememberMe(false);

            navigate('/dashboard');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to login. Please try again.");
            }
            setSuccess(null);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-[500px] w-full text-gray-600 space-y-5 bg-white p-6 rounded-lg shadow-md">
                <div className="text-center pb-4">
                    <h3 className="text-gray-800 text-3xl font-bold mt-2">Login</h3>
                </div>
                <form onSubmit={handleLogin} className="space-y-5">
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
                            type="password"
                            required
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="mr-2"
                        />
                        <label className="text-gray-500">Remember Me</label>
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-darkGreen hover:bg-darkBrown active:bg-darkGreen rounded-lg duration-150"
                        type='submit'
                    >
                        Login
                    </button>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}
                </form>
                <p className="text-center">
                    Don't have an account?
                    <Link to="/signup" className="font-medium text-darkGreen hover:text-darkBrown ml-1">
                        Sign up
                    </Link>
                </p>
                <p className="text-center mt-2">
                    <Link to="/forgot" className="font-medium text-darkGreen hover:text-darkBrown">
                        Forgot Password?
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Login;