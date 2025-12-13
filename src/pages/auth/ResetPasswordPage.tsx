import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Display, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';

const ResetPasswordPage = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        // Simulate API call
        setTimeout(() => setStatus('success'), 2000);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="mb-6">
                    <Link to="/login" className="inline-flex items-center text-sm text-text-secondary hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
                    </Link>
                </div>

                <Card className="p-8 border-border/50 shadow-xl bg-surface/80 backdrop-blur-sm">
                    {status === 'success' ? (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-success" />
                            </div>
                            <Display className="text-2xl mb-2">Check your email</Display>
                            <Text className="mb-6">
                                We've sent password reset instructions to your email address.
                            </Text>
                            <Button variant="outline" className="w-full" onClick={() => setStatus('idle')}>
                                Resend Email
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <Display className="text-2xl mb-2">Reset Password</Display>
                                <Text>Enter your email to receive a reset link</Text>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            required
                                            className="pl-10"
                                        />
                                        <Mail className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" size="lg" isLoading={status === 'loading'}>
                                    Send Reset Link
                                </Button>
                            </form>
                        </>
                    )}
                </Card>
            </motion.div>
        </div>
    );
};

export default ResetPasswordPage;
