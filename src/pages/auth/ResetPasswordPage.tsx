import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Display, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { useAuth } from '../../context/AuthContext';

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
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-accent-teal/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="mb-8">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-sm text-text-secondary hover:text-primary transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Login
                    </Link>
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <img
                                src="/images/logo.png"
                                alt="Psychage"
                                className="h-16 w-auto object-contain"
                            />
                        </div>
                        <Display className="text-3xl mb-2">Reset Password</Display>
                        <Text>Enter your email to receive reset instructions</Text>
                    </div>
                </div>

                <Card className="p-8 border-border/50 shadow-xl bg-surface/80 backdrop-blur-sm">
                    {isSubmitted ? (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-text-primary mb-2">Check your email</h3>
                            <p className="text-text-secondary mb-6">
                                We've sent password reset instructions to <span className="font-medium text-text-primary">{email}</span>
                            </p>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setIsSubmitted(false)}
                            >
                                Use a different email
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        required
                                        className="pl-10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                                </div>
                            </div>

                            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                                Send Reset Instructions
                            </Button>
                        </form>
                    )}
                </Card>
            </motion.div>
        </div>
    );
};

export default ResetPasswordPage;
