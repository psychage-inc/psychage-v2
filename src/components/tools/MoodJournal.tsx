import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Calendar, Save, Trash2, TrendingUp, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

interface MoodEntry {
    id: string;
    date: string;
    mood: number; // 1-10
    emotions: string[];
    note: string;
}

const EMOTIONS = [
    "Happy", "Excited", "Calm", "Grateful",
    "Anxious", "Stressed", "Tired", "Sad",
    "Angry", "Confused", "Lonely", "Motivated"
];

const STORAGE_KEY = 'psychage_mood_journal';

const MoodJournal: React.FC = () => {
    const navigate = useNavigate();

    const [entries, setEntries] = useState<MoodEntry[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            console.error("Failed to load journal entries");
            return [];
        }
    });

    const [mood, setMood] = useState(5);
    const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
    const [note, setNote] = useState('');
    const [view, setView] = useState<'new' | 'history'>('new');

    const saveEntry = () => {
        const newEntry: MoodEntry = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            mood,
            emotions: selectedEmotions,
            note
        };

        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));

        // Reset form
        setMood(5);
        setSelectedEmotions([]);
        setNote('');
        setView('history');
    };

    const deleteEntry = (id: string) => {
        const updatedEntries = entries.filter(e => e.id !== id);
        setEntries(updatedEntries);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    };

    const toggleEmotion = (emotion: string) => {
        if (selectedEmotions.includes(emotion)) {
            setSelectedEmotions(prev => prev.filter(e => e !== emotion));
        } else {
            setSelectedEmotions(prev => [...prev, emotion]);
        }
    };

    const getMoodColor = (val: number) => {
        if (val >= 8) return 'bg-teal-500';
        if (val >= 5) return 'bg-amber-500';
        return 'bg-rose-500';
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-8 flex items-center justify-between">
                    <button onClick={() => navigate('/tools')} className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-bold text-sm uppercase tracking-wider">
                        <ArrowLeft size={16} /> Back to Tools
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setView('new')}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${view === 'new' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            Check-in
                        </button>
                        <button
                            onClick={() => setView('history')}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${view === 'history' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            History
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {view === 'new' ? (
                                <motion.div
                                    key="new"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                                            <PenTool size={24} />
                                        </div>
                                        <div>
                                            <h1 className="font-display font-bold text-2xl text-gray-900">Daily Check-in</h1>
                                            <p className="text-gray-500">How are you feeling right now?</p>
                                        </div>
                                    </div>

                                    {/* Mood Slider */}
                                    <div className="mb-10">
                                        <div className="flex justify-between text-sm font-bold text-gray-400 mb-4">
                                            <span>Low</span>
                                            <span>Neutral</span>
                                            <span>High</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={mood}
                                            onChange={(e) => setMood(parseInt(e.target.value))}
                                            className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                        />
                                        <div className="mt-4 text-center">
                                            <span className={`inline-block px-4 py-1 rounded-full text-white font-bold text-lg ${getMoodColor(mood)}`}>
                                                {mood}/10
                                            </span>
                                        </div>
                                    </div>

                                    {/* Emotions */}
                                    <div className="mb-10">
                                        <h3 className="font-bold text-gray-900 mb-4">What emotions are present?</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {EMOTIONS.map(emotion => (
                                                <button
                                                    key={emotion}
                                                    onClick={() => toggleEmotion(emotion)}
                                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${selectedEmotions.includes(emotion)
                                                        ? 'bg-teal-500 text-white border-teal-500'
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'
                                                        }`}
                                                >
                                                    {emotion}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Note */}
                                    <div className="mb-8">
                                        <h3 className="font-bold text-gray-900 mb-4">Add a note (optional)</h3>
                                        <textarea
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            placeholder="What's on your mind?"
                                            className="w-full p-4 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none min-h-[120px] resize-none"
                                        />
                                    </div>

                                    <Button onClick={saveEntry} size="lg" className="w-full" rightIcon={<Save size={18} />}>
                                        Save Entry
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="history"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    {entries.length === 0 ? (
                                        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                                <Calendar size={24} />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2">No entries yet</h3>
                                            <p className="text-gray-500 mb-6">Start tracking your mood to see patterns over time.</p>
                                            <Button onClick={() => setView('new')}>Create First Entry</Button>
                                        </div>
                                    ) : (
                                        entries.map(entry => (
                                            <div key={entry.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getMoodColor(entry.mood)}`}>
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
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>

                                                {entry.emotions.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {entry.emotions.map(e => (
                                                            <span key={e} className="px-2 py-1 rounded-md bg-gray-100 text-xs font-bold text-gray-600">
                                                                {e}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {entry.note && (
                                                    <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-xl italic">
                                                        "{entry.note}"
                                                    </p>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <TrendingUp size={20} className="text-teal-500" />
                                Insights
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Total Entries</div>
                                    <div className="text-3xl font-display font-bold text-gray-900">{entries.length}</div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Average Mood</div>
                                    <div className="text-3xl font-display font-bold text-gray-900">
                                        {entries.length > 0
                                            ? (entries.reduce((acc, curr) => acc + curr.mood, 0) / entries.length).toFixed(1)
                                            : '-'
                                        }
                                        <span className="text-sm text-gray-400 font-normal ml-1">/ 10</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <h4 className="font-bold text-gray-900 text-sm mb-3">Recent Emotions</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.from(new Set(entries.flatMap(e => e.emotions))).slice(0, 5).map(e => (
                                            <span key={e} className="text-xs text-gray-500 border border-gray-200 px-2 py-1 rounded-md">
                                                {e}
                                            </span>
                                        ))}
                                        {entries.length === 0 && <span className="text-xs text-gray-400">No data yet</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoodJournal;
