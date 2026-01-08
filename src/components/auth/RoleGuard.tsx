import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GlobalLoading } from '../ui/Skeletons';

type UserRole = 'patient' | 'provider' | 'admin';

interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <GlobalLoading />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user && !allowedRoles.includes(user.role)) {
        // User is logged in but doesn't have the right role
        // Redirect them to their appropriate dashboard or home
        if (user.role === 'admin') return <Navigate to="/admin" replace />;
        if (user.role === 'provider') return <Navigate to="/provider" replace />;
        if (user.role === 'patient') return <Navigate to="/dashboard" replace />;

        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default RoleGuard;
