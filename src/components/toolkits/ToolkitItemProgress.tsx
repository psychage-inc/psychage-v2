import React from 'react';
import { Check } from 'lucide-react';
import type { ItemProgress, SelfRating } from '@/services/toolkitProgressService';

/**
 * Compact, optional progress strip shown beneath an opened toolkit item:
 * a "mark done" toggle and an optional, low-stakes self-rating. Wording stays
 * gentle and non-evaluative — "a little" / "not yet", never pass/fail.
 */
const ToolkitItemProgress: React.FC<{
    progress: ItemProgress;
    onToggleDone: () => void;
    onRate: (rating: SelfRating) => void;
}> = ({ progress, onToggleDone, onRate }) => {
    const isDone = !!progress.completed_at;

    const ratingButton = (rating: SelfRating, label: string) => {
        const selected = progress.self_rating === rating;
        return (
            <button
                type="button"
                onClick={() => onRate(rating)}
                aria-pressed={selected}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                    selected
                        ? 'bg-teal-600 text-white'
                        : 'bg-surface-hover text-text-secondary hover:bg-border'
                }`}
            >
                {label}
            </button>
        );
    };

    return (
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface px-4 py-2">
            <button
                type="button"
                onClick={onToggleDone}
                aria-pressed={isDone}
                className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${
                    isDone ? 'text-teal-600 dark:text-teal-400' : 'text-text-secondary hover:text-text-primary'
                }`}
            >
                <span
                    className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                        isDone ? 'border-teal-600 bg-teal-600 text-white' : 'border-border'
                    }`}
                >
                    {isDone && <Check size={14} />}
                </span>
                {isDone ? 'Done' : 'Mark done'}
            </button>

            <div className="flex items-center gap-2">
                <span className="text-xs text-text-tertiary">Helpful?</span>
                {ratingButton('a_little', 'A little')}
                {ratingButton('not_yet', 'Not yet')}
            </div>
        </div>
    );
};

export default ToolkitItemProgress;
