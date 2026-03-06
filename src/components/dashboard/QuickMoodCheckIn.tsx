import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, ArrowRight } from 'lucide-react';
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            id="mood-checkin"
        >
            <div className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Smile size={18} className="text-amber-400" />
                        <h3 className="font-semibold text-text-primary text-sm tracking-tight">
                            How are you feeling?
                        </h3>
                    </div>
                    {todayEntry && (
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                            Logged today
                        </span>
                    )}
                </div>

                {!todayEntry ? (
                    <>
                        <div className="flex justify-between gap-2 mb-3">
                            {MOOD_OPTIONS.map(option => (
                                <motion.button
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    whileTap={{ scale: 0.92 }}
                                    className={cn(
                                        'flex-1 flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-xl transition-all border',
                                        selectedMood === option.value
                                            ? 'bg-primary/12 border-primary/30 ring-1 ring-primary/20'
                                            : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1]'
                                    )}
                                >
                                    <span className="text-xl">{option.emoji}</span>
                                    <span className="text-[10px] text-text-tertiary font-medium">{option.label}</span>
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
                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 text-sm text-text-primary placeholder:text-text-tertiary/50 resize-none h-20 mb-3 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30"
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
                                            className="text-xs text-text-tertiary/60 hover:text-text-secondary transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                ) : (
                    <div className="flex items-center gap-3 p-3 bg-white/[0.04] rounded-xl">
                        <span className="text-2xl">
                            {MOOD_OPTIONS.find(m => m.value === todayEntry.value)?.emoji || '\u{1F610}'}
                        </span>
                        <div>
                            <p className="text-[13px] font-medium text-text-primary">
                                {MOOD_OPTIONS.find(m => m.value === todayEntry.value)?.label || 'Logged'}
                            </p>
                            <p className="text-[11px] text-text-tertiary/60">
                                {format(new Date(todayEntry.created_at), 'h:mm a')}
                            </p>
                        </div>
                        <Link to="/tools/mood-journal" className="ml-auto text-[11px] text-primary/80 hover:text-primary flex items-center gap-1 transition-colors">
                            View Journal <ArrowRight size={11} />
                        </Link>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default QuickMoodCheckIn;
