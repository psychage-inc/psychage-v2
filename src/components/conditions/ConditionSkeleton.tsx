import React from 'react';
import { cn } from '@/lib/utils';

const Bar: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('animate-pulse rounded-md bg-surface-hover motion-reduce:animate-none', className)} />
);

const CardSkeleton: React.FC = () => (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <Bar className="mb-3 h-5 w-14 rounded-md" />
        <Bar className="h-6 w-3/4" />
        <Bar className="mt-auto h-3 w-1/2 pt-4" />
    </div>
);

/** Loading placeholder for the A–Z index — letter groups of card skeletons. */
const ConditionSkeleton: React.FC<{ groups?: number; perGroup?: number }> = ({
    groups = 3,
    perGroup = 4,
}) => (
    <div className="space-y-12" aria-hidden="true">
        {Array.from({ length: groups }).map((_, g) => (
            <div key={g}>
                <Bar className="mb-5 h-8 w-10" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: perGroup }).map((_, c) => (
                        <CardSkeleton key={c} />
                    ))}
                </div>
            </div>
        ))}
    </div>
);

export default ConditionSkeleton;
