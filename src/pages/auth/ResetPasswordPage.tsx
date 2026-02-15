import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Display, Text } from '@/components/ui/Typography';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { useAuth } from '../../context/AuthContext';
import MeshGradient from '@/components/ui/MeshGradient';
import InteractiveCard from '@/components/ui/InteractiveCard';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { requestPasswordReset, isLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const result = await requestPasswordReset(email);

            if (result.success) {
                setIsSubmitted(true);
            }
        } catch {
            // Error handled by AuthContext
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
            {/* Dynamic Background */}
            <MeshGradient className="opacity-60" />

            <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
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
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="flex justify-center mb-6"
                        >
                            <img
                                src="/images/logo.png"
                                alt="Psychage"
                                className="h-16 w-auto object-contain drop-shadow-lg"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <Display className="text-3xl mb-3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary">
                                Reset Password
                            </Display>
                            <Text className="text-text-secondary">Enter your email to receive reset instructions</Text>
                        </motion.div>
                    </div>
                </div>

                <InteractiveCard
                    spotlightColor="rgba(20, 184, 166, 0.1)"
                    className="p-8 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
                >
                    {isSubmitted ? (
                        <div className="text-center py-6">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20"
                            >
                                <CheckCircle2 className="w-8 h-8" />
                            </motion.div>
                            <h3 className="text-xl font-semibold text-text-primary mb-2">Check your email</h3>
                            <p className="text-text-secondary mb-8">
                                We've sent password reset instructions to <span className="font-medium text-text-primary block mt-1">{email}</span>
                            </p>
                            <Button
                                variant="outline"
                                className="w-full border-white/10 hover:bg-white/5 text-text-primary"
                                onClick={() => setIsSubmitted(false)}
                            >
                                Use a different email
                            </Button>
                        </div>
                    ) : (
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

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                                size="lg"
                                isLoading={isLoading}
                            >
                                Send Reset Instructions
                            </Button>
                        </form>
                    )}
                </InteractiveCard>
            </motion.div>
        </div>
    );
};

export default ResetPasswordPage;
