import React, { useState, useEffect, useRef } from 'react';
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
import SEO from '@/components/SEO';
import { useAuthErrorFocus } from '@/lib/auth/useAuthErrorFocus';
import { mapSupabaseAuthError } from '@/lib/auth/supabaseErrorMessages';
import { useTranslation } from 'react-i18next';

/**
 * AUTH-009: this page must only allow password updates for users
 * arriving via a password-reset email — NOT logged-in users with an
 * existing session. Otherwise, anyone with access to a live session
 * (unlocked shared device) can navigate to /update-password and change
 * the password without the current-password proof that AccountSettings
 * requires.
 *
 * Authorization rule:
 *   allowed = recoveryEventReceived
 *             OR (no session existed on mount AND a session is now present)
 *
 * The second branch covers the legitimate "reset link arrived, no
 * prior session" path — the PASSWORD_RECOVERY event may be consumed by
 * the global AuthContext listener before this page mounts, leaving us
 * with only a SIGNED_IN event. Detecting "no prior session" disambiguates.
 */
const UpdatePasswordPage = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const [refusedExistingSession, setRefusedExistingSession] = useState(false);
    const errorAlertRef = useAuthErrorFocus<HTMLDivElement>(error);
    const { t } = useTranslation();
    // AUTH-018: track the success-redirect timer so unmounting cancels it.
    const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (redirectTimerRef.current) {
                clearTimeout(redirectTimerRef.current);
                redirectTimerRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        let mounted = true;
        let pollTimer: ReturnType<typeof setInterval> | null = null;
        let hadExistingSessionOnMount: boolean | null = null; // null = unknown
        let recoveryEventReceived = false;

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

        const refuseExistingSession = () => {
            if (!mounted) return;
            setRefusedExistingSession(true);
            setIsCheckingSession(false);
            if (pollTimer) clearInterval(pollTimer);
        };

        const decideAllowed = (sessionPresent: boolean) => {
            if (recoveryEventReceived) {
                markReady();
                return;
            }
            if (sessionPresent && hadExistingSessionOnMount === false) {
                // No session on mount + session now present = recovery flow
                // succeeded (event was likely consumed by another listener).
                markReady();
                return;
            }
            if (sessionPresent && hadExistingSessionOnMount === true) {
                // Logged-in user navigated directly to /update-password —
                // refuse, point them at AccountSettings.
                refuseExistingSession();
            }
        };

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (!mounted) return;
            if (event === 'PASSWORD_RECOVERY') {
                recoveryEventReceived = true;
                if (session) markReady();
                return;
            }
            if (event === 'SIGNED_IN' && session) {
                decideAllowed(true);
            }
        });

        // Establish the on-mount session baseline first, then act.
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!mounted) return;
            hadExistingSessionOnMount = !!session;

            if (session) {
                decideAllowed(true);
                return;
            }

            // No session yet. Need recovery params to proceed.
            if (!hasRecoveryParams) {
                setError('Invalid or expired reset link. Please request a new password reset.');
                setIsCheckingSession(false);
                return;
            }

            // Poll while Supabase exchanges the hash/code params.
            let attempts = 0;
            const MAX_ATTEMPTS = 10; // 10 × 500ms = 5s
            pollTimer = setInterval(async () => {
                attempts++;
                const { data } = await supabase.auth.getSession();
                if (!mounted) return;
                if (data.session) {
                    decideAllowed(true);
                    return;
                }
                if (attempts >= MAX_ATTEMPTS) {
                    if (pollTimer) clearInterval(pollTimer);
                    setError('Invalid or expired reset link. Please request a new password reset.');
                    setIsCheckingSession(false);
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
                // AUTH-019: route through the central mapper so the
                // user gets a consistent message rather than raw
                // Supabase wording (e.g. "AuthApiError: ...").
                const key = mapSupabaseAuthError(updateError);
                setError(t(key));
            } else {
                setIsSuccess(true);
                // AUTH-028: notify the registered email that the password
                // changed. Fire-and-forget — the recovery flow has already
                // succeeded; email failure must not block the UX. Run
                // BEFORE the global signOut so the user's own session can
                // still call functions.invoke on their own behalf.
                // Hotfix B-5: no body payload — the edge function derives
                // user_id and email from the caller's verified JWT.
                void supabase.functions
                    .invoke('password-change-notification', { body: {} })
                    .catch((err) => console.warn('password-change-notification dispatch failed:', err));
                // Sign out of all sessions globally — if the password reset
                // was triggered to recover from a lost device or session
                // hijack, kill any attacker tokens too. (AUTH-009.)
                await supabase.auth.signOut({ scope: 'global' });
                redirectTimerRef.current = setTimeout(
                    () => navigate('/login', { state: { message: t('auth.updatePassword.successFlashMessage') } }),
                    3000,
                );
            }
        } catch (err) {
            const key = mapSupabaseAuthError(err instanceof Error ? err : new Error('unknown'));
            setError(t(key));
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

    // AUTH-009: caller is logged in but did not arrive via a recovery email.
    // Refuse to render the form. Point them at the in-session change flow
    // which requires the current password.
    if (refusedExistingSession) {
        return (
            <div
                role="alert"
                data-testid="update-password-refused-existing-session"
                className="min-h-screen flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none" />
                <div className="w-full max-w-md relative z-10">
                    <InteractiveCard
                        spotlightColor="rgba(20, 184, 166, 0.1)"
                        className="p-8 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl text-center"
                    >
                        <h3 className="text-xl font-semibold text-text-primary mb-3">
                            This page is for password resets via email
                        </h3>
                        <p className="text-text-secondary mb-6">
                            To change your password while signed in, go to Account Settings — you will be asked for your current password.
                        </p>
                        <Link
                            to="/dashboard/account-settings"
                            className="inline-block px-5 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover transition-colors"
                        >
                            Go to Account Settings
                        </Link>
                    </InteractiveCard>
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
            <SEO title="Update Password | Psychage" description="Set your new Psychage account password." />
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
                            <div ref={errorAlertRef} role="alert" tabIndex={-1} className="focus:outline-none">
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
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-text-primary ml-1">New Password</Label>
                            <div className="relative group">
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    autoComplete="new-password"
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
                                    autoComplete="new-password"
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
