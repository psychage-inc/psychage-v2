import React from 'react';
import { Link } from 'react-router-dom';
import { Info, LifeBuoy } from 'lucide-react';

/**
 * Standing educational + crisis-aware notice shown on every toolkit surface.
 *
 * SR-3 (non-diagnostic): the toolkit is framed as skills people use, never as a
 * statement that the reader has a condition.
 * SR-2 (crisis-aware): crisis resources are always one tap away so a toolkit that
 * could surface distress is never a dead end.
 */
const ToolkitDisclaimer: React.FC = () => (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <p className="flex items-start gap-2 text-sm text-text-secondary">
            <Info size={18} className="mt-0.5 shrink-0 text-text-tertiary" aria-hidden="true" />
            <span>Educational — skills people use, not a diagnosis.</span>
        </p>
        <Link
            to="/crisis"
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:underline dark:text-teal-400"
        >
            <LifeBuoy size={16} aria-hidden="true" />
            If things feel urgent, find crisis support
        </Link>
    </div>
);

export default ToolkitDisclaimer;
