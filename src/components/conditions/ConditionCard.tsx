import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Condition } from '@/types/condition';
import { hasDefinition } from '@/types/condition';

interface ConditionCardProps {
    condition: Condition;
    /** Preserve preview mode when navigating to the condition page. */
    preview?: boolean;
}

/**
 * A refined glossary card: condition name (Fraunces), ICD-11 family label (teal),
 * and the ICD-11 code chip. Calm, generous, and link-wrapped for the whole surface.
 */
const ConditionCard: React.FC<ConditionCardProps> = ({ condition, preview }) => {
    const to = `/conditions/${condition.slug}${preview ? '?preview=1' : ''}`;
    const inReview = !hasDefinition(condition);

    return (
        <Link
            to={to}
            className={cn(
                'group flex h-full flex-col rounded-2xl border border-border bg-surface p-5',
                'shadow-sm transition-all duration-200 motion-reduce:transition-none',
                'hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md motion-reduce:hover:translate-y-0',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            )}
        >
            <div className="mb-3 flex items-center gap-2">
                <span className="rounded-md bg-teal-50 px-2 py-0.5 font-mono text-xs font-semibold text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                    {condition.icd11_code}
                </span>
                {inReview && (
                    <span className="text-xs font-medium text-text-tertiary">In review</span>
                )}
            </div>

            <h3 className="font-display text-lg font-semibold leading-snug text-text-primary transition-colors group-hover:text-primary motion-reduce:transition-none">
                {condition.name}
            </h3>

            <p className="mt-auto pt-4 text-xs font-medium uppercase tracking-wide text-brand-accessible dark:text-teal-400">
                {condition.icd11_grouping}
            </p>
        </Link>
    );
};

export default ConditionCard;
