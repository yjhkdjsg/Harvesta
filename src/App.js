import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/landingpage.js';
import './index.css';
import Login from './Components/login.js';
import SignUp from './Components/signup.js';
import Forgot from './Components/forgot.js';
import { Toaster } from 'react-hot-toast';
import Dashboard from './Components/dashboard.js';
import YourShop from './Components/YourShop.js';
import YourProfile from './Components/YourProfile.js';
import EditItem from './Components/EditItem.js';
import ProtectedRoute from './Components/ProtectedRoute.js';
import SearchResults from './Components/SearchResults.js';
import Cart from './Components/cart.js';
import Item1 from './Components/Item1.js';
import Item2 from './Components/Item2.js';
import Item3 from './Components/Item3.js';
import Item4 from './Components/Item4.js';
import Item5 from './Components/Item5.js';
import Item6 from './Components/Item6.js';
import ContactUs from './Components/contactus.js';

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
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
                    <Route path="/yourshop" element={<ProtectedRoute component={YourShop} />} />
                    <Route path="/yourprofile" element={<ProtectedRoute component={YourProfile} />} />
                    <Route path="/edit-item/:id" element={<ProtectedRoute component={EditItem} />} />
                    <Route path="/search-results" element={<ProtectedRoute component={SearchResults} />} />
                    <Route path="/category/atta-rice-dal" element={<ProtectedRoute component={Item1} />} />
                    <Route path="/category/fresh-veggies" element={<ProtectedRoute component={Item2} />} />
                    <Route path="/category/fresh-fruits" element={<ProtectedRoute component={Item3} />} />
                    <Route path="/category/dairy-eggs" element={<ProtectedRoute component={Item4} />} />
                    <Route path="/category/chicken-meat-fish" element={<ProtectedRoute component={Item5} />} />
                    <Route path="/category/masala-spices" element={<ProtectedRoute component={Item6} />} />
                    <Route path="/cart" element={<ProtectedRoute component={Cart} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;