import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
    const isAuthenticated = !!localStorage.getItem('token') || !!sessionStorage.getItem('token');

    return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;