import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Display, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { cn } from '@/lib/utils';
import { useAuth } from '../../context/AuthContext';

const SignUpPage = () => {
    const [userType, setUserType] = useState<'patient' | 'provider'>('patient');
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const { signup, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        if (!termsAccepted) {
            setError("You must accept the terms and conditions");
            return;
        }

        try {
            const result = await signup(
                formData.email,
                formData.password,
                formData.displayName,
                userType
            );

            if (result.success) {
                // Determine redirect based on role
                // For now, simplify to sending everyone to login with a success message
                navigate('/login', {
                    state: {
                        message: `Account created successfully! Please log in as a ${userType}.`,
                        email: formData.email
                    }
                });
            } else {
                setError(result.error || 'Signup failed. Please try again.');
            }
        } catch (err) {
            // Registration error handled by AuthContext
            console.error('Signup error:', err);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    const isPasswordValid = formData.password.length >= 8;
    const hasNumber = /\d/.test(formData.password);

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
                    <div className="flex justify-center mb-6">
                        <img
                            src="/images/logo.png"
                            alt="Psychage"
                            className="h-16 w-auto object-contain"
                        />
                    </div>
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
                            type="button"
                        >
                            I'm a Patient
                        </button>
                        <button
                            onClick={() => setUserType('provider')}
                            className={cn(
                                "relative z-10 px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 min-w-[120px]",
                                userType === 'provider' ? "text-primary" : "text-text-secondary hover:text-text-primary"
                            )}
                            type="button"
                        >
                            I'm a Provider
                        </button>
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
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="displayName">Full Name</Label>
                                <div className="relative">
                                    <Input
                                        id="displayName"
                                        placeholder="John Doe"
                                        required
                                        className="pl-10"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                    />
                                    <User className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        required
                                        className="pl-10"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="pl-10"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                            </div>

                            {/* Password Strength Indicator */}
                            <div className="mt-2 space-y-2">
                                <div className="flex gap-1 h-1">
                                    <div className={cn("flex-1 rounded-full transition-colors", formData.password.length > 0 ? "bg-red-400" : "bg-gray-200", isPasswordValid && "bg-success")}></div>
                                    <div className={cn("flex-1 rounded-full transition-colors", isPasswordValid ? "bg-success" : "bg-gray-200")}></div>
                                    <div className={cn("flex-1 rounded-full transition-colors", hasNumber && isPasswordValid ? "bg-success" : "bg-gray-200")}></div>
                                    <div className={cn("flex-1 rounded-full transition-colors", formData.password.length > 12 ? "bg-success" : "bg-gray-200")}></div>
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
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    className="pl-10"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-text-tertiary" />
                            </div>
                        </div>

                        <div className="flex items-start space-x-2 pt-2">
                            <input
                                id="terms"
                                type="checkbox"
                                required
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                            />
                            <Label htmlFor="terms" className="font-normal text-text-secondary leading-tight">
                                I agree to the <Link to="/legal/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                            </Label>
                        </div>

                        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                            {userType === 'provider' ? 'Create Provider Account' : 'Create Account'}
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
