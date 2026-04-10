import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, ArrowRight, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { moodService, type MoodEntry } from '@/services/moodService';
import { toast } from 'sonner';
import { format } from 'date-fns';

export const MOOD_OPTIONS = [
    { value: 1, label: 'Awful', color: '#8B7FA8', bgLight: 'bg-[#8B7FA8]/10', bgDark: 'dark:bg-[#8B7FA8]/15' },
    { value: 2, label: 'Low', color: '#D4A060', bgLight: 'bg-[#D4A060]/10', bgDark: 'dark:bg-[#D4A060]/15' },
    { value: 3, label: 'Okay', color: '#8FAE8B', bgLight: 'bg-[#8FAE8B]/10', bgDark: 'dark:bg-[#8FAE8B]/15' },
    { value: 4, label: 'Good', color: '#1A9B8C', bgLight: 'bg-[#1A9B8C]/10', bgDark: 'dark:bg-[#1A9B8C]/15' },
    { value: 5, label: 'Great', color: '#15B8A6', bgLight: 'bg-[#15B8A6]/10', bgDark: 'dark:bg-[#15B8A6]/15' },
];

interface QuickMoodCheckInProps {
    userId: string;
    todayEntry: MoodEntry | null;
    onMoodLogged: (entry: MoodEntry) => void;
}

const QuickMoodCheckIn: React.FC<QuickMoodCheckInProps> = ({ userId, todayEntry, onMoodLogged }) => {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const reduced = useReducedMotion();

    const handleSelect = (value: number) => {
        setSelectedMood(value);
        setShowNotes(true);
    };

    const handleSubmit = async () => {
        if (!selectedMood || isSubmitting) return;
        setIsSubmitting(true);
        try {
            const entry = await moodService.createEntry(userId, selectedMood, notes || undefined);
            if (entry) {
                onMoodLogged(entry);
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setSelectedMood(null);
                    setNotes('');
                    setShowNotes(false);
                }, 3000);
            } else {
                toast.error('Could not save your mood. Please try again.');
            }
        } catch {
            toast.error('Could not save your mood. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedOption = selectedMood ? MOOD_OPTIONS.find(m => m.value === selectedMood) : null;
    const todayOption = todayEntry ? MOOD_OPTIONS.find(m => m.value === todayEntry.value) : null;

    return (
        <motion.div
            initial={reduced ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            id="mood-checkin"
            className="h-full"
        >
            <div
                className={cn(
                    'p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm h-full transition-colors duration-500',
                    selectedOption && !showSuccess && !todayEntry ? selectedOption.bgLight + ' ' + selectedOption.bgDark : ''
                )}
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Smile size={18} className="text-amber-500" />
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                            How are you feeling?
                        </h3>
                    </div>
                    {todayEntry && !showSuccess && (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40 font-medium">
                            Logged today
                        </span>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {showSuccess ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center gap-3 py-4"
                        >
                            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                <Check size={16} className="text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                                Noted. You're building awareness.
                            </p>
                        </motion.div>
                    ) : todayEntry ? (
                        <motion.div
                            key="logged"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                        >
                            <div
                                className="w-10 h-10 rounded-full shrink-0"
                                style={{ backgroundColor: todayOption?.color || '#8FAE8B' }}
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {todayOption?.label || 'Logged'}
                                </p>
                                <p className="text-[11px] text-gray-400 dark:text-gray-500">
                                    {format(new Date(todayEntry.created_at), 'h:mm a')}
                                </p>
                            </div>
                            <Link to="/tools/mood-journal" className="ml-auto text-[11px] text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1">
                                View Journal <ArrowRight size={11} />
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div key="picker" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {/* Mood shapes */}
                            <div className="flex justify-between gap-2 sm:gap-3 mb-3">
                                {MOOD_OPTIONS.map(option => {
                                    const isSelected = selectedMood === option.value;
                                    return (
                                        <motion.button
                                            key={option.value}
                                            onClick={() => handleSelect(option.value)}
                                            whileTap={reduced ? undefined : { scale: 0.92 }}
                                            animate={reduced ? undefined : {
                                                scale: isSelected ? 1.15 : 1,
                                                opacity: selectedMood && !isSelected ? 0.45 : 1,
                                            }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                            className={cn(
                                                'flex-1 flex flex-col items-center gap-2 py-3 px-2 rounded-xl transition-colors border-2 min-h-[72px]',
                                                isSelected
                                                    ? 'border-current shadow-md'
                                                    : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                            )}
                                            style={isSelected ? { borderColor: option.color } : undefined}
                                        >
                                            <div
                                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-colors duration-300"
                                                style={{ backgroundColor: isSelected ? option.color : `${option.color}30` }}
                                            />
                                            <span className={cn(
                                                'text-[10px] sm:text-xs font-medium transition-colors',
                                                isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'
                                            )}>
                                                {option.label}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Notes + Save */}
                            <AnimatePresence>
                                {showNotes && selectedMood && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <textarea
                                            placeholder="Want to add a note? (optional)"
                                            value={notes}
                                            onChange={e => setNotes(e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none h-20 mb-3 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500/50"
                                            maxLength={500}
                                        />
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                isLoading={isSubmitting}
                                                onClick={handleSubmit}
                                                leftIcon={<Check size={14} />}
                                                className="rounded-lg"
                                            >
                                                Save
                                            </Button>
                                            <button
                                                onClick={() => { setShowNotes(false); setSelectedMood(null); }}
                                                className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default QuickMoodCheckIn;
