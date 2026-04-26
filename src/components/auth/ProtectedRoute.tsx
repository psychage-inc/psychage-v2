import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GlobalLoading } from '../ui/Skeletons';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

// AUTH-020: defer the loading spinner by 200ms. Auth hydration usually
// completes in <50ms, so rendering GlobalLoading immediately on every
// navigation produces a visible flicker. Render nothing for the first
// 200ms; show the spinner only if loading drags past that.
const LOADING_DEFER_MS = 200;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setShowLoading(false);
            return;
        }
        const timer = setTimeout(() => setShowLoading(true), LOADING_DEFER_MS);
        return () => clearTimeout(timer);
    }, [isLoading]);

    if (isLoading && showLoading) {
        return <GlobalLoading />;
    }
    if (isLoading) {
        // First 200ms — render nothing rather than flash a spinner.
        return null;
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
