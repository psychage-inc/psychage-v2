import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../ui/Logo';
import ConsentCheckboxes, { ConsentState, defaultConsentState, isConsentValid } from '../privacy/ConsentCheckboxes';
import { consentService } from '../../services/consentService';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type AuthView = 'login' | 'signup' | 'forgot-password';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [view, setView] = useState<AuthView>('login');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [consent, setConsent] = useState<ConsentState>(defaultConsentState);

    const { login, signup, requestPasswordReset, signInWithGoogle, signInWithApple } = useAuth();

    if (!isOpen) return null;

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setDisplayName('');
        setConsent(defaultConsentState);
        setError(null);
        setSuccessMessage(null);
    };

    const handleViewChange = (newView: AuthView) => {
        resetForm();
        setView(newView);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsLoading(true);

        try {
            if (view === 'login') {
                const result = await login(email, password);
                if (result.success) {
                    resetForm();
                    onClose();
                } else {
                    setError(result.error || 'Failed to sign in. Please check your credentials.');
                }
            } else if (view === 'signup') {
                if (!isConsentValid(consent)) {
                    setError('Please accept all required consents to create your account.');
                    setIsLoading(false);
                    return;
                }
                const result = await signup(email, password, displayName || undefined, 'patient', {
                    age_verified: consent.ageVerified,
                    consent_version: 'v1.0',
                });
                if (result.success) {
                    await consentService.logBulkConsent([
                        { type: 'terms_of_service', granted: true },
                        { type: 'privacy_policy', granted: true },
                        { type: 'data_processing', granted: consent.dataProcessingAccepted },
                        { type: 'age_verification', granted: consent.ageVerified },
                        { type: 'newsletter', granted: consent.newsletterOptIn },
                    ]);
                    setSuccessMessage('Account created! Please check your email to verify your account.');
                } else {
                    setError(result.error || 'Failed to create account. Please try again.');
                }
            } else if (view === 'forgot-password') {
                const result = await requestPasswordReset(email);
                if (result.success) {
                    setSuccessMessage('Password reset email sent! Check your inbox.');
                } else {
                    setError(result.error || 'Failed to send reset email. Please try again.');
                }
            }
        } catch {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        setIsLoading(true);
        try {
            const result = await signInWithGoogle();
            if (!result.success) {
                setError(result.error || 'Failed to sign in with Google');
            }
        } catch {
            setError('Failed to sign in with Google');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAppleSignIn = async () => {
        setError(null);
        setIsLoading(true);
        try {
            const result = await signInWithApple();
            if (!result.success) {
                setError(result.error || 'Failed to sign in with Apple');
            }
        } catch {
            setError('Failed to sign in with Apple');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 transition-all duration-300"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            role="dialog"
                            aria-modal="true"
                            aria-label={view === 'login' ? 'Sign in to Psychage' : view === 'signup' ? 'Create Psychage account' : 'Reset your password'}
                            className="bg-surface w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto border border-border relative"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-teal-500/10 to-transparent pointer-events-none" />
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                            <div className="p-8 relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-2">
                                        <Logo className="h-10 w-auto text-[#1A1A1A] dark:text-white" />
                                        <h2 className="text-2xl font-display font-bold text-text-primary">
                                            {view === 'login' ? 'Welcome back' : view === 'signup' ? 'Join the Journey' : 'Reset password'}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-surface-hover rounded-full transition-colors text-text-tertiary"
                                        aria-label="Close modal"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-2"
                                    >
                                        <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                                        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                                    </motion.div>
                                )}

                                {/* Success Message */}
                                {successMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-start gap-2"
                                    >
                                        <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                                        <p className="text-sm text-green-700 dark:text-green-300">{successMessage}</p>
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {view === 'signup' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <label htmlFor="auth-name" className="block text-sm font-medium text-text-secondary mb-1.5">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                                                <input
                                                    id="auth-name"
                                                    type="text"
                                                    value={displayName}
                                                    onChange={(e) => setDisplayName(e.target.value)}
                                                    autoComplete="name"
                                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-text-primary placeholder:text-text-tertiary"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    <div>
                                        <label htmlFor="auth-email" className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                                            <input
                                                id="auth-email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                autoComplete="email"
                                                className="w-full h-12 pl-12 pr-4 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-text-primary placeholder:text-text-tertiary"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    {view !== 'forgot-password' && (
                                        <div>
                                            <label htmlFor="auth-password" className="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                                                <input
                                                    id="auth-password"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    autoComplete={view === 'signup' ? 'new-password' : 'current-password'}
                                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-text-primary placeholder:text-text-tertiary"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {view === 'login' && (
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => handleViewChange('forgot-password')}
                                                className="text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
                                    )}

                                    {view === 'signup' && (
                                        <div className="pt-1">
                                            <ConsentCheckboxes consent={consent} onChange={setConsent} compact />
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full h-12 text-lg font-bold shadow-lg shadow-teal-500/20"
                                        isLoading={isLoading}
                                        rightIcon={view !== 'forgot-password' ? <ArrowRight size={18} /> : undefined}
                                    >
                                        {view === 'login' ? 'Sign In' : view === 'signup' ? 'Create Account' : 'Send Reset Link'}
                                    </Button>
                                </form>

                                {view !== 'forgot-password' && (
                                    <>
                                        <div className="relative my-8">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-border"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-surface text-text-tertiary">Or continue with</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={handleGoogleSignIn}
                                                disabled={isLoading}
                                                className="flex items-center justify-center gap-2 h-12 rounded-xl border border-border hover:bg-surface-hover transition-colors font-medium text-text-secondary bg-surface disabled:opacity-50"
                                            >
                                                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                </svg>
                                                Google
                                            </button>
                                            <button
                                                onClick={handleAppleSignIn}
                                                disabled={isLoading}
                                                className="flex items-center justify-center gap-2 h-12 rounded-xl border border-border hover:bg-surface-hover transition-colors font-medium text-text-secondary bg-surface disabled:opacity-50"
                                            >
                                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                                                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                                </svg>
                                                Apple
                                            </button>
                                        </div>
                                    </>
                                )}

                                <div className="mt-8 text-center text-sm text-text-tertiary">
                                    {view === 'login' ? (
                                        <>
                                            Don't have an account?{' '}
                                            <button onClick={() => handleViewChange('signup')} className="font-bold text-teal-600 hover:underline dark:text-teal-400">
                                                Sign up
                                            </button>
                                        </>
                                    ) : view === 'signup' ? (
                                        <>
                                            Already have an account?{' '}
                                            <button onClick={() => handleViewChange('login')} className="font-bold text-teal-600 hover:underline dark:text-teal-400">
                                                Log in
                                            </button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleViewChange('login')} className="font-bold text-teal-600 hover:underline dark:text-teal-400">
                                            Back to login
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
