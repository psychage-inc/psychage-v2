import React, { useDeferredValue, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import SEO from '@/components/SEO';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { listConditions } from '@/services/conditionsService';
import type { Condition } from '@/types/condition';
import { CONDITION_DISCLAIMER } from '@/types/condition';
import { ICD11_GROUPINGS } from '@/data/conditions/groupings';
import AlphabetRail from '@/components/conditions/AlphabetRail';
import { useActiveLetter } from '@/components/conditions/useActiveLetter';
import ConditionFilters from '@/components/conditions/ConditionFilters';
import ConditionCard from '@/components/conditions/ConditionCard';
import ConditionSkeleton from '@/components/conditions/ConditionSkeleton';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/** First display letter for grouping (A–Z, else '#'). */
function letterOf(name: string): string {
    const ch = name.trim().charAt(0).toUpperCase();
    return /[A-Z]/.test(ch) ? ch : '#';
}

const ConditionsIndexPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const preview = searchParams.get('preview') === '1';
    const reducedMotion = useReducedMotion();

    const { data: conditions, loading } = useAsyncData<Condition[]>(
        () => listConditions({ includeUnverified: preview }),
        [preview],
    );
    const [query, setQuery] = useState('');
    const [activeFamily, setActiveFamily] = useState<string | null>(null);

    // Defer the filter input so typing stays smooth (sub-300ms perceived).
    const deferredQuery = useDeferredValue(query);

    // Families present in the data, ordered by the canonical ICD-11 chapter order.
    const families = useMemo(() => {
        if (!conditions) return [];
        const present = new Set(conditions.map((c) => c.icd11_grouping));
        return ICD11_GROUPINGS.filter((g) => present.has(g));
    }, [conditions]);

    const filtered = useMemo(() => {
        if (!conditions) return [];
        const q = deferredQuery.trim().toLowerCase();
        return conditions.filter((c) => {
            if (activeFamily && c.icd11_grouping !== activeFamily) return false;
            if (!q) return true;
            return (
                c.name.toLowerCase().includes(q) ||
                c.icd11_code.toLowerCase().includes(q)
            );
        });
    }, [conditions, deferredQuery, activeFamily]);

    // Group filtered conditions by first letter, each pre-sorted by name.
    const groups = useMemo(() => {
        const map = new Map<string, Condition[]>();
        for (const c of filtered) {
            const letter = letterOf(c.name);
            (map.get(letter) ?? map.set(letter, []).get(letter)!).push(c);
        }
        const order = [...ALPHABET, '#'];
        return order
            .filter((l) => map.has(l))
            .map((letter) => ({ letter, items: map.get(letter)! }));
    }, [filtered]);

    const enabledLetters = useMemo(() => new Set(groups.map((g) => g.letter)), [groups]);

    const handleJump = (letter: string) => {
        const el = document.getElementById(`cond-letter-${letter}`);
        if (el) {
            el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
            // Move focus to the heading for keyboard + screen-reader users.
            const heading = el.querySelector<HTMLElement>('[data-letter-heading]');
            heading?.focus();
        }
    };

    const isEmptyPublic = !loading && conditions !== null && conditions.length === 0;
    const isNoMatches = !loading && conditions !== null && conditions.length > 0 && filtered.length === 0;

    return (
        <>
            <SEO
                title="Conditions A–Z | Psychage"
                description="An evidence-informed, plain-language reference to mental health conditions, organised A–Z and by ICD-11 family."
                canonical="https://psychage.com/conditions"
                robots={preview ? 'noindex, nofollow' : undefined}
            />

            <main className="min-h-screen bg-background pb-24">
                <div className="mx-auto max-w-content px-5 sm:px-6">
                    {/* Header */}
                    <header className="pt-12 sm:pt-16">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accessible dark:text-teal-400">
                            Reference
                        </p>
                        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                            Conditions A–Z
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
                            A calm, plain-language guide to mental health conditions — organised
                            alphabetically and by ICD-11 family. {CONDITION_DISCLAIMER}
                        </p>
                        {preview && (
                            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
                                Preview — showing unverified conditions for review
                            </p>
                        )}
                    </header>

                    {/* Filters */}
                    <div className="mt-8 sm:mt-10">
                        {loading ? (
                            <div className="h-[3.25rem] w-full animate-pulse rounded-xl bg-surface-hover motion-reduce:animate-none" />
                        ) : (
                            <ConditionFilters
                                query={query}
                                onQueryChange={setQuery}
                                families={families}
                                activeFamily={activeFamily}
                                onFamilyChange={setActiveFamily}
                                resultCount={filtered.length}
                            />
                        )}
                    </div>

                    {/* Mobile sticky rail */}
                    {!loading && enabledLetters.size > 0 && (
                        <div className="sticky top-16 z-20 -mx-5 mt-6 border-y border-border/60 bg-background/90 px-3 py-2 backdrop-blur lg:hidden">
                            <AlphabetRail
                                letters={ALPHABET}
                                enabled={enabledLetters}
                                active={null}
                                onJump={handleJump}
                                orientation="horizontal"
                            />
                        </div>
                    )}

                    {/* Body: content + desktop rail */}
                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2.25rem]">
                        <div className="min-w-0">
                            {loading && <ConditionSkeleton />}

                            {isEmptyPublic && <PublicEmptyState />}

                            {isNoMatches && (
                                <NoMatchesState
                                    onReset={() => {
                                        setQuery('');
                                        setActiveFamily(null);
                                    }}
                                />
                            )}

                            {!loading && groups.length > 0 && (
                                <LetterGroups groups={groups} preview={preview} />
                            )}
                        </div>

                        {/* Desktop rail */}
                        {!loading && enabledLetters.size > 0 && (
                            <aside className="hidden lg:block">
                                <div className="sticky top-24">
                                    <AlphabetRailWithSpy
                                        letters={ALPHABET}
                                        enabled={enabledLetters}
                                        onJump={handleJump}
                                    />
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

/** The rendered letter sections. */
const LetterGroups: React.FC<{
    groups: { letter: string; items: Condition[] }[];
    preview: boolean;
}> = ({ groups, preview }) => (
    <div className="space-y-12">
        {groups.map(({ letter, items }) => (
            <section
                key={letter}
                id={`cond-letter-${letter}`}
                data-letter={letter}
                aria-labelledby={`cond-heading-${letter}`}
                className="scroll-mt-24"
            >
                <h2
                    id={`cond-heading-${letter}`}
                    data-letter-heading
                    tabIndex={-1}
                    className="mb-5 font-display text-2xl font-bold text-text-primary focus:outline-none sm:text-3xl"
                >
                    {letter}
                    <span className="sr-only"> — conditions starting with {letter}</span>
                </h2>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((c) => (
                        <li key={c.slug}>
                            <ConditionCard condition={c} preview={preview} />
                        </li>
                    ))}
                </ul>
            </section>
        ))}
    </div>
);

/**
 * Desktop rail wired to the scroll spy. Split out so the spy hook only runs when the
 * rail is actually mounted (desktop).
 */
const AlphabetRailWithSpy: React.FC<{
    letters: string[];
    enabled: Set<string>;
    onJump: (letter: string) => void;
}> = ({ letters, enabled, onJump }) => {
    const enabledList = useMemo(() => letters.filter((l) => enabled.has(l)), [letters, enabled]);
    const active = useActiveLetter(enabledList);
    return (
        <AlphabetRail
            letters={letters}
            enabled={enabled}
            active={active}
            onJump={onJump}
            orientation="vertical"
        />
    );
};

// Genuine 0-row state. The full ICD-11 taxonomy is always available (server view, with a
// draft-free local fallback), so this only appears if the list truly can't be loaded.
const PublicEmptyState: React.FC = () => (
    <div className="rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-16 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-primary dark:bg-teal-900/30">
            <Search size={22} aria-hidden="true" />
        </div>
        <h2 className="font-display text-xl font-semibold text-text-primary">
            We couldn’t load the conditions list
        </h2>
        <p className="mx-auto mt-2 max-w-md text-text-secondary">
            Something went wrong fetching the conditions reference. Please refresh the page
            or try again shortly.
        </p>
    </div>
);

const NoMatchesState: React.FC<{ onReset: () => void }> = ({ onReset }) => (
    <div className="rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-16 text-center">
        <h2 className="font-display text-xl font-semibold text-text-primary">No matches</h2>
        <p className="mx-auto mt-2 max-w-md text-text-secondary">
            Nothing matched your search or filter. Try a different term or clear the filters.
        </p>
        <button
            type="button"
            onClick={onReset}
            className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
        >
            Clear filters
        </button>
    </div>
);

export default ConditionsIndexPage;
