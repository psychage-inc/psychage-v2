import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Display, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';

const LoginPage = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
                <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-indigo/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <Display className="text-3xl mb-2">Welcome Back</Display>
                    <Text>Sign in to continue your journey</Text>
                </div>

                <Card className="p-8 border-border/50 shadow-xl bg-surface/80 backdrop-blur-sm">
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

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    to="/reset-password"
                                    className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="pl-10"
                                />
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                                />
                                <Label htmlFor="remember" className="ml-2 font-normal">Remember me</Label>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-surface px-2 text-text-tertiary">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Button variant="outline" className="w-full">
                                Google
                            </Button>
                            <Button variant="outline" className="w-full">
                                Apple
                            </Button>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-sm text-text-secondary">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-primary hover:text-primary-hover transition-colors">
                            Create account
                        </Link>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
};

export default LoginPage;
