import React from 'react';
import { TrendingUp, Calendar, Activity, Hash } from 'lucide-react';

interface LightweightInsightsProps {
    entries: { id: string; date: string; mood: number; emotions: string[] }[];
}

export const LightweightInsights: React.FC<LightweightInsightsProps> = ({ entries }) => {
    const last7 = [...entries].slice(0, 7).reverse();

    const points = last7.map((entry, i) => {
        const x = last7.length > 1 ? (i / (last7.length - 1)) * 100 : 50;
        const y = 40 - ((entry.mood / 10) * 40);
        return `${x},${y}`;
    }).join(' ');

    const avgMood = entries.length ? (entries.reduce((sum, e) => sum + e.mood, 0) / entries.length) : 0;
    const recentEmotions = Array.from(new Set(entries.flatMap(e => e.emotions))).slice(0, 5);

    // Calculate streak
    const getStreak = () => {
        if (entries.length === 0) return 0;
        let streak = 1;
        for (let i = 1; i < entries.length; i++) {
            const curr = new Date(entries[i - 1].date);
            const prev = new Date(entries[i].date);
            const diffDays = Math.floor((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays <= 1) streak++;
            else break;
        }
        return streak;
    };

    const streak = getStreak();

    const getMoodLabel = (val: number) => {
        if (val >= 8) return { label: 'Great', color: 'text-teal-600' };
        if (val >= 6) return { label: 'Good', color: 'text-emerald-600' };
        if (val >= 4) return { label: 'Okay', color: 'text-amber-600' };
        return { label: 'Low', color: 'text-rose-600' };
    };

    const moodInfo = getMoodLabel(avgMood);

    return (
        <div className="space-y-4">
            {/* Trend Card */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center">
                        <TrendingUp size={16} className="text-teal-600" />
                    </div>
                    <h3 className="font-display font-semibold text-gray-900">Mood Trend</h3>
                </div>
                <div className="h-14 w-full relative">
                    {last7.length > 1 ? (
                        <svg viewBox="0 -5 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#20B8A6" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#20B8A6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <polygon
                                fill="url(#trendGradient)"
                                points={`0,40 ${points} 100,40`}
                            />
                            <polyline
                                fill="none"
                                stroke="#1A9B8C"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={points}
                            />
                            {last7.map((e, i) => {
                                const x = (i / (last7.length - 1)) * 100;
                                const y = 40 - ((e.mood / 10) * 40);
                                return <circle key={i} cx={x} cy={y} r="3" fill="#1A9B8C" />;
                            })}
                        </svg>
                    ) : (
                        <p className="text-xs text-gray-400 pt-4">Log more entries to see your trend</p>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-2">
                        <Activity size={14} className="text-gray-400" />
                        <p className="text-xs text-gray-500 font-medium">Avg Mood</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                        {entries.length ? avgMood.toFixed(1) : '-'}
                    </p>
                    {entries.length > 0 && (
                        <p className={`text-xs font-semibold mt-0.5 ${moodInfo.color}`}>{moodInfo.label}</p>
                    )}
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-2">
                        <Calendar size={14} className="text-gray-400" />
                        <p className="text-xs text-gray-500 font-medium">Streak</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{streak}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{streak === 1 ? 'day' : 'days'}</p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm col-span-2">
                    <div className="flex items-center gap-1.5 mb-2">
                        <Hash size={14} className="text-gray-400" />
                        <p className="text-xs text-gray-500 font-medium">Total Entries</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{entries.length}</p>
                </div>
            </div>

            {/* Top Emotions */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-3">Top Emotions</p>
                <div className="flex flex-wrap gap-2">
                    {recentEmotions.length ? recentEmotions.map(e => (
                        <span key={e} className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-medium rounded-full border border-gray-100">{e}</span>
                    )) : <span className="text-xs text-gray-400">No data yet</span>}
                </div>
            </div>
        </div>
    );
};
