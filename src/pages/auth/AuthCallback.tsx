import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { adminUrl, mainUrl, isAdminDomain } from '@/lib/urls';
import { Loader2 } from 'lucide-react';

const AuthCallback: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Get the session from the URL hash
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('Auth callback error:', error);
                    setError(error.message);
                    setTimeout(() => navigate('/login', { state: { error: error.message } }), 3000);
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
                        if (onAdminDomain) {
                            window.location.href = mainUrl('/dashboard');
                        } else {
                            navigate('/dashboard', { replace: true });
                        }
                    }
                } else {
                    // No session, redirect to login
                    navigate('/login', { replace: true });
                }
            } catch (err) {
                console.error('Callback processing error:', err);
                setError('Failed to complete authentication');
                setTimeout(() => navigate('/login'), 3000);
            }
        };

        handleCallback();
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
                        <div className="text-center relative z-10">
                {error ? (
                    <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
                            <span className="text-red-500 text-2xl">!</span>
                        </div>
                        <h2 className="text-xl font-bold text-text-primary">Authentication Error</h2>
                        <p className="text-text-secondary">{error}</p>
                        <p className="text-sm text-text-tertiary">Redirecting to login...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
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
