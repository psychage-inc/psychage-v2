import React from 'react';
import { cn } from '../../lib/utils';

/** Theme-aware skeleton primitive matching the Navigator's glass-morphism style. */
const NavSkeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div
        className={cn('animate-pulse rounded-md bg-surface-hover/50', className)}
        style={{
            backgroundImage:
                'linear-gradient(90deg, var(--navigator-glass-bg) 0%, var(--navigator-glass-border) 50%, var(--navigator-glass-bg) 100%)',
            backgroundSize: '200% 100%',
        }}
    />
);

/** Matches WelcomeScreen layout: icon + heading + paragraph + button. */
export const SkeletonWelcome: React.FC = () => (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Icon placeholder */}
        <NavSkeleton className="w-20 h-20 rounded-2xl mb-8" />

        {/* Heading lines */}
        <NavSkeleton className="h-10 w-3/4 rounded-lg mb-3" />
        <NavSkeleton className="h-10 w-1/2 rounded-lg mb-8" />

        {/* Paragraph lines */}
        <div className="space-y-2 w-full max-w-md mb-10">
            <NavSkeleton className="h-4 w-full rounded" />
            <NavSkeleton className="h-4 w-5/6 rounded" />
            <NavSkeleton className="h-4 w-3/4 rounded" />
        </div>

        {/* CTA button */}
        <NavSkeleton className="h-14 w-56 rounded-xl" />
    </div>
);

/** Matches DomainSelectionScreen: 4 cards in 2x2 grid. */
export const SkeletonDomainGrid: React.FC = () => (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
        <div className="mb-10 text-center">
            <NavSkeleton className="h-9 w-2/3 mx-auto rounded-lg mb-4" />
            <NavSkeleton className="h-5 w-1/2 mx-auto rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map(i => (
                <NavSkeleton key={i} className="h-32 rounded-2xl" />
            ))}
        </div>
    </div>
);

/** Matches SymptomSelectionScreen: search bar + 3 category blocks. */
export const SkeletonSymptomList: React.FC = () => (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
        <NavSkeleton className="h-12 w-full rounded-xl mb-6" />
        <div className="space-y-6">
            {[0, 1, 2].map(i => (
                <div key={i} className="space-y-3">
                    <NavSkeleton className="h-6 w-40 rounded" />
                    <div className="space-y-2">
                        {[0, 1, 2, 3].map(j => (
                            <NavSkeleton key={j} className="h-12 w-full rounded-xl" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

/** Matches DurationSeverityScreen: symptom card + question cards. */
export const SkeletonSymptomDetails: React.FC = () => (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
        <NavSkeleton className="h-9 w-2/3 rounded-lg mb-3" />
        <NavSkeleton className="h-5 w-1/2 rounded mb-6" />
        <NavSkeleton className="h-2 w-full rounded-full mb-8" />
        <NavSkeleton className="h-24 w-full rounded-2xl mb-6" />
        <div className="space-y-6">
            {[0, 1, 2].map(i => (
                <NavSkeleton key={i} className="h-32 w-full rounded-2xl" />
            ))}
        </div>
    </div>
);

/** Matches ResultCard layout. */
export const SkeletonResultCard: React.FC = () => (
    <div className="bg-surface/50 backdrop-blur-xl rounded-2xl p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
            <NavSkeleton className="h-7 w-48 rounded" />
            <div className="flex gap-1">
                {[0, 1, 2, 3].map(i => (
                    <NavSkeleton key={i} className="w-2.5 h-2.5 rounded-full" />
                ))}
            </div>
        </div>
        <NavSkeleton className="h-4 w-full rounded mb-2" />
        <NavSkeleton className="h-4 w-3/4 rounded" />
    </div>
);
