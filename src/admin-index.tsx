import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminApp from './AdminApp';
import ErrorBoundary from './components/error/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { isAdminDomain } from './lib/urls';
import './styles/globals.css';

// No i18n import — admin is English-only
// No HelmetProvider — admin does not need SEO meta tags

// Handle direct access to /admin.html — redirect to /admin/ for correct routing
if (!isAdminDomain() && window.location.pathname.startsWith('/admin.html')) {
  window.location.replace('/admin/' + window.location.search + window.location.hash);
}

// On admin domain (production): routes are at root, no basename needed
// On same origin (local dev): routes are under /admin, basename strips the prefix
const basename = isAdminDomain() ? '/' : '/admin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
});

const startApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Could not find root element to mount to');
    return;
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter basename={basename}>
              <AuthProvider>
                <AdminApp />
              </AuthProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
