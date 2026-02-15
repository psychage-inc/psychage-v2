import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Display, Text } from '@/components/ui/Typography';
import { useAuth } from '../../context/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import MeshGradient from '@/components/ui/MeshGradient';
import InteractiveCard from '@/components/ui/InteractiveCard';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login, isLoading, signInWithGoogle, signInWithApple } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [oauthLoading, setOauthLoading] = useState<'google' | 'apple' | null>(null);

    // Get the page they were trying to visit, or default to appropriate dashboard
    const from = location.state?.from?.pathname;

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

        try {
            const result = await login(email, password);

            if (result.success) {
                // If we have a specific destination, go there
                if (from) {
                    navigate(from, { replace: true });
                } else {
                    // Default to dashboard
                    navigate('/dashboard', { replace: true });
                }
            } else {
                // Login error handled by AuthContext
            }
        } catch {
            // Login error handled by AuthContext
            setError('Login failed. Please check your credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-background">
            {/* Dynamic Background */}
            <MeshGradient className="opacity-60" />

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
                            <img
                                src="/images/logo.png"
                                alt="Psychage"
                                className="h-20 w-auto object-contain drop-shadow-lg"
                            />
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
                                    disabled={isLoading}
                                />
                                <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <Label htmlFor="password" className="text-text-primary">Password</Label>
                                <Link
                                    to="/reset-password"
                                    className="text-sm font-medium text-primary hover:text-primary-hover hover:underline transition-all"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="pl-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 h-12"
                                    value={password}
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                                <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-1">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 transition-colors cursor-pointer"
                                />
                                <Label htmlFor="remember" className="ml-2 font-normal text-text-secondary cursor-pointer">Remember me</Label>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                            size="lg"
                            isLoading={isLoading}
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

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Button
                                variant="outline"
                                className="w-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-text-primary transition-all duration-300"
                                onClick={handleGoogleSignIn}
                                disabled={isLoading || oauthLoading !== null}
                                isLoading={oauthLoading === 'google'}
                            >
                                Google
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-text-primary transition-all duration-300"
                                onClick={handleAppleSignIn}
                                disabled={isLoading || oauthLoading !== null}
                                isLoading={oauthLoading === 'apple'}
                            >
                                Apple
                            </Button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-text-secondary">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-bold text-primary hover:text-primary-hover inline-flex items-center gap-1 group transition-colors">
                            Create account
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </p>
                </InteractiveCard>
            </motion.div>
        </div>
    );
};

export default LoginPage;
