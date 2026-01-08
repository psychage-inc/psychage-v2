import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Display, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { api } from '../../lib/api';
import { cn } from '@/lib/utils';

const UpdatePasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            setError("Invalid or missing reset token.");
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!token) {
            setError("Missing reset token");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.auth.confirmPasswordReset(token, password);
            if (response.success) {
                setIsSuccess(true);
                // Optional: redirect after few seconds
                setTimeout(() => navigate('/login', { state: { message: 'Password updated successfully. Please log in.' } }), 3000);
            } else {
                setError(response.error || 'Failed to update password');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const isPasswordValid = password.length >= 8;
    const hasNumber = /\d/.test(password);

    if (isSuccess) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md relative z-10"
                >
                    <Card className="p-8 border-border/50 shadow-xl bg-surface/80 backdrop-blur-sm text-center">
                        <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-text-primary mb-2">Password Updated</h3>
                        <p className="text-text-secondary mb-6">
                            Your password has been successfully reset. Redirecting to login...
                        </p>
                        <Button
                            className="w-full"
                            onClick={() => navigate('/login')}
                        >
                            Go to Login
                        </Button>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
                <div className="absolute top-20 right-1/4 w-64 h-64 bg-accent-indigo/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
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
                        <Display className="text-3xl mb-2">Set New Password</Display>
                        <Text>Create a strong password for your account</Text>
                    </div>
                </div>

                <Card className="p-8 border-border/50 shadow-xl bg-surface/80 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="pl-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                            </div>

                            {/* Password Strength Indicator */}
                            <div className="mt-2 space-y-2">
                                <div className="flex gap-1 h-1">
                                    <div className={cn("flex-1 rounded-full transition-colors", password.length > 0 ? "bg-red-400" : "bg-gray-200", isPasswordValid && "bg-success")}></div>
                                    <div className={cn("flex-1 rounded-full transition-colors", isPasswordValid ? "bg-success" : "bg-gray-200")}></div>
                                    <div className={cn("flex-1 rounded-full transition-colors", hasNumber && isPasswordValid ? "bg-success" : "bg-gray-200")}></div>
                                    <div className={cn("flex-1 rounded-full transition-colors", password.length > 12 ? "bg-success" : "bg-gray-200")}></div>
                                </div>
                                <ul className="text-xs text-text-secondary space-y-1">
                                    <li className={cn("flex items-center transition-colors", isPasswordValid ? "text-success" : "text-text-tertiary")}>
                                        <CheckCircle2 className="w-3 h-3 mr-1" /> At least 8 characters
                                    </li>
                                    <li className={cn("flex items-center transition-colors", hasNumber ? "text-success" : "text-text-tertiary")}>
                                        <CheckCircle2 className="w-3 h-3 mr-1" /> Contains a number
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    className="pl-10"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg" isLoading={isLoading} disabled={!!error && error !== "Passwords do not match" && !token}>
                            Update Password
                        </Button>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
};

export default UpdatePasswordPage;
