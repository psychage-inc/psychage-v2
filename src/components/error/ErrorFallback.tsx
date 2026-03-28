import React from 'react';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

/**
 * Bare-metal error fallback — intentionally avoids framer-motion, lucide-react,
 * and any other library that depends on React hooks internally. If those libraries
 * are the reason the app crashed (e.g. duplicate React instances), using them here
 * would cause the error recovery itself to fail, producing a blank white page.
 */
const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      backgroundColor: '#f8fafc',
      color: '#0f172a',
    }}>
      <div style={{ maxWidth: '28rem', width: '100%', textAlign: 'center' }}>
        <div style={{
          width: '5rem',
          height: '5rem',
          backgroundColor: '#fef2f2',
          color: '#ef4444',
          borderRadius: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          fontSize: '2.5rem',
        }}>
          !
        </div>

        <h1 style={{
          fontWeight: 700,
          fontSize: '1.875rem',
          marginBottom: '1rem',
        }}>
          Something went wrong.
        </h1>
        <p style={{
          color: '#64748b',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}>
          We're experiencing technical difficulties. Our team has been notified.
        </p>

        {error && (
          <p style={{
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            backgroundColor: '#f1f5f9',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            color: '#991b1b',
            marginBottom: '2rem',
            wordBreak: 'break-word',
          }}>
            {error.message}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {resetErrorBoundary && (
            <button
              onClick={resetErrorBoundary}
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          )}

          <button
            onClick={handleGoHome}
            style={{
              width: '100%',
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              backgroundColor: 'transparent',
              color: '#0f172a',
              border: '2px solid #e2e8f0',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
