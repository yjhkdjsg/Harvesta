import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import logo from '../Assets/favicon.jpg';
import axios from 'axios';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
<<<<<<< HEAD
    const [confirmPassword, setConfirmPassword] = useState("");
=======
    const [confirmpassword, setConfirmPassword] = useState("");
>>>>>>> 0e77bbc (inventory)
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const res = await axios.post("http://localhost:5000/api/signup", { name, email, phone, address, password });
            toast.success(res.data.message);
            setSuccess("Signup successful!");
            setError(null);

            // Clear state variables
=======
        if (password !== confirmpassword) {
            setError("Passwords do not match");
            return;
        }
        const payload = { name, email, phone, address, password ,confirmpassword};
        console.log("Sending payload:", payload); 
        try {
            const res = await axios.post("http://localhost:5000/api/signup", payload);
            toast.success(res.data.message);
            setSuccess("Signup successful!");
            setError(null);
>>>>>>> 0e77bbc (inventory)
            setName("");
            setEmail("");
            setPhone("");
            setAddress("");
            setPassword("");
            setConfirmPassword("");
<<<<<<< HEAD

            navigate('/login');
=======
            const userId = res.data.userId; 
            navigate(`/dashboard/${userId}`);
>>>>>>> 0e77bbc (inventory)
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to signup. Please try again.");
            }
            setSuccess(null);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-[500px] w-full text-gray-600 space-y-5 bg-white p-6 rounded-lg shadow-md">
                <div className="text-center pb-4">
                    <img src={logo} width={300} className="m-auto" alt="Logo" />
                    <h3 className="text-gray-800 text-3xl font-bold mt-2">Create a new account</h3>
                </div>
                <form onSubmit={handleSignup} className="space-y-5">
                    <div>
<<<<<<< HEAD
                        <label className="font-medium">Full Name</label>
                        <input
                            type="text"
                            required
=======
                        <input
                            type="text"
                            required
                            placeholder='Full Name'
>>>>>>> 0e77bbc (inventory)
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
<<<<<<< HEAD
                        <label className="font-medium">Phone Number</label>
                        <input
                            type="tel"
=======
                        
                        <input
                            type="tel"
                            placeholder='Phone Number'
>>>>>>> 0e77bbc (inventory)
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
<<<<<<< HEAD
                        <label className="font-medium">Email Address</label>
=======
                      
>>>>>>> 0e77bbc (inventory)
                        <input
                            type="email"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                            value={email}
<<<<<<< HEAD
=======
                            placeholder='Email'
>>>>>>> 0e77bbc (inventory)
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
<<<<<<< HEAD
                        <label className="font-medium">Address</label>
                        <textarea
                            required
=======
                       
                        <textarea
                            required
                            placeholder='Address'
>>>>>>> 0e77bbc (inventory)
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
<<<<<<< HEAD
                        <label className="font-medium">Confirm Password</label>
                        <input
                            type="password"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                            value={confirmPassword}
=======
                       
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-darkGreen shadow-sm rounded-lg"
                            value={confirmpassword}
>>>>>>> 0e77bbc (inventory)
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-darkGreen hover:bg-darkBrown active:bg-darkGreen rounded-lg duration-150"
                        type='submit'
                    >
                        Sign Up
                    </button>
                </form>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <p className="text-center">
                    Already have an account?
                    <Link to="/login" className="font-medium text-darkGreen hover:text-darkBrown ml-1">
                        Log in
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default SignUp;