import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, BookOpen, Brain } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { duration, ease, staggerContainer, staggerItem } from '@/lib/animations';

interface ReadyStepProps {
    onFinish: () => void;
    isSubmitting: boolean;
}

const PREVIEW_CARDS = [
    { icon: BarChart3, label: 'Mood & Sleep Tracking', description: 'Track patterns over time', color: 'text-amber-500 bg-amber-500/10' },
    { icon: Brain, label: 'Clarity Score', description: 'Measure cognitive wellness', color: 'text-teal-500 bg-teal-500/10' },
    { icon: BookOpen, label: 'Learn Library', description: 'Articles tailored for you', color: 'text-indigo-500 bg-indigo-500/10' },
];

const ReadyStep: React.FC<ReadyStepProps> = ({ onFinish, isSubmitting }) => {
    const reduced = useReducedMotion();

    return (
        <div className="flex flex-col items-center px-6 py-8 max-w-lg mx-auto text-center">
            {/* Animated checkmark */}
            <motion.div
                initial={reduced ? {} : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 mb-8 flex items-center justify-center shadow-lg shadow-teal-500/20"
            >
                <motion.svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduced ? {} : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: duration.large, delay: 0.3 }}
                >
                    <motion.path
                        d="M5 13l4 4L19 7"
                        initial={reduced ? {} : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: duration.large, delay: 0.3, ease: ease.decelerate }}
                    />
                </motion.svg>
            </motion.div>

            <motion.h2
                initial={reduced ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white mb-2 tracking-tight"
            >
                Your dashboard is ready!
            </motion.h2>
            <motion.p
                initial={reduced ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 dark:text-gray-400 mb-8 text-sm"
            >
                Here's what's waiting for you.
            </motion.p>

            <motion.div
                variants={reduced ? undefined : staggerContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-3 w-full max-w-sm mb-10"
            >
                {PREVIEW_CARDS.map((card) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={card.label}
                            variants={reduced ? undefined : staggerItem}
                            className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                        >
                            <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', card.color)}>
                                <Icon size={18} />
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-sm text-gray-900 dark:text-white">{card.label}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{card.description}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            <motion.div
                initial={reduced ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Button
                    variant="primary"
                    size="lg"
                    onClick={onFinish}
                    isLoading={isSubmitting}
                    rightIcon={<ArrowRight size={18} />}
                    className="rounded-xl px-10 font-semibold shadow-lg shadow-teal-500/20"
                >
                    Go to Dashboard
                </Button>
            </motion.div>
        </div>
    );
};

export default ReadyStep;
