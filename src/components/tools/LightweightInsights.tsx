import React from 'react';

// Adapt to existing MoodEntry Type defined in MoodJournal
interface LightweightInsightsProps {
    entries: { id: string; date: string; mood: number; emotions: string[] }[];
}

export const LightweightInsights: React.FC<LightweightInsightsProps> = ({ entries }) => {
    const last7 = [...entries].slice(0, 7).reverse(); // Mutates array without copy, so use [...entries]

    // Calculate SVG points based on 100x40 grid (mood 1-10 -> y: 40-0)
    const points = last7.map((entry, i) => {
        const x = last7.length > 1 ? (i / (last7.length - 1)) * 100 : 50;
        const y = 40 - ((entry.mood / 10) * 40);
        return `${x},${y}`;
    }).join(' ');

    const recentEmotions = Array.from(new Set(entries.flatMap(e => e.emotions))).slice(0, 4);

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm">
            <h3 className="font-display font-semibold text-lg text-gray-900 mb-6">Insights</h3>

            {/* Mini Trendline */}
            <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3">Recent Trend</p>
                <div className="h-16 w-full relative pt-2">
                    {last7.length > 1 ? (
                        <svg viewBox="0 -5 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <polyline
                                fill="none"
                                stroke="#0f172a"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={points}
                            />
                            {last7.map((e, i) => {
                                const x = (i / (last7.length - 1)) * 100;
                                const y = 40 - ((e.mood / 10) * 40);
                                return <circle key={i} cx={x} cy={y} r="3" fill="#0f172a" />;
                            })}
                        </svg>
                    ) : (
                        <p className="text-xs text-gray-400">Log more to see trend</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Entries</p>
                    <p className="text-xl sm:text-2xl font-semibold text-gray-900">{entries.length}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Avg Mood</p>
                    <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                        {entries.length ? (entries.reduce((sum, e) => sum + e.mood, 0) / entries.length).toFixed(1) : '-'}
                    </p>
                </div>
            </div>

            <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">Top Emotions / Impacts</p>
                <div className="flex flex-wrap gap-2">
                    {recentEmotions.length ? recentEmotions.map(e => (
                        <span key={e} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">{e}</span>
                    )) : <span className="text-xs text-gray-400">No data</span>}
                </div>
            </div>
        </div>
    );
};
