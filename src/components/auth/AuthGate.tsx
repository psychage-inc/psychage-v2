import React, { useState } from 'react';
import { LogIn, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AuthModal from './AuthModal';

interface AuthGateProps {
    children: React.ReactNode;
    /** What to render when not authenticated. Defaults to a styled prompt card. */
    fallback?: React.ReactNode;
    /** Custom message for the auth prompt */
    message?: string;
    /** If true, renders an inline card. If false/default, renders children behind a blurred overlay. */
    inline?: boolean;
}

/**
 * AuthGate — inline auth gating without page navigation.
 *
 * Unlike ProtectedRoute (which redirects to /login and destroys page state),
 * AuthGate renders inline and preserves the current page. Critical for
 * gating "Save" actions on public tools like Clarity Score.
 */
const AuthGate: React.FC<AuthGateProps> = ({
    children,
    fallback,
    message = 'Sign in to save your progress and track over time.',
    inline = false,
}) => {
    const { isAuthenticated } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    if (isAuthenticated) {
        return <>{children}</>;
    }

    if (fallback) {
        return <>{fallback}</>;
    }

    if (inline) {
        return (
            <>
                <div className="rounded-xl border border-border/50 bg-surface/50 backdrop-blur-sm p-5">
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                            <Sparkles size={18} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-text-secondary leading-relaxed mb-3">
                                {message}
                            </p>
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors shadow-md shadow-primary/20"
                            >
                                <LogIn size={14} />
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
                <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            </>
        );
    }

    // Overlay mode: render children behind a blur with a centered prompt
    return (
        <>
            <div className="relative">
                <div className="pointer-events-none select-none blur-sm opacity-50" aria-hidden>
                    {children}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px] rounded-xl">
                    <div className="text-center p-6 max-w-sm">
                        <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                            <LogIn size={18} />
                        </div>
                        <p className="text-sm text-text-secondary mb-4">{message}</p>
                        <button
                            onClick={() => setShowAuthModal(true)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors shadow-md shadow-primary/20"
                        >
                            <LogIn size={14} />
                            Sign In to Continue
                        </button>
                    </div>
                </div>
            </div>
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    );
};

export default AuthGate;
