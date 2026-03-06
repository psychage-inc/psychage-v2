import React from 'react';

interface ChipProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, selected, onClick }) => {
    return (
        <button
            onClick={onClick}
            aria-pressed={selected}
            className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-200 
        ${selected
                    ? 'bg-gray-900 text-white shadow-md scale-105'
                    : 'bg-white/60 text-gray-700 hover:bg-white border border-white/40 shadow-sm hover:scale-[1.02]'
                } focus:outline-none focus:ring-2 focus:ring-gray-900/20`}
        >
            {label}
        </button>
    );
};
