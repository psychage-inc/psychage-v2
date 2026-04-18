import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { useAuth } from '@/context/AuthContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { onboardingService } from '@/services/onboardingService';
import { useToast } from '@/context/ToastContext';
import WelcomeStep from '@/components/onboarding/WelcomeStep';
import FocusSelectionStep from '@/components/onboarding/FocusSelectionStep';
import FirstMoodStep from '@/components/onboarding/FirstMoodStep';
import ReadyStep from '@/components/onboarding/ReadyStep';

const TOTAL_STEPS = 4;

const OnboardingPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const reduced = useReducedMotion();
    const toast = useToast();

    const [step, setStep] = useState(0);
    const [wellnessFocus, setWellnessFocus] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    // If already onboarded, redirect to dashboard
    useEffect(() => {
        if (!user?.id) return;
        onboardingService.getOnboardingStatus(user.id).then((status) => {
            if (status.completed) {
                navigate('/dashboard', { replace: true });
            } else {
                setCheckingStatus(false);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

    const handleFinish = async () => {
        if (!user?.id) return;
        setIsSubmitting(true);
        try {
            const success = await onboardingService.completeOnboarding(user.id, wellnessFocus);
            if (success) {
                navigate('/dashboard', { replace: true });
            } else {
                toast.error('Unable to save your selections. Please try again.');
                setIsSubmitting(false);
            }
        } catch {
            toast.error('Something went wrong. Please try again.');
            setIsSubmitting(false);
        }
    };

    if (checkingStatus) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                <div className="w-8 h-8 rounded-full border-2 border-border border-t-teal-500 animate-spin" />
            </div>
        );
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 80 : -80,
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({
            x: direction < 0 ? 80 : -80,
            opacity: 0,
        }),
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-white to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 flex flex-col">
            <SEO title="Welcome | Psychage" />

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 pt-8 pb-4">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            width: i === step ? 24 : 8,
                            backgroundColor: i <= step ? '#1A9B8C' : '#D1D5DB',
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-2 rounded-full"
                    />
                ))}
            </div>

            {/* Step content */}
            <div className="flex-grow flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait" custom={1}>
                    <motion.div
                        key={step}
                        custom={1}
                        variants={reduced ? undefined : slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
                        className="w-full"
                    >
                        {step === 0 && (
                            <WelcomeStep
                                displayName={user?.display_name || ''}
                                onNext={() => setStep(1)}
                            />
                        )}
                        {step === 1 && (
                            <FocusSelectionStep
                                selected={wellnessFocus}
                                onSelect={setWellnessFocus}
                                onNext={() => setStep(2)}
                                onBack={() => setStep(0)}
                            />
                        )}
                        {step === 2 && user?.id && (
                            <FirstMoodStep
                                userId={user.id}
                                onNext={() => setStep(3)}
                                onBack={() => setStep(1)}
                            />
                        )}
                        {step === 3 && (
                            <ReadyStep
                                onFinish={handleFinish}
                                isSubmitting={isSubmitting}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OnboardingPage;
