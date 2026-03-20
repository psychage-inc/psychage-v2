import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GlobalLoading } from '../ui/Skeletons';
import { adminUrl, mainUrl, isInAdminApp } from '@/lib/urls';

type UserRole = 'patient' | 'provider' | 'admin';

interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    const onAdminDomain = isInAdminApp();

    if (isLoading) {
        return <GlobalLoading />;
    }

    if (!isAuthenticated) {
        const redirectTo = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`/login?redirectTo=${redirectTo}`} state={{ from: location }} replace />;
    }

    if (user && !allowedRoles.includes(user.role)) {
        // User is logged in but doesn't have the right role
        // Redirect them to their appropriate dashboard (cross-domain if needed)
        if (user.role === 'admin') {
            if (onAdminDomain) {
                return <Navigate to="/dashboard" replace />;
            }
            window.location.href = adminUrl('/dashboard');
            return null;
        }
        if (user.role === 'provider') {
            if (onAdminDomain) {
                window.location.href = mainUrl('/provider');
                return null;
            }
            return <Navigate to="/provider" replace />;
        }
        if (user.role === 'patient') {
            if (onAdminDomain) {
                window.location.href = mainUrl('/dashboard');
                return null;
            }
            return <Navigate to="/dashboard" replace />;
        }

        if (onAdminDomain) {
            window.location.href = mainUrl('/');
            return null;
        }
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default RoleGuard;
