import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser, ROLES } from '../../lib/auth';

const RoleProtectedRoute = ({ children, allowedRoles = [], redirectTo = '/admin/dashboard' }) => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        return <Navigate to="/admin/login" replace />;
    }

    // Si no se especifican roles permitidos, permitir acceso
    if (allowedRoles.length === 0) {
        return children;
    }

    // Verificar si el usuario tiene uno de los roles permitidos
    const hasPermission = allowedRoles.includes(currentUser.rolId);

    if (!hasPermission) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};

export default RoleProtectedRoute;
