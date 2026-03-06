import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Display, Text } from '@/components/ui/Typography';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { supabase } from '@/lib/supabaseClient';
import { cn } from '@/lib/utils';
import InteractiveCard from '@/components/ui/InteractiveCard';

const UpdatePasswordPage = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    useEffect(() => {
        let mounted = true;
        let pollTimer: ReturnType<typeof setInterval> | null = null;

        // Check if the URL contains recovery indicators (hash fragment from
        // Supabase implicit flow, or code param from PKCE flow).
        const hash = window.location.hash;
        const search = window.location.search;
        const hasRecoveryParams =
            hash.includes('type=recovery') ||
            hash.includes('access_token') ||
            search.includes('code=');

        const markReady = () => {
            if (!mounted) return;
            setIsReady(true);
            setIsCheckingSession(false);
            setError(null);
            if (pollTimer) clearInterval(pollTimer);
        };

        // Listen for auth state changes. The PASSWORD_RECOVERY event fires when
        // Supabase processes the recovery token, but depending on timing it may
        // arrive as SIGNED_IN instead (the global AuthContext listener may
        // consume the event first). Accept both.
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (!mounted) return;
            if ((event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') && session) {
                markReady();
            }
        });

        // The PASSWORD_RECOVERY event may have fired before this listener
        // registered (Supabase processes hash/code during client init). Poll
        // getSession() to catch that case. Use 500ms intervals up to 5s.
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                markReady();
                return true;
            }
            return false;
        };

        // Immediate check
        checkSession().then((found) => {
            if (found || !mounted) return;

            if (!hasRecoveryParams) {
                // No recovery indicators in URL — user navigated here directly
                if (mounted) {
                    setError('Invalid or expired reset link. Please request a new password reset.');
                    setIsCheckingSession(false);
                }
                return;
            }

            // Recovery params present — poll while Supabase exchanges them
            let attempts = 0;
            const MAX_ATTEMPTS = 10; // 10 × 500ms = 5 seconds
            pollTimer = setInterval(async () => {
                attempts++;
                const found = await checkSession();
                if (found || !mounted) {
                    if (pollTimer) clearInterval(pollTimer);
                    return;
                }
                if (attempts >= MAX_ATTEMPTS) {
                    if (pollTimer) clearInterval(pollTimer);
                    if (mounted) {
                        setError('Invalid or expired reset link. Please request a new password reset.');
                        setIsCheckingSession(false);
                    }
                }
            }, 500);
        });

        return () => {
            mounted = false;
            if (pollTimer) clearInterval(pollTimer);
            subscription.unsubscribe();
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setIsLoading(true);

        try {
            const { error: updateError } = await supabase.auth.updateUser({ password });

            if (updateError) {
                setError(updateError.message);
            } else {
                setIsSuccess(true);
                // Sign out so the user logs in fresh with the new password
                await supabase.auth.signOut();
                setTimeout(
                    () => navigate('/login', { state: { message: 'Password updated successfully. Please log in.' } }),
                    3000,
                );
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const isPasswordValid = password.length >= 8;
    const hasNumber = /\d/.test(password);

    // Loading state while Supabase processes the recovery token
    if (isCheckingSession) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
                                <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none" />
                <div className="text-center relative z-10 space-y-4">
                    <Loader2 className="w-10 h-10 mx-auto text-primary animate-spin" />
                    <Text className="text-text-secondary">Verifying your reset link...</Text>
                </div>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
                                <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full max-w-md relative z-10"
                >
                    <InteractiveCard
                        spotlightColor="rgba(20, 184, 166, 0.1)"
                        className="p-8 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20"
                        >
                            <CheckCircle2 className="w-8 h-8" />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-text-primary mb-2">Password Updated</h3>
                        <p className="text-text-secondary mb-8">
                            Your password has been successfully reset. Redirecting to login...
                        </p>
                        <Button
                            className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                            onClick={() => navigate('/login')}
                        >
                            Go to Login
                        </Button>
                    </InteractiveCard>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
            {/* Dynamic Background */}
                        <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full max-w-md relative z-10"
            >
                <div className="mb-8">
                    <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Link
                            to="/login"
                            className="inline-flex items-center text-sm text-text-secondary hover:text-primary transition-colors mb-6 group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </Link>
                    </motion.div>

                    <div className="text-center">
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <Display className="text-3xl mb-3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary">
                                Set New Password
                            </Display>
                            <Text className="text-text-secondary">Create a strong password for your account</Text>
                        </motion.div>
                    </div>
                </div>

                <InteractiveCard
                    spotlightColor="rgba(20, 184, 166, 0.1)"
                    className="p-8 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <Alert variant="destructive" className="animate-in slide-in-from-top-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    {error}
                                    {!isReady && (
                                        <Link to="/reset-password" className="block mt-2 underline text-sm">
                                            Request a new reset link
                                        </Link>
                                    )}
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-text-primary ml-1">New Password</Label>
                            <div className="relative group">
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="pl-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 h-12"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading || !isReady}
                                />
                                <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                            </div>

                            {/* Password Strength Indicator */}
                            <div className="mt-3 space-y-2 px-1">
                                <div className="flex gap-1.5 h-1.5">
                                    <div className={cn("flex-1 rounded-full transition-all duration-500", password.length > 0 ? "bg-red-400" : "bg-white/10", isPasswordValid && "bg-emerald-500")}></div>
                                    <div className={cn("flex-1 rounded-full transition-all duration-500", isPasswordValid ? "bg-emerald-500" : "bg-white/10")}></div>
                                    <div className={cn("flex-1 rounded-full transition-all duration-500", hasNumber && isPasswordValid ? "bg-emerald-500" : "bg-white/10")}></div>
                                    <div className={cn("flex-1 rounded-full transition-all duration-500", password.length > 12 ? "bg-emerald-500" : "bg-white/10")}></div>
                                </div>
                                <ul className="text-xs text-text-secondary space-y-1 mt-2">
                                    <li className={cn("flex items-center transition-colors duration-300", isPasswordValid ? "text-emerald-400" : "text-text-tertiary")}>
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> At least 8 characters
                                    </li>
                                    <li className={cn("flex items-center transition-colors duration-300", hasNumber ? "text-emerald-400" : "text-text-tertiary")}>
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Contains a number
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-text-primary ml-1">Confirm New Password</Label>
                            <div className="relative group">
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    className="pl-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 h-12"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={isLoading || !isReady}
                                />
                                <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                            size="lg"
                            isLoading={isLoading}
                            disabled={!isReady}
                        >
                            Update Password
                        </Button>
                    </form>
                </InteractiveCard>
            </motion.div>
        </div>
    );
};

export default UpdatePasswordPage;
