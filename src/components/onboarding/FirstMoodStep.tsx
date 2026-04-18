import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { moodService } from '@/services/moodService';
import { toast } from 'sonner';

const MOOD_OPTIONS = [
    { value: 1, label: 'Awful', color: '#8B7FA8', bgClass: 'bg-[#8B7FA8]/10' },
    { value: 2, label: 'Low', color: '#D4A060', bgClass: 'bg-[#D4A060]/10' },
    { value: 3, label: 'Okay', color: '#8FAE8B', bgClass: 'bg-[#8FAE8B]/10' },
    { value: 4, label: 'Good', color: '#1A9B8C', bgClass: 'bg-[#1A9B8C]/10' },
    { value: 5, label: 'Great', color: '#15B8A6', bgClass: 'bg-[#15B8A6]/10' },
];

interface FirstMoodStepProps {
    userId: string;
    onNext: () => void;
    onBack: () => void;
}

const FirstMoodStep: React.FC<FirstMoodStepProps> = ({ userId, onNext, onBack }) => {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const reduced = useReducedMotion();

    const handleSelect = (value: number) => {
        setSelectedMood(value);
        setShowNotes(true);
    };

    const handleSubmit = async () => {
        if (!selectedMood) return;
        setIsSubmitting(true);
        try {
            const entry = await moodService.createEntry(userId, selectedMood, notes || undefined);
            if (entry) {
                toast.success('Noted. You\'re building awareness.');
                onNext();
            } else {
                toast.error('Could not save your mood. Please try again.');
            }
        } catch {
            toast.error('Could not save your mood. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSkip = () => {
        onNext();
    };

    return (
        <div className="flex flex-col items-center px-6 py-8 max-w-lg mx-auto">
            <motion.h2
                initial={reduced ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl font-display font-bold text-text-primary mb-2 text-center tracking-tight"
            >
                How are you feeling right now?
            </motion.h2>
            <motion.p
                initial={reduced ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-text-tertiary mb-8 text-center text-sm"
            >
                Your first check-in. No right or wrong answer.
            </motion.p>

            <div className="flex justify-center gap-3 sm:gap-4 mb-6 w-full">
                {MOOD_OPTIONS.map((option) => {
                    const isSelected = selectedMood === option.value;
                    return (
                        <motion.button
                            key={option.value}
                            whileTap={reduced ? undefined : { scale: 0.92 }}
                            animate={isSelected ? { scale: 1.1 } : { scale: 1, opacity: selectedMood && !isSelected ? 0.5 : 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            onClick={() => handleSelect(option.value)}
                            className={cn(
                                'flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border-2 transition-colors min-w-[60px]',
                                isSelected
                                    ? 'border-current shadow-md'
                                    : 'border-border hover:border-gray-300 dark:hover:border-gray-600'
                            )}
                            style={isSelected ? { borderColor: option.color } : undefined}
                        >
                            <div
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                                style={{ backgroundColor: isSelected ? option.color : `${option.color}40` }}
                            />
                            <span className={cn(
                                'text-xs font-medium',
                                isSelected ? 'text-text-primary' : 'text-text-tertiary'
                            )}>
                                {option.label}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {showNotes && selectedMood && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden w-full max-w-sm mb-6"
                    >
                        <textarea
                            placeholder="Want to add a note? (optional)"
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            className="w-full bg-surface border border-border rounded-xl p-3 text-sm text-text-primary placeholder:text-text-tertiary resize-none h-20 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500/50"
                            maxLength={500}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-3 w-full max-w-xs">
                <Button variant="ghost" size="md" onClick={onBack} leftIcon={<ArrowLeft size={16} />} className="rounded-xl">
                    Back
                </Button>
                <Button
                    variant="primary"
                    size="md"
                    onClick={handleSubmit}
                    disabled={!selectedMood}
                    isLoading={isSubmitting}
                    rightIcon={<ArrowRight size={16} />}
                    className="rounded-xl flex-grow font-semibold"
                >
                    Continue
                </Button>
            </div>

            <button
                onClick={handleSkip}
                className="mt-4 text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
                Skip for now
            </button>
        </div>
    );
};

export default FirstMoodStep;
