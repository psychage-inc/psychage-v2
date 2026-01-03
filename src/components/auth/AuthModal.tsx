import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Github, Chrome, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

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

    const { login, signup, requestPasswordReset } = useAuth();

    if (!isOpen) return null;

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setDisplayName('');
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
                const result = await signup(email, password, displayName || undefined);
                if (result.success) {
                    setSuccessMessage('Account created! Please check your email to verify your account.');
                    // Don't close modal - show success message
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

    const handleOAuthLogin = async (provider: 'google' | 'github') => {
        // OAuth will be handled by redirecting to the backend
        const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const redirectUrl = `${backendUrl}/api/auth/oauth/${provider}`;
        window.location.href = redirectUrl;
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
                            className="bg-white dark:bg-[#0a0a0a] w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto border border-gray-100 dark:border-gray-800 relative"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-teal-500/10 to-transparent pointer-events-none" />
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                            <div className="p-8 relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-white">
                                            <Sparkles size={16} fill="currentColor" />
                                        </div>
                                        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                                            {view === 'login' ? 'Welcome back' : view === 'signup' ? 'Join the Journey' : 'Reset password'}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500"
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
                                            <label htmlFor="auth-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    id="auth-name"
                                                    type="text"
                                                    value={displayName}
                                                    onChange={(e) => setDisplayName(e.target.value)}
                                                    autoComplete="name"
                                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-gray-900 dark:text-white placeholder:text-gray-400"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    <div>
                                        <label htmlFor="auth-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                id="auth-email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                autoComplete="email"
                                                className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-gray-900 dark:text-white placeholder:text-gray-400"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    {view !== 'forgot-password' && (
                                        <div>
                                            <label htmlFor="auth-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    id="auth-password"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    autoComplete={view === 'signup' ? 'new-password' : 'current-password'}
                                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-gray-900 dark:text-white placeholder:text-gray-400"
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
                                                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white dark:bg-[#0a0a0a] text-gray-500">Or continue with</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={() => handleOAuthLogin('google')}
                                                className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#111]"
                                            >
                                                <Chrome size={20} /> Google
                                            </button>
                                            <button
                                                onClick={() => handleOAuthLogin('github')}
                                                className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#111]"
                                            >
                                                <Github size={20} /> GitHub
                                            </button>
                                        </div>
                                    </>
                                )}

                                <div className="mt-8 text-center text-sm text-gray-500">
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
