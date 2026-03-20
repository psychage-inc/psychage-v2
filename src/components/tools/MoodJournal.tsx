import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import Breadcrumbs from '../ui/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { moodService, MoodEntry as ServiceMoodEntry } from '../../services/moodService';
import { useAuth } from '../../context/AuthContext';
import { MoodWizard, WizardState } from './MoodWizard/MoodWizard';
import { LightweightInsights } from './LightweightInsights';

interface MoodEntry {
    id: string;
    date: string;
    mood: number; // 1-10
    emotions: string[];
    note: string;
}

// Convert service entry to component entry
const fromServiceEntry = (entry: ServiceMoodEntry): MoodEntry => ({
    id: entry.id,
    date: entry.created_at,
    mood: entry.value,
    emotions: entry.tags || [],
    note: entry.notes || ''
});

const STORAGE_KEY = 'psychage_mood_journal';

const MoodJournal: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [entries, setEntries] = useState<MoodEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<'new' | 'history'>('new');

    // Load entries on mount
    const loadEntries = useCallback(async () => {
        setIsLoading(true);
        try {
            if (user?.id) {
                const serviceEntries = await moodService.getEntries(user.id);
                setEntries(serviceEntries.map(fromServiceEntry));
            } else {
                const saved = localStorage.getItem(STORAGE_KEY);
                setEntries(saved ? JSON.parse(saved) : []);
            }
        } catch (error) {
            console.error('Failed to load entries:', error);
            const saved = localStorage.getItem(STORAGE_KEY);
            setEntries(saved ? JSON.parse(saved) : []);
        } finally {
            setIsLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        loadEntries();
    }, [loadEntries]);

    const handleSaveWizard = async (data: WizardState) => {
        // Merge emotions and impact areas for storage
        const combinedTags = [...data.emotions, ...data.impactAreas];
        const noteToSave = data.note;

        try {
            if (user?.id) {
                const serviceEntry = await moodService.createEntry(
                    user.id,
                    data.valence,
                    noteToSave || undefined,
                    combinedTags
                );
                if (serviceEntry) {
                    setEntries(prev => [fromServiceEntry(serviceEntry), ...prev]);
                }
            } else {
                const newEntry: MoodEntry = {
                    id: Date.now().toString(),
                    date: new Date().toISOString(),
                    mood: data.valence,
                    emotions: combinedTags,
                    note: noteToSave
                };
                const updatedEntries = [newEntry, ...entries];
                setEntries(updatedEntries);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
            }
            setView('history');
        } catch (error) {
            console.error('Failed to save entry:', error);
            // Fallback: save to localStorage so the entry isn't lost
            const fallbackEntry: MoodEntry = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                mood: data.valence,
                emotions: combinedTags,
                note: noteToSave
            };
            const updatedEntries = [fallbackEntry, ...entries];
            setEntries(updatedEntries);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
        }
    };

    const deleteEntry = async (id: string) => {
        try {
            if (user?.id) {
                const success = await moodService.deleteEntry(id);
                if (success) {
                    setEntries(prev => prev.filter(e => e.id !== id));
                }
            } else {
                const updatedEntries = entries.filter(e => e.id !== id);
                setEntries(updatedEntries);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
            }
        } catch (error) {
            console.error('Failed to delete entry:', error);
        }
    };

    const getMoodColor = (val: number) => {
        if (val >= 8) return 'bg-teal-500';
        if (val >= 5) return 'bg-amber-500';
        return 'bg-rose-500';
    };

    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-6">
            {view === 'new' ? (
                <MoodWizard onComplete={handleSaveWizard} onCancel={() => setView('history')} />
            ) : (
                <div className="container mx-auto max-w-4xl">
                    <div className="mb-6">
                        <Breadcrumbs />
                    </div>
                    <div className="mb-8 flex items-center justify-between">
                        <button onClick={() => navigate('/tools')} className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-bold text-sm uppercase tracking-wider">
                            <ArrowLeft size={16} /> Back to Tools
                        </button>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setView('new')}
                                className="px-4 py-2 rounded-full text-sm font-bold transition-all text-gray-500 hover:bg-gray-100"
                            >
                                Check-in
                            </button>
                            <button
                                onClick={() => setView('history')}
                                className="px-4 py-2 rounded-full text-sm font-bold transition-all bg-gray-900 text-white shadow-sm"
                            >
                                History
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key="history"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    {isLoading ? (
                                        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                                            <Loader2 size={32} className="animate-spin text-teal-500 mx-auto mb-4" />
                                            <p className="text-gray-500">Loading your entries...</p>
                                        </div>
                                    ) : entries.length === 0 ? (
                                        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                                <Calendar size={24} />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2">No entries yet</h3>
                                            <p className="text-gray-500 mb-6">Start tracking your mood with the new Check-in wizard to see patterns over time.</p>
                                            <Button onClick={() => setView('new')}>Create First Entry</Button>
                                        </div>
                                    ) : (
                                        entries.map(entry => (
                                            <div key={entry.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md ${getMoodColor(entry.mood)}`}>
                                                            {entry.mood}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-gray-900">
                                                                {new Date(entry.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                                                            </div>
                                                            <div className="text-xs text-gray-400">
                                                                {new Date(entry.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => deleteEntry(entry.id)}
                                                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                                        aria-label="Delete entry"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>

                                                {entry.emotions.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {entry.emotions.map(e => (
                                                            <span key={e} className="px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-600">
                                                                {e}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {entry.note && (
                                                    <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-xl leading-relaxed">
                                                        "{entry.note}"
                                                    </p>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Sidebar Stats */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <LightweightInsights entries={entries} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MoodJournal;
