import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useTimeOfDay } from '@/hooks/useTimeOfDay';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { slideUp, duration, ease } from '@/lib/animations';

interface WelcomeStepProps {
    displayName: string;
    onNext: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ displayName, onNext }) => {
    const { greeting } = useTimeOfDay();
    const reduced = useReducedMotion();
    const firstName = displayName?.split(' ')[0] || 'there';

    return (
        <motion.div
            variants={reduced ? undefined : slideUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center text-center px-6 py-12 max-w-lg mx-auto"
        >
            {/* Decorative teal orb */}
            <motion.div
                initial={reduced ? {} : { scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: duration.large, ease: ease.decelerate }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 mb-8 flex items-center justify-center shadow-lg shadow-teal-500/20"
            >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                    <path d="M12 6v6l4 2" />
                </svg>
            </motion.div>

            <motion.p
                initial={reduced ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: duration.medium }}
                className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-2 tracking-wide"
            >
                {greeting}
            </motion.p>

            <motion.h1
                initial={reduced ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: duration.medium }}
                className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4 tracking-tight"
            >
                Welcome, {firstName}
            </motion.h1>

            <motion.p
                initial={reduced ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: duration.medium }}
                className="text-text-tertiary mb-10 leading-relaxed max-w-sm"
            >
                Let's set up your wellness space. This takes about 60 seconds.
            </motion.p>

            <motion.div
                initial={reduced ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: duration.medium }}
            >
                <Button
                    variant="primary"
                    size="lg"
                    onClick={onNext}
                    rightIcon={<ArrowRight size={18} />}
                    className="rounded-xl px-8 font-semibold shadow-lg shadow-teal-500/20"
                >
                    Let's Begin
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default WelcomeStep;
