import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { tokenStorage } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import MeshGradient from '@/components/ui/MeshGradient';

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
                    // Store the tokens
                    tokenStorage.setTokens({
                        access_token: data.session.access_token,
                        refresh_token: data.session.refresh_token,
                    });

                    // Determine where to redirect based on user metadata
                    const userRole = data.session.user?.user_metadata?.role || 'patient';

                    if (userRole === 'provider') {
                        navigate('/provider/dashboard', { replace: true });
                    } else if (userRole === 'admin') {
                        navigate('/admin', { replace: true });
                    } else {
                        navigate('/dashboard', { replace: true });
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
            <MeshGradient className="opacity-60" />

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
