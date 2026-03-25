import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Display, Text } from '@/components/ui/Typography';
import { useAuth } from '../../context/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { LogoIcon } from '@/components/ui/LogoIcon';
import { supabase } from '@/lib/supabaseClient';
import { adminUrl, mainUrl } from '@/lib/urls';

interface LoginPageProps {
    variant?: 'main' | 'admin';
}

const LoginPage: React.FC<LoginPageProps> = ({ variant = 'main' }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login, isLoading, signInWithGoogle, signInWithApple } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [oauthLoading, setOauthLoading] = useState<'google' | 'apple' | null>(null);
    const [infoMessage, setInfoMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get the page they were trying to visit, or default to appropriate dashboard
    // Prefer state (set by ProtectedRoute), fall back to query param (survives refresh)
    const from = location.state?.from?.pathname || searchParams.get('redirectTo') || null;

    // Display messages passed via navigation state (e.g., from signup or password reset)
    useEffect(() => {
        const msg = location.state?.message;
        if (msg) {
            setInfoMessage(msg);
            // Clear navigation state so message doesn't persist on reload
            window.history.replaceState({}, '');
        }
    }, [location.state?.message]);

    const handleGoogleSignIn = async () => {
        setOauthLoading('google');
        setError(null);
        try {
            const result = await signInWithGoogle();
            if (!result.success) {
                setError(result.error || 'Failed to sign in with Google');
            }
            // On success, user will be redirected by Supabase OAuth
        } catch {
            setError('Failed to sign in with Google');
        } finally {
            setOauthLoading(null);
        }
    };

    const handleAppleSignIn = async () => {
        setOauthLoading('apple');
        setError(null);
        try {
            const result = await signInWithApple();
            if (!result.success) {
                setError(result.error || 'Failed to sign in with Apple');
            }
            // On success, user will be redirected by Supabase OAuth
        } catch {
            setError('Failed to sign in with Apple');
        } finally {
            setOauthLoading(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Client-side validation
        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }

        if (!password) {
            setError('Please enter your password.');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await login(email, password);

            if (result.success) {
                // Check if admin needs onboarding
                const { data: { user: authUser } } = await supabase.auth.getUser();
                const role = authUser?.user_metadata?.role;

                if (role === 'admin') {
                    // Try to check onboarding status (fail-open if column doesn't exist)
                    let needsOnboarding = false;
                    try {
                        const { data: profile, error: profileError } = await supabase
                            .from('profiles')
                            .select('onboarding_completed_at')
                            .eq('id', authUser!.id)
                            .single();

                        if (!profileError && profile && !profile.onboarding_completed_at) {
                            needsOnboarding = true;
                        }
                    } catch {
                        // Column may not exist yet — skip onboarding check
                    }

                    if (variant === 'admin') {
                        // Already on admin domain — navigate locally
                        navigate(needsOnboarding ? '/onboarding' : (from || '/dashboard'), { replace: true });
                    } else {
                        // On main domain — redirect to admin domain
                        window.location.href = needsOnboarding
                            ? adminUrl('/onboarding')
                            : adminUrl(from || '/');
                    }
                    return;
                }

                // Non-admin user
                if (variant === 'admin') {
                    // Non-admin on admin domain — send to main site
                    window.location.href = mainUrl(from || '/dashboard');
                    return;
                }

                // If we have a specific destination, go there
                if (from) {
                    navigate(from, { replace: true });
                } else {
                    // Default to dashboard
                    navigate('/dashboard', { replace: true });
                }
            } else {
                // Handle specific error types
                const errorMessage = result.error || 'Login failed';
                const lowerError = errorMessage.toLowerCase();

                if (import.meta.env.DEV) {
                    console.warn('[Auth Debug] Supabase login error:', errorMessage);
                }

                if (lowerError.includes('email not confirmed') || lowerError.includes('not confirmed')) {
                    setError('Your email address has not been confirmed. Please check your inbox for a confirmation link.');
                } else if (lowerError.includes('invalid') || lowerError.includes('credentials') || lowerError.includes('password')) {
                    setError('Invalid email or password. Please check your credentials and try again.');
                } else if (lowerError.includes('not found') || lowerError.includes('no user') || lowerError.includes('does not exist')) {
                    setError('No account found with this email. Would you like to sign up?');
                } else if (lowerError.includes('too many') || lowerError.includes('rate limit')) {
                    setError('Too many login attempts. Please wait a few minutes and try again.');
                } else if (lowerError.includes('network') || lowerError.includes('connection') || lowerError.includes('fetch')) {
                    setError('Unable to connect. Please check your internet connection and try again.');
                } else if (lowerError.includes('disabled') || lowerError.includes('blocked')) {
                    setError('This account has been disabled. Please contact support for assistance.');
                } else {
                    setError(errorMessage);
                }
            }
        } catch {
            setError('An unexpected error occurred. Please try again or contact support if the issue persists.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-white">
            {/* Dynamic Background */}
                        <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="flex justify-center mb-6"
                    >
                        <Link to="/">
                            <LogoIcon className="h-20 w-auto drop-shadow-lg" />
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <Display className="text-4xl mb-3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary">
                            Welcome Back
                        </Display>
                        <Text className="text-text-secondary text-lg">Sign in to continue your journey</Text>
                    </motion.div>
                </div>

                <InteractiveCard
                    spotlightColor="rgba(20, 184, 166, 0.1)"
                    className="p-8 md:p-10 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {infoMessage && (
                            <Alert className="animate-in slide-in-from-top-2 border-emerald-500/30 bg-emerald-500/10">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <AlertDescription className="text-emerald-400">{infoMessage}</AlertDescription>
                            </Alert>
                        )}

                        {error && (
                            <Alert variant="destructive" className="animate-in slide-in-from-top-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-text-primary ml-1">Email address</Label>
                            <div className="relative group">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    className="pl-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 h-12"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading || isSubmitting}
                                />
                                <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-text-primary ml-1">Password</Label>
                            <div className="relative group">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="pl-11 pr-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 h-12"
                                    value={password}
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading || isSubmitting}
                                />
                                <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-3.5 h-5 w-5 text-text-tertiary hover:text-text-primary transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between ml-1">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 transition-colors cursor-pointer"
                                />
                                <Label htmlFor="remember" className="ml-2 font-normal text-text-secondary cursor-pointer">Remember me</Label>
                            </div>
                            <Link
                                to="/reset-password"
                                className="text-sm font-medium text-primary hover:text-primary-hover hover:underline transition-all"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                            size="lg"
                            isLoading={isSubmitting}
                            disabled={isSubmitting || isLoading}
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-transparent px-4 text-text-tertiary backdrop-blur-sm">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center gap-4">
                            <Button
                                variant="outline"
                                className="px-8 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-text-primary transition-all duration-300"
                                onClick={handleGoogleSignIn}
                                disabled={isLoading || isSubmitting || oauthLoading !== null}
                                isLoading={oauthLoading === 'google'}
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </Button>
                            <Button
                                variant="outline"
                                className="px-8 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-text-primary transition-all duration-300"
                                onClick={handleAppleSignIn}
                                disabled={isLoading || isSubmitting || oauthLoading !== null}
                                isLoading={oauthLoading === 'apple'}
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                            </Button>
                        </div>
                    </div>

                    {variant !== 'admin' && (
                        <p className="mt-8 text-center text-text-secondary">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-bold text-primary hover:text-primary-hover inline-flex items-center gap-1 group transition-colors">
                                Create account
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </p>
                    )}
                </InteractiveCard>
            </motion.div>
        </div>
    );
};

export default LoginPage;
