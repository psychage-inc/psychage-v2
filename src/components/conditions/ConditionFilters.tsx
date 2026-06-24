import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConditionFiltersProps {
    query: string;
    onQueryChange: (value: string) => void;
    families: string[];
    activeFamily: string | null;
    onFamilyChange: (family: string | null) => void;
    /** Visible result count, announced for screen readers. */
    resultCount: number;
}

/**
 * The calm, prominent search + ICD-11 family filter for the A–Z index.
 * Search filters by name and ICD-11 code; family chips narrow by ICD-11 grouping.
 */
const ConditionFilters: React.FC<ConditionFiltersProps> = ({
    query,
    onQueryChange,
    families,
    activeFamily,
    onFamilyChange,
    resultCount,
}) => {
    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative">
                <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary"
                    aria-hidden="true"
                />
                <input
                    type="search"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Search conditions by name or ICD-11 code…"
                    aria-label="Search conditions"
                    className={cn(
                        'w-full rounded-xl border border-border bg-surface py-3.5 pl-11 pr-11 text-base text-text-primary',
                        'placeholder:text-text-tertiary shadow-sm',
                        'focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                        'transition-colors duration-150 motion-reduce:transition-none',
                    )}
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => onQueryChange('')}
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-text-tertiary hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <X size={15} />
                    </button>
                )}
            </div>

            {/* Family filter */}
            <div
                role="group"
                aria-label="Filter by ICD-11 family"
                className="flex flex-wrap gap-2"
            >
                <FilterChip
                    label="All families"
                    active={activeFamily === null}
                    onClick={() => onFamilyChange(null)}
                />
                {families.map((family) => (
                    <FilterChip
                        key={family}
                        label={family}
                        active={activeFamily === family}
                        onClick={() => onFamilyChange(activeFamily === family ? null : family)}
                    />
                ))}
            </div>

            {/* SR-only live result summary */}
            <p className="sr-only" role="status" aria-live="polite">
                {resultCount} {resultCount === 1 ? 'condition' : 'conditions'} shown
            </p>
        </div>
    );
};

const FilterChip: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({
    label,
    active,
    onClick,
}) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={cn(
            'inline-flex min-h-[44px] items-center rounded-full border px-3.5 py-1.5 text-sm font-medium',
            'transition-colors duration-150 motion-reduce:transition-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background',
            active
                ? 'border-primary bg-primary text-white shadow-sm'
                : 'border-border bg-surface text-text-secondary hover:border-primary/40 hover:text-primary',
        )}
    >
        {label}
    </button>
);

export default ConditionFilters;
