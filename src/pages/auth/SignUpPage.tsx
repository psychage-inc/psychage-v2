import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Display, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const SignUpPage = () => {
    const [userType, setUserType] = useState<'patient' | 'provider'>('patient');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate signup
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
                <div className="absolute top-20 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent-sky/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl relative z-10"
            >
                <div className="text-center mb-8">
                    <Display className="text-3xl mb-2">Create your account</Display>
                    <Text>Join Psychage to start your mental health journey</Text>
                </div>

                {/* User Type Toggle */}
                <div className="flex justify-center mb-8">
                    <div className="bg-surface-subtle p-1 rounded-xl inline-flex relative shadow-inner">
                        <div
                            className={cn(
                                "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out",
                                userType === 'patient' ? 'left-1' : 'left-[calc(50%+0px)]'
                            )}
                        />
                        <button
                            onClick={() => setUserType('patient')}
                            className={cn(
                                "relative z-10 px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 min-w-[120px]",
                                userType === 'patient' ? "text-primary" : "text-text-secondary hover:text-text-primary"
                            )}
                        >
                            I'm a Patient
                        </button>
                        <button
                            onClick={() => setUserType('provider')}
                            className={cn(
                                "relative z-10 px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 min-w-[120px]",
                                userType === 'provider' ? "text-primary" : "text-text-secondary hover:text-text-primary"
                            )}
                        >
                            I'm a Provider
                        </button>
                    </div>
                </div>

                <Card className="p-8 border-border/50 shadow-xl bg-surface/80 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullname">Full Name</Label>
                                <div className="relative">
                                    <Input id="fullname" placeholder="John Doe" required className="pl-10" />
                                    <User className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Input id="email" type="email" placeholder="name@example.com" required className="pl-10" />
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input id="password" type="password" required className="pl-10" />
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                            </div>

                            {/* Password Strength Indicator */}
                            <div className="mt-2 space-y-2">
                                <div className="flex gap-1 h-1">
                                    <div className="flex-1 bg-success rounded-full"></div>
                                    <div className="flex-1 bg-success rounded-full"></div>
                                    <div className="flex-1 bg-text-tertiary/20 rounded-full"></div>
                                    <div className="flex-1 bg-text-tertiary/20 rounded-full"></div>
                                </div>
                                <ul className="text-xs text-text-secondary space-y-1">
                                    <li className="flex items-center text-success"><CheckCircle2 className="w-3 h-3 mr-1" /> At least 8 characters</li>
                                    <li className="flex items-center text-text-tertiary"><CheckCircle2 className="w-3 h-3 mr-1" /> Contains a number</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <div className="relative">
                                <Input id="confirm-password" type="password" required className="pl-10" />
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                            </div>
                        </div>

                        <div className="flex items-start space-x-2 pt-2">
                            <input
                                id="terms"
                                type="checkbox"
                                required
                                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                            />
                            <Label htmlFor="terms" className="font-normal text-text-secondary leading-tight">
                                I agree to the <Link to="/legal/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                            </Label>
                        </div>

                        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                            {userType === 'provider' ? 'Continue Application' : 'Create Account'}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-text-secondary">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-primary hover:text-primary-hover transition-colors">
                            Log in
                        </Link>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
};

export default SignUpPage;
