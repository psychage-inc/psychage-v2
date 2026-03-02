'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultMode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) {
    const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const { signIn, signUp, signInWithGoogle } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMsg(null);

        try {
            if (mode === 'signup') {
                const { error: signUpError } = await signUp(email, password);
                if (signUpError) throw signUpError;
                setSuccessMsg('Check your email for the confirmation link.');
            } else {
                const { error: signInError } = await signIn(email, password);
                if (signInError) throw signInError;
                onClose();
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error: googleError } = await signInWithGoogle();
            if (googleError) throw googleError;
        } catch (err: any) {
            setError(err.message || 'Failed to sign in with Google.');
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md p-8 overflow-hidden border custom-border bg-bg-secondary rounded-2xl"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-text-muted transition-colors rounded-full hover:text-text-primary hover:bg-bg-card"
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-heading text-text-primary mb-2">
                                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p className="text-text-secondary text-sm">
                                {mode === 'signin'
                                    ? 'Sign in to access your Clarity Score history and insights.'
                                    : 'Join Psychage to track your mental wellness journey.'}
                            </p>
                        </div>

                        {error && (
                            <div className="flex items-start gap-3 p-4 mb-6 text-sm text-red-200 bg-red-900/30 border border-red-900/50 rounded-lg">
                                <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                                <p>{error}</p>
                            </div>
                        )}

                        {successMsg && (
                            <div className="flex items-start gap-3 p-4 mb-6 text-sm text-teal-200 bg-teal-900/30 border border-teal-900/50 rounded-lg">
                                <p>{successMsg}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold tracking-wider uppercase text-text-muted ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full py-3 pl-10 pr-4 text-sm text-white transition-colors bg-black/20 border border-white/10 rounded-xl focus:border-teal focus:ring-1 focus:ring-teal outline-none"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold tracking-wider uppercase text-text-muted ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full py-3 pl-10 pr-4 text-sm text-white transition-colors bg-black/20 border border-white/10 rounded-xl focus:border-teal focus:ring-1 focus:ring-teal outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="relative flex items-center justify-center w-full py-3 mt-4 text-sm font-medium text-white transition-transform bg-gradient-to-r from-teal-dark to-teal active:scale-[0.98] rounded-xl hover:shadow-[0_0_20px_rgba(13,148,136,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : (mode === 'signin' ? 'Sign In' : 'Create Account')}
                            </button>
                        </form>

                        <div className="relative flex items-center justify-center my-6">
                            <div className="absolute w-full h-px bg-border"></div>
                            <span className="relative px-4 text-xs font-medium uppercase text-text-muted bg-bg-secondary">Or continue with</span>
                        </div>

                        <button
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="flex items-center justify-center w-full gap-3 py-3 text-sm font-medium transition-colors bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-text-primary"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
                                <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.72 18.23 13.47 18.63 12 18.63C9.16 18.63 6.75 16.71 5.88 14.15H2.19V17.01C4.01 20.62 7.69 23 12 23Z" fill="#34A853" />
                                <path d="M5.88 14.15C5.66 13.49 5.53 12.76 5.53 12C5.53 11.24 5.66 10.51 5.88 9.85V6.99H2.19C1.45 8.46 1 10.18 1 12C1 13.82 1.45 15.54 2.19 17.01L5.88 14.15Z" fill="#FBBC05" />
                                <path d="M12 5.38C13.62 5.38 15.07 5.94 16.22 7.03L19.38 3.87C17.46 2.09 14.97 1 12 1C7.69 1 4.01 3.38 2.19 6.99L5.88 9.85C6.75 7.29 9.16 5.38 12 5.38Z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>

                        <p className="mt-6 text-sm text-center text-text-secondary">
                            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                                className="font-medium text-teal hover:underline"
                            >
                                {mode === 'signin' ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
