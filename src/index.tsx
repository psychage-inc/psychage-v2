import React from 'react';
import ReactDOM from 'react-dom/client';
import { initSentry } from './lib/sentry';
import './lib/i18n';

// Initialize Sentry error monitoring (no-op without VITE_SENTRY_DSN)
initSentry();

// Auto-recover from stale chunk imports after a new deploy.
// Browser cached an old index.html that references a chunk hash that no longer exists.
window.addEventListener('vite:preloadError', () => {
  const KEY = 'psychage:chunk-reload-at';
  const last = Number(sessionStorage.getItem(KEY) || 0);
  if (Date.now() - last > 10_000) {
    sessionStorage.setItem(KEY, String(Date.now()));
    window.location.reload();
  }
});
import App from './App';
import ErrorBoundary from './components/error/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import './styles/globals.css';

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
    console.error("Could not find root element to mount to");
    return;
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <BrowserRouter>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </BrowserRouter>
            </HelmetProvider>
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
