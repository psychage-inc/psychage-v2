import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

/** Catches errors in an individual route/page without killing the whole app.
 *  Shows a localized fallback instead of the global error screen and resets
 *  automatically when the pathname changes. */
const RouteErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <ErrorBoundary
            resetKeys={[location.pathname]}
            fallback={(error, reset) => (
                <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-2xl flex items-center justify-center mb-6 text-2xl">!</div>
                    <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">This page encountered an error</h2>
                    <p className="text-gray-500 dark:text-neutral-400 mb-1 max-w-md">Something went wrong loading this page.</p>
                    {error && <p className="text-xs font-mono text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded mt-2 mb-4">{error.message}</p>}
                    <div className="flex gap-3 mt-4">
                        <button onClick={reset} className="px-4 py-2 text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-opacity">Try Again</button>
                        <button onClick={() => navigate('/', { replace: true })} className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-neutral-600 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">Return Home</button>
                    </div>
                </div>
            )}
        >
            {children}
        </ErrorBoundary>
    );
};

export default RouteErrorBoundary;
