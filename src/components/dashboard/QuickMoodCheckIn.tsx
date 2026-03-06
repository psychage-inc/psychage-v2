import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, ArrowRight } from 'lucide-react';
import InteractiveCard from '@/components/ui/InteractiveCard';
import Button from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { moodService, type MoodEntry } from '@/services/moodService';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const MOOD_OPTIONS = [
    { value: 1, emoji: '\u{1F61E}', label: 'Awful' },
    { value: 2, emoji: '\u{1F614}', label: 'Bad' },
    { value: 3, emoji: '\u{1F610}', label: 'Okay' },
    { value: 4, emoji: '\u{1F642}', label: 'Good' },
    { value: 5, emoji: '\u{1F604}', label: 'Great' },
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
    const toast = useToast();

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
                toast.success('Mood logged successfully');
                onMoodLogged(entry);
                setSelectedMood(null);
                setNotes('');
                setShowNotes(false);
            } else {
                toast.error('Failed to log mood. Please try again.');
            }
        } catch {
            toast.error('Failed to log mood. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            id="mood-checkin"
        >
            <InteractiveCard className="p-6 bg-white/5 border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-text-primary flex items-center gap-2 text-lg">
                        <Smile size={20} className="text-amber-400" />
                        How are you feeling?
                    </h3>
                    {todayEntry && (
                        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                            Logged today
                        </span>
                    )}
                </div>

                {!todayEntry ? (
                    <>
                        <div className="flex justify-between gap-2 mb-4">
                            {MOOD_OPTIONS.map(option => (
                                <motion.button
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    whileTap={{ scale: 0.9 }}
                                    className={cn(
                                        'flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all border',
                                        selectedMood === option.value
                                            ? 'bg-primary/15 border-primary/40 ring-2 ring-primary/20'
                                            : 'bg-surface-hover border-white/5 hover:bg-surface-active hover:border-white/10'
                                    )}
                                >
                                    <span className="text-2xl">{option.emoji}</span>
                                    <span className="text-[10px] text-text-secondary font-medium">{option.label}</span>
                                </motion.button>
                            ))}
                        </div>

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
                                        placeholder="Add a note (optional)"
                                        value={notes}
                                        onChange={e => setNotes(e.target.value)}
                                        className="w-full bg-surface-hover border border-border rounded-xl p-3 text-sm text-text-primary placeholder:text-text-tertiary resize-none h-20 mb-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                                        maxLength={500}
                                    />
                                    <div className="flex items-center gap-3">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            isLoading={isSubmitting}
                                            onClick={handleSubmit}
                                        >
                                            Log Mood
                                        </Button>
                                        <button
                                            onClick={() => { setShowNotes(false); setSelectedMood(null); }}
                                            className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                ) : (
                    <div className="flex items-center gap-3 p-3 bg-surface-hover rounded-2xl">
                        <span className="text-3xl">
                            {MOOD_OPTIONS.find(m => m.value === todayEntry.value)?.emoji || '\u{1F610}'}
                        </span>
                        <div>
                            <p className="text-sm font-medium text-text-primary">
                                {MOOD_OPTIONS.find(m => m.value === todayEntry.value)?.label || 'Logged'}
                            </p>
                            <p className="text-xs text-text-tertiary">
                                {format(new Date(todayEntry.created_at), 'h:mm a')}
                            </p>
                        </div>
                        <Link to="/tools/mood-journal" className="ml-auto text-xs text-primary hover:underline flex items-center gap-1">
                            View Journal <ArrowRight size={12} />
                        </Link>
                    </div>
                )}
            </InteractiveCard>
        </motion.div>
    );
};

export default QuickMoodCheckIn;
