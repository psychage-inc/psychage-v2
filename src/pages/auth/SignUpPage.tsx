import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, CheckCircle2, AlertCircle, ArrowRight, Globe, Calendar, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Display, Text } from '@/components/ui/Typography';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { cn } from '@/lib/utils';
import { useAuth } from '../../context/AuthContext';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { LogoIcon } from '@/components/ui/LogoIcon';
import ConsentCheckboxes, { ConsentState, defaultConsentState, isConsentValid } from '@/components/privacy/ConsentCheckboxes';
import { consentService } from '@/services/consentService';
import SEO from '@/components/SEO';
import { useTurnstile } from '@/lib/auth/useTurnstile';
import { useAuthErrorFocus } from '@/lib/auth/useAuthErrorFocus';
import { mapSupabaseAuthError } from '@/lib/auth/supabaseErrorMessages';
import { useTranslation } from 'react-i18next';

const SignUpPage = () => {
    const [userType, setUserType] = useState<'patient' | 'provider'>('patient');
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
        age: '',
        referralSource: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [consent, setConsent] = useState<ConsentState>(defaultConsentState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { signup, isLoading } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    // AUTH-029: gate signup on Turnstile token (no-op when site key unset).
    const { widget: turnstileWidget, token: captchaToken, reset: resetCaptcha } = useTurnstile();
    const errorAlertRef = useAuthErrorFocus<HTMLDivElement>(error);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

        if (!isConsentValid(consent)) {
            setError("Please accept all required consents to create your account.");
            return;
        }

        if (!captchaToken) {
            setError('Please complete the verification challenge.');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await signup(
                formData.email,
                formData.password,
                formData.displayName,
                userType,
                {
                    age_verified: consent.ageVerified,
                    consent_version: 'v1.0',
                    country: formData.country || undefined,
                    age: formData.age ? parseInt(formData.age, 10) : undefined,
                    referral_source: formData.referralSource || undefined,
                },
                captchaToken,
            );

            if (result.success) {
                // Log consents to the audit trail
                await consentService.logBulkConsent([
                    { type: 'terms_of_service', granted: true },
                    { type: 'privacy_policy', granted: true },
                    { type: 'data_processing', granted: consent.dataProcessingAccepted },
                    { type: 'age_verification', granted: consent.ageVerified },
                    { type: 'newsletter', granted: consent.newsletterOptIn },
                ]);

                navigate('/login', {
                    state: {
                        message: `Account created successfully! Please log in to continue.`,
                        email: formData.email,
                        userType,
                    }
                });
            } else {
                // AUTH-019: route signup error through the central mapper.
                // user_already_exists IS surfaced to the user (signup
                // expects this disclosure — they need to know).
                const errMsg = result.error || 'Signup failed';
                const key = mapSupabaseAuthError(new Error(errMsg));
                setError(t(key));
                resetCaptcha();
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError(t('auth.errors.unexpected'));
            resetCaptcha();
        } finally {
            setIsSubmitting(false);
        }
    };

    const isPasswordValid = formData.password.length >= 8;
    const hasNumber = /\d/.test(formData.password);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-background">
            <SEO title="Create Account | Psychage" description="Create your free Psychage account to access mental health tools, articles, and provider directory." />
            {/* Dynamic Background */}
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
                            <LogoIcon className="h-20 w-auto drop-shadow-lg" />
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
                        <div className="bg-teal-600 p-1.5 rounded-2xl inline-flex relative shadow-inner border border-white/5 backdrop-blur-md">
                            <div
                                className={cn(
                                    "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white/25 border border-white/30 rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.2)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                                    userType === 'patient' ? 'left-1.5' : 'left-[calc(50%+3px)]'
                                )}
                            />
                            <button
                                onClick={() => setUserType('patient')}
                                className={cn(
                                    "relative z-10 px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 min-w-[140px]",
                                    userType === 'patient' ? "text-white" : "text-white/60 hover:text-white"
                                )}
                                type="button"
                            >
                                I am an individual
                            </button>
                            <button
                                onClick={() => setUserType('provider')}
                                className={cn(
                                    "relative z-10 px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 min-w-[140px]",
                                    userType === 'provider' ? "text-white" : "text-white/60 hover:text-white"
                                )}
                                type="button"
                            >
                                I'm a Provider
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div ref={errorAlertRef} role="alert" tabIndex={-1} className="focus:outline-none">
                                <Alert variant="destructive" className="animate-in slide-in-from-top-2">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            </div>
                        )}
                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="displayName" className="text-text-primary ml-1">Full Name</Label>
                                <div className="relative group">
                                    <Input
                                        id="displayName"
                                        placeholder="John Doe"
                                        required
                                        autoComplete="name"
                                        autoCapitalize="words"
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
                                        autoComplete="email"
                                        inputMode="email"
                                        autoCapitalize="off"
                                        spellCheck={false}
                                        className="pl-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 h-12"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="country" className="text-text-primary ml-1">Country</Label>
                                <div className="relative group">
                                    <select
                                        id="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="flex h-12 w-full rounded-lg border border-border bg-surface pl-11 pr-3 py-2 text-sm ring-offset-background placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 appearance-none cursor-pointer"
                                    >
                                        <option value="">Select country</option>
                                        <option value="US">United States</option>
                                        <option value="GB">United Kingdom</option>
                                        <option value="CA">Canada</option>
                                        <option value="AU">Australia</option>
                                        <option value="IN">India</option>
                                        <option value="DE">Germany</option>
                                        <option value="FR">France</option>
                                        <option value="BR">Brazil</option>
                                        <option value="JP">Japan</option>
                                        <option value="MX">Mexico</option>
                                        <option value="KR">South Korea</option>
                                        <option value="NL">Netherlands</option>
                                        <option value="SE">Sweden</option>
                                        <option value="ES">Spain</option>
                                        <option value="IT">Italy</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                    <Globe className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="age" className="text-text-primary ml-1">Age</Label>
                                <div className="relative group">
                                    <Input
                                        id="age"
                                        type="number"
                                        min={13}
                                        max={120}
                                        placeholder="Age"
                                        className="pl-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 h-12"
                                        value={formData.age}
                                        onChange={handleChange}
                                    />
                                    <Calendar className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="referralSource" className="text-text-primary ml-1">How did you hear about us?</Label>
                                <div className="relative group">
                                    <select
                                        id="referralSource"
                                        value={formData.referralSource}
                                        onChange={handleChange}
                                        className="flex h-12 w-full rounded-lg border border-border bg-surface pl-11 pr-3 py-2 text-sm ring-offset-background placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 appearance-none cursor-pointer"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="search_engine">Search Engine</option>
                                        <option value="social_media">Social Media</option>
                                        <option value="friend_or_family">Friend or Family</option>
                                        <option value="healthcare_provider">Healthcare Provider</option>
                                        <option value="news_or_article">News or Article</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <MessageSquare className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors pointer-events-none" />
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
                                    autoComplete="new-password"
                                    className="pl-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 h-12"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                />
                                <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                            </div>

                            {/* Password Strength Indicator */}
                            <AnimatePresence>
                                {passwordFocused && formData.password.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
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
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-text-primary ml-1">Confirm Password</Label>
                            <div className="relative group">
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                    className="pl-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 h-12"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="pt-2 ml-1">
                            <ConsentCheckboxes consent={consent} onChange={setConsent} />
                        </div>

                        {turnstileWidget && (
                            <div className="flex justify-center">{turnstileWidget}</div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                            size="lg"
                            isLoading={isSubmitting}
                            disabled={isSubmitting || isLoading || !captchaToken}
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
