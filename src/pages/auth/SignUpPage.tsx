import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Display, Text } from '@/components/ui/Typography';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { cn } from '@/lib/utils';
import { useAuth } from '../../context/AuthContext';
import MeshGradient from '@/components/ui/MeshGradient';
import InteractiveCard from '@/components/ui/InteractiveCard';

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
        <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-background">
            {/* Dynamic Background */}
            <MeshGradient className="opacity-60" />

            <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-xl relative z-10"
            >
                <div className="text-center mb-8">
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
                        <Display className="text-3xl mb-3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary">
                            Create your account
                        </Display>
                        <Text className="text-text-secondary text-lg">Join Psychage to start your mental health journey</Text>
                    </motion.div>
                </div>

                <InteractiveCard
                    spotlightColor="rgba(20, 184, 166, 0.1)"
                    className="p-8 md:p-10 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
                >
                    {/* User Type Toggle */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-black/20 p-1.5 rounded-2xl inline-flex relative shadow-inner border border-white/5 backdrop-blur-md">
                            <div
                                className={cn(
                                    "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-primary/20 border border-primary/30 rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.2)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                                    userType === 'patient' ? 'left-1.5' : 'left-[calc(50%+3px)]'
                                )}
                            />
                            <button
                                onClick={() => setUserType('patient')}
                                className={cn(
                                    "relative z-10 px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 min-w-[140px]",
                                    userType === 'patient' ? "text-primary-foreground text-white" : "text-text-secondary hover:text-text-primary"
                                )}
                                type="button"
                            >
                                I'm a Patient
                            </button>
                            <button
                                onClick={() => setUserType('provider')}
                                className={cn(
                                    "relative z-10 px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 min-w-[140px]",
                                    userType === 'provider' ? "text-primary-foreground text-white" : "text-text-secondary hover:text-text-primary"
                                )}
                                type="button"
                            >
                                I'm a Provider
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <Alert variant="destructive" className="animate-in slide-in-from-top-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="displayName" className="text-text-primary ml-1">Full Name</Label>
                                <div className="relative group">
                                    <Input
                                        id="displayName"
                                        placeholder="John Doe"
                                        required
                                        className="pl-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 h-12"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                    />
                                    <User className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-text-primary ml-1">Email Address</Label>
                                <div className="relative group">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        required
                                        className="pl-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 h-12"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-text-primary ml-1">Password</Label>
                            <div className="relative group">
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="pl-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 h-12"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                            </div>

                            {/* Password Strength Indicator */}
                            <div className="mt-3 space-y-2 px-1">
                                <div className="flex gap-1.5 h-1.5">
                                    <div className={cn("flex-1 rounded-full transition-all duration-500", formData.password.length > 0 ? "bg-red-400" : "bg-white/10", isPasswordValid && "bg-emerald-500")}></div>
                                    <div className={cn("flex-1 rounded-full transition-all duration-500", isPasswordValid ? "bg-emerald-500" : "bg-white/10")}></div>
                                    <div className={cn("flex-1 rounded-full transition-all duration-500", hasNumber && isPasswordValid ? "bg-emerald-500" : "bg-white/10")}></div>
                                    <div className={cn("flex-1 rounded-full transition-all duration-500", formData.password.length > 12 ? "bg-emerald-500" : "bg-white/10")}></div>
                                </div>
                                <ul className="text-xs text-text-secondary space-y-1 mt-2">
                                    <li className={cn("flex items-center transition-colors duration-300", isPasswordValid ? "text-emerald-400" : "text-text-tertiary")}>
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> At least 8 characters
                                    </li>
                                    <li className={cn("flex items-center transition-colors duration-300", hasNumber ? "text-emerald-400" : "text-text-tertiary")}>
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Contains a number
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-text-primary ml-1">Confirm Password</Label>
                            <div className="relative group">
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    className="pl-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 h-12"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="flex items-start space-x-3 pt-2 ml-1">
                            <input
                                id="terms"
                                type="checkbox"
                                required
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 transition-colors cursor-pointer"
                            />
                            <Label htmlFor="terms" className="font-normal text-text-secondary leading-tight cursor-pointer">
                                I agree to the <Link to="/legal/terms" className="text-primary hover:text-primary-hover hover:underline font-medium">Terms of Service</Link> and <Link to="/legal/privacy" className="text-primary hover:text-primary-hover hover:underline font-medium">Privacy Policy</Link>.
                            </Label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                            size="lg"
                            isLoading={isLoading}
                        >
                            {userType === 'provider' ? 'Create Provider Account' : 'Create Account'}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-text-secondary">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-primary hover:text-primary-hover inline-flex items-center gap-1 group transition-colors">
                            Log in
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </p>
                </InteractiveCard>
            </motion.div>
        </div>
    );
};

export default SignUpPage;
