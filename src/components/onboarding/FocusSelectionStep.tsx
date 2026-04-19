import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Moon, Brain, Users, Search, HandHeart, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import type { LucideIcon } from 'lucide-react';

interface FocusOption {
    id: string;
    label: string;
    description: string;
    icon: LucideIcon;
    color: string;
}

const FOCUS_OPTIONS: FocusOption[] = [
    { id: 'mood', label: 'Mood & Emotions', description: 'Understand and track how you feel', icon: Heart, color: 'text-amber-500 bg-amber-500/10' },
    { id: 'sleep', label: 'Sleep & Rest', description: 'Build better sleep habits', icon: Moon, color: 'text-indigo-500 bg-indigo-500/10' },
    { id: 'stress', label: 'Stress & Anxiety', description: 'Learn to manage daily stress', icon: Brain, color: 'text-rose-500 bg-rose-500/10' },
    { id: 'relationships', label: 'Relationships', description: 'Improve connection with others', icon: Users, color: 'text-sky-500 bg-sky-500/10' },
    { id: 'self-understanding', label: 'Self-Understanding', description: 'Explore patterns in your experiences', icon: Search, color: 'text-purple-500 bg-purple-500/10' },
    { id: 'support', label: 'Finding Support', description: 'Connect with the right resources', icon: HandHeart, color: 'text-teal-500 bg-teal-500/10' },
];

interface FocusSelectionStepProps {
    selected: string[];
    onSelect: (focus: string[]) => void;
    onNext: () => void;
    onBack: () => void;
}

const FocusSelectionStep: React.FC<FocusSelectionStepProps> = ({ selected, onSelect, onNext, onBack }) => {
    const reduced = useReducedMotion();

    const toggle = (id: string) => {
        if (selected.includes(id)) {
            onSelect(selected.filter(s => s !== id));
        } else {
            onSelect([...selected, id]);
        }
    };

    const canProceed = selected.length >= 2;

    return (
        <div className="flex flex-col items-center px-6 py-8 max-w-xl mx-auto">
            <motion.h2
                initial={reduced ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl font-display font-bold text-text-primary mb-2 text-center tracking-tight"
            >
                What matters most to you?
            </motion.h2>
            <motion.p
                initial={reduced ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-text-tertiary mb-8 text-center text-sm"
            >
                Choose at least 2 areas to personalize your dashboard.
            </motion.p>

            <motion.div
                variants={reduced ? undefined : staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8"
            >
                {FOCUS_OPTIONS.map((option) => {
                    const isSelected = selected.includes(option.id);
                    const Icon = option.icon;
                    return (
                        <motion.button
                            key={option.id}
                            variants={reduced ? undefined : staggerItem}
                            whileTap={reduced ? undefined : { scale: 0.97 }}
                            onClick={() => toggle(option.id)}
                            className={cn(
                                'relative flex items-start gap-3.5 p-4 rounded-xl border-2 transition-all text-left',
                                isSelected
                                    ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-900/20 dark:border-teal-400'
                                    : 'border-border bg-surface hover:border-gray-300 dark:hover:border-neutral-600'
                            )}
                        >
                            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', option.color)}>
                                <Icon size={20} />
                            </div>
                            <div className="flex-grow min-w-0">
                                <p className="font-semibold text-sm text-text-primary">{option.label}</p>
                                <p className="text-xs text-text-tertiary mt-0.5">{option.description}</p>
                            </div>
                            {isSelected && (
                                <motion.div
                                    initial={reduced ? {} : { scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                    className="absolute top-3 right-3 w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center"
                                >
                                    <Check size={12} className="text-white" strokeWidth={3} />
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </motion.div>

            <div className="flex items-center gap-3 w-full max-w-xs">
                <Button variant="ghost" size="md" onClick={onBack} leftIcon={<ArrowLeft size={16} />} className="rounded-xl">
                    Back
                </Button>
                <Button
                    variant="primary"
                    size="md"
                    onClick={onNext}
                    disabled={!canProceed}
                    rightIcon={<ArrowRight size={16} />}
                    className="rounded-xl flex-grow font-semibold"
                >
                    Continue
                </Button>
            </div>
            {!canProceed && (
                <p className="text-xs text-text-tertiary mt-3">
                    Select at least {2 - selected.length} more
                </p>
            )}
        </div>
    );
};

export default FocusSelectionStep;
