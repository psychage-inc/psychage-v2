import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GlobalLoading } from '../ui/Skeletons';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <GlobalLoading />;
    }

    if (!isAuthenticated) {
        // Redirect to login page with redirectTo query param (survives page refresh)
        // Also pass location via state for backward compatibility
        const redirectTo = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`/login?redirectTo=${redirectTo}`} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
