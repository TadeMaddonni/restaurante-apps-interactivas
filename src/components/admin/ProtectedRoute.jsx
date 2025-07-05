import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../lib/auth';

const ProtectedRoute = ({ children }) => {
    // Simplemente verificar si hay un token en localStorage
    if (!isAuthenticated()) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute; 