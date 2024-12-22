import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/landingpage.js';
import './index.css';
import Login from './Components/login.js';
import SignUp from './Components/signup.js';
import Forgot from './Components/forgot.js';
import { Toaster } from 'react-hot-toast';
import Dashboard from './Components/dashboard.js';
<<<<<<< HEAD
import PrivateRoute from './Components/PrivateRoute.js';
import YourShop from './Components/YourShop.js';
import YourProfile from './Components/YourProfile.js';
=======
import YourShop from './Components/YourShop.js';
import YourProfile from './Components/YourProfile.js';
import SellItems from './Components/SellItems.js';
import EditItem from './Components/EditItem.js';
import ProtectedRoute from './Components/ProtectedRoute.js';
>>>>>>> 0e77bbc (inventory)

const App = () => {
    return (
        <Router>
            <Toaster />
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot" element={<Forgot />} />
<<<<<<< HEAD
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/yourshop" element={<YourShop />} />
                    <Route path="/yourprofile" element={<YourProfile />} />
=======
                    <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
                    <Route path="/yourshop" element={<ProtectedRoute component={YourShop} />} />
                    <Route path="/yourprofile" element={<ProtectedRoute component={YourProfile} />} />
                    <Route path="/edit-item/:id" element={<ProtectedRoute component={EditItem} />} />
>>>>>>> 0e77bbc (inventory)
                </Routes>
            </div>
        </Router>
    );
}

export default App;