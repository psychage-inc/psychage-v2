import React from 'react';

interface ChipProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

const EMOTION_COLORS: Record<string, { bg: string; border: string; text: string }> = {
    Happy: { bg: 'bg-amber-400/20 backdrop-blur-sm', border: 'border-amber-300/40', text: 'text-amber-900' },
    Calm: { bg: 'bg-sky-400/20 backdrop-blur-sm', border: 'border-sky-300/40', text: 'text-sky-900' },
    Grateful: { bg: 'bg-rose-400/20 backdrop-blur-sm', border: 'border-rose-300/40', text: 'text-rose-900' },
    Excited: { bg: 'bg-orange-400/20 backdrop-blur-sm', border: 'border-orange-300/40', text: 'text-orange-900' },
    Proud: { bg: 'bg-violet-400/20 backdrop-blur-sm', border: 'border-violet-300/40', text: 'text-violet-900' },
    Relaxed: { bg: 'bg-emerald-400/20 backdrop-blur-sm', border: 'border-emerald-300/40', text: 'text-emerald-900' },
    Anxious: { bg: 'bg-yellow-400/20 backdrop-blur-sm', border: 'border-yellow-300/40', text: 'text-yellow-900' },
    Stressed: { bg: 'bg-red-400/20 backdrop-blur-sm', border: 'border-red-300/40', text: 'text-red-900' },
    Tired: { bg: 'bg-slate-400/20 backdrop-blur-sm', border: 'border-slate-300/40', text: 'text-slate-900' },
    Sad: { bg: 'bg-blue-400/20 backdrop-blur-sm', border: 'border-blue-300/40', text: 'text-blue-900' },
    Angry: { bg: 'bg-rose-500/20 backdrop-blur-sm', border: 'border-rose-400/40', text: 'text-rose-900' },
    Lonely: { bg: 'bg-purple-400/20 backdrop-blur-sm', border: 'border-purple-300/40', text: 'text-purple-900' },
};

const DEFAULT_COLOR = { bg: 'bg-gray-400/20 backdrop-blur-sm', border: 'border-gray-300/40', text: 'text-text-primary' };

export const Chip: React.FC<ChipProps> = ({ label, selected, onClick }) => {
    const color = EMOTION_COLORS[label] || DEFAULT_COLOR;

    return (
        <button
            onClick={onClick}
            aria-pressed={selected}
            className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-200
        ${selected
                    ? `${color.bg} ${color.text} border ${color.border} shadow-lg scale-105`
                    : 'bg-white/60 text-text-secondary hover:bg-white border border-white/40 shadow-sm hover:scale-[1.02]'
                } focus:outline-none focus:ring-2 focus:ring-gray-900/20`}
        >
            {label}
        </button>
    );
};
