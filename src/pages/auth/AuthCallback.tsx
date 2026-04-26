import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { adminUrl, mainUrl, isAdminDomain } from '@/lib/urls';
import { Loader2 } from 'lucide-react';
import { useAuthErrorFocus } from '@/lib/auth/useAuthErrorFocus';
import { mapSupabaseAuthError } from '@/lib/auth/supabaseErrorMessages';
import { useTranslation } from 'react-i18next';

const AuthCallback: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const errorAlertRef = useAuthErrorFocus<HTMLDivElement>(error);
    const { t } = useTranslation();
    // AUTH-018: collect every timer id we schedule so the cleanup can
    // cancel them. The earlier `isCancelled` guard only skipped state
    // updates — the pending navigate() call still ran on a stale
    // unmounted component.
    const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        let isCancelled = false;
        const scheduleNavigate = (path: string, state?: Record<string, unknown>, ms = 3000) => {
            const id = setTimeout(() => navigate(path, state ? { state } : undefined), ms);
            timersRef.current.push(id);
        };

        const handleCallback = async () => {
            try {
                // Get the session from the URL hash
                const { data, error } = await supabase.auth.getSession();

                if (isCancelled) return;

                if (error) {
                    console.error('Auth callback error:', error);
                    const key = mapSupabaseAuthError(error);
                    setError(t(key));
                    scheduleNavigate('/login', { error: error.message });
                    return;
                }

                if (data.session) {
                    // Determine where to redirect based on user metadata
                    const userRole = data.session.user?.user_metadata?.role || 'patient';
                    const onAdminDomain = isAdminDomain();

                    if (userRole === 'provider') {
                        if (onAdminDomain) {
                            window.location.href = mainUrl('/provider');
                        } else {
                            navigate('/provider', { replace: true });
                        }
                    } else if (userRole === 'admin') {
                        // Check if admin has completed onboarding (fail-open if column missing)
                        let needsOnboarding = false;
                        const { data: profile, error: profileError } = await supabase
                            .from('profiles')
                            .select('onboarding_completed_at')
                            .eq('id', data.session.user.id)
                            .single();

                        if (isCancelled) return;

                        if (!profileError && profile && !profile.onboarding_completed_at) {
                            needsOnboarding = true;
                        }

                        if (onAdminDomain) {
                            navigate(needsOnboarding ? '/onboarding' : '/dashboard', { replace: true });
                        } else {
                            window.location.href = needsOnboarding
                                ? adminUrl('/onboarding')
                                : adminUrl('/');
                        }
                    } else {
                        // Patient — check onboarding before routing
                        let needsPatientOnboarding = false;
                        try {
                            const { data: profile, error: profileError } = await supabase
                                .from('profiles')
                                .select('onboarding_completed')
                                .eq('id', data.session.user.id)
                                .single();

                            if (isCancelled) return;

                            if (!profileError && profile && profile.onboarding_completed === false) {
                                needsPatientOnboarding = true;
                            }
                        } catch {
                            // Fail-open: DB error means go to dashboard
                        }

                        if (isCancelled) return;

                        if (onAdminDomain) {
                            window.location.href = mainUrl(needsPatientOnboarding ? '/onboarding' : '/dashboard');
                        } else {
                            navigate(needsPatientOnboarding ? '/onboarding' : '/dashboard', { replace: true });
                        }
                    }
                } else {
                    // No session, redirect to login
                    navigate('/login', { replace: true });
                }
            } catch (err) {
                if (isCancelled) return;
                console.error('Callback processing error:', err);
                setError(t('auth.callback.errorGeneric'));
                scheduleNavigate('/login');
            }
        };

        handleCallback();
        return () => {
            isCancelled = true;
            // Cancel any pending redirect timers — see AUTH-018.
            timersRef.current.forEach(clearTimeout);
            timersRef.current = [];
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
                        <div className="text-center relative z-10">
                {error ? (
                    <div ref={errorAlertRef} role="alert" tabIndex={-1} className="space-y-4 focus:outline-none">
                        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
                            <span className="text-red-500 text-2xl">!</span>
                        </div>
                        <h2 className="text-xl font-bold text-text-primary">Authentication Error</h2>
                        <p className="text-text-secondary">{error}</p>
                        <p className="text-sm text-text-tertiary">Redirecting to login...</p>
                    </div>
                ) : (
                    <div className="space-y-4" aria-live="polite">
                        <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
                        <h2 className="text-xl font-bold text-text-primary">Completing sign in...</h2>
                        <p className="text-text-secondary">Please wait while we verify your credentials.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthCallback;
