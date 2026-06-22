import React from 'react';
import { Link } from 'react-router-dom';
import * as Tabs from '@radix-ui/react-tabs';
import { Search } from 'lucide-react';
import { useCategoryData } from '@/hooks/useCategoryData';
import {
    CategoryCard,
    CategoryCardSkeleton,
} from '@/components/mobile/cards/CategoryCard';

/**
 * Mobile Browse — the canonical topic index (route `/learn`). Lists every
 * populated category, grouped by the three top-level groups, behind a
 * persistent segmented switcher so any topic is reachable in two taps.
 *
 * Consumes the foundation's `useCategoryData` (single source of truth — already
 * drops zero-article categories) and the shared `CategoryCard`; it never
 * re-fetches or re-authors them. Editorial rails live on Home, not here.
 */
const MobileBrowse: React.FC = () => {
    const { groups, isLoading, error } = useCategoryData();

    return (
        <div className="px-4 py-6">
            <header>
                <p className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                    Learn
                </p>
                <h1 className="mt-1 font-display text-2xl font-semibold text-text-primary">
                    Browse
                </h1>
                <p className="mt-2 text-sm text-text-secondary">
                    Find any topic across mental health.
                </p>
            </header>

            <Link
                to="/search"
                aria-label="Search topics"
                className="mt-5 flex min-h-[44px] w-full items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-text-tertiary transition-colors hover:border-border-hover active:scale-[0.99]"
            >
                <Search size={18} className="shrink-0" aria-hidden />
                <span>Search topics…</span>
            </Link>

            {isLoading ? (
                <div className="mt-6 grid grid-cols-2 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <CategoryCardSkeleton key={i} />
                    ))}
                </div>
            ) : error ? (
                <p className="mt-6 text-sm text-text-secondary">
                    We couldn’t load topics right now. Please try again in a moment.
                </p>
            ) : (
                <Tabs.Root defaultValue={groups[0]?.id} className="mt-6">
                    <Tabs.List
                        aria-label="Topic groups"
                        className="flex items-stretch gap-1 rounded-2xl bg-surface-hover p-1"
                    >
                        {groups.map((group) => (
                            <Tabs.Trigger
                                key={group.id}
                                value={group.id}
                                className="flex flex-1 items-center justify-center rounded-xl px-2 py-2 text-center text-xs font-medium leading-tight text-text-tertiary transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary data-[state=active]:bg-background data-[state=active]:text-text-primary data-[state=active]:shadow-sm"
                            >
                                {group.title}
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>

                    {groups.map((group) => (
                        <Tabs.Content
                            key={group.id}
                            value={group.id}
                            className="pt-5 focus:outline-none"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {group.categories.map((category) => (
                                    <CategoryCard key={category.id} category={category} />
                                ))}
                            </div>
                        </Tabs.Content>
                    ))}
                </Tabs.Root>
            )}
        </div>
    );
};

export default MobileBrowse;
