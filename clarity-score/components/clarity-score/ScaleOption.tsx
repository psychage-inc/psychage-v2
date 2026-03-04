'use client';

interface ScaleOptionProps {
    label: string;
    index: number;
    selected: boolean;
    onClick: () => void;
}

export default function ScaleOption({ label, index, selected, onClick }: ScaleOptionProps) {
    return (
        <button
            onClick={onClick}
            role="radio"
            aria-checked={selected}
            className={`group relative flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${selected
                    ? 'border-teal bg-teal/10 shadow-[0_0_15px_rgba(13,148,136,0.15)]'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary`}
        >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${selected
                    ? 'border-teal bg-teal text-bg-primary'
                    : 'border-white/20 text-text-secondary group-hover:border-white/40'
                }`}>
                {index + 1}
            </div>
            <span className={`text-base font-medium transition-colors ${selected ? 'text-white' : 'text-text-primary'}`}>
                {label}
            </span>
        </button>
    );
}
