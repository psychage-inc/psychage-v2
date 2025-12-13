import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Display, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';

const UpdatePasswordPage = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        // Simulate API call
        setTimeout(() => setStatus('success'), 2000);
    };

    if (status === 'success') {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-background">
                <Card className="p-8 border-border/50 shadow-xl bg-surface/80 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <Display className="text-2xl mb-2">Password Updated</Display>
                    <Text className="mb-6">
                        Your password has been successfully changed. You can now log in with your new password.
                    </Text>
                    <Link to="/login">
                        <Button className="w-full">Go to Login</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-background">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Display className="text-2xl mb-2">Set New Password</Display>
                    <Text>Please enter your new password below</Text>
                </div>

                <Card className="p-8 border-border/50 shadow-xl bg-surface/80 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="new-password"
                                    type="password"
                                    required
                                    className="pl-10"
                                />
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    required
                                    className="pl-10"
                                />
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg" isLoading={status === 'loading'}>
                            Update Password
                        </Button>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
};

export default UpdatePasswordPage;
