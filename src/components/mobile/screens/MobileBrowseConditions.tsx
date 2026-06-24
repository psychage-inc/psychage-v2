import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import { listConditions } from '@/services/conditionsService';
import { ICD11_GROUPINGS } from '@/data/conditions/groupings';
import type { Condition } from '@/types/condition';

/**
 * "Learn about conditions" — the conditions index that sits AFTER the category grid
 * on the mobile Learn tab (`/learn` → MobileBrowse). A plain-language, navigational
 * way into all ICD-11 Chapter 6 conditions, grouped by family in `<details>` accordions.
 *
 * Self-contained (own fetch + grouping + UI) so MobileBrowse stays thin. Reuses the
 * shared `listConditions()` reader — it never re-authors or re-fetches anything else.
 *
 * Clinical gate: `listConditions()` reads the anon-safe public masking view, and we
 * additionally surface ONLY `verification_status === 'verified'` rows. So no unreviewed
 * clinical definition is ever linked, and a row that is later un-verified simply drops
 * out — the section never renders a dead husk. If nothing is verified (or the DB is
 * unreachable and the draft-free taxonomy comes back unverified), the section renders
 * nothing at all rather than an empty shell.
 */
const MobileBrowseConditions: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['conditions', 'mobile-index'],
        queryFn: () => listConditions(),
        staleTime: 5 * 60 * 1000,
    });

    const families = useMemo<{ grouping: string; conditions: Condition[] }[]>(() => {
        const verified = (data ?? []).filter((c) => c.verification_status === 'verified');
        const byFamily = new Map<string, Condition[]>();
        for (const condition of verified) {
            const bucket = byFamily.get(condition.icd11_grouping);
            if (bucket) bucket.push(condition);
            else byFamily.set(condition.icd11_grouping, [condition]);
        }
        const sortByName = (a: Condition, b: Condition) => a.name.localeCompare(b.name);

        // Families in ICD-11 chapter order; any unknown family is appended, not dropped.
        const ordered: { grouping: string; conditions: Condition[] }[] = [];
        for (const grouping of ICD11_GROUPINGS) {
            const bucket = byFamily.get(grouping);
            if (bucket && bucket.length > 0) {
                ordered.push({ grouping, conditions: [...bucket].sort(sortByName) });
                byFamily.delete(grouping);
            }
        }
        for (const [grouping, bucket] of byFamily) {
            if (bucket.length > 0) {
                ordered.push({ grouping, conditions: [...bucket].sort(sortByName) });
            }
        }
        return ordered;
    }, [data]);

    // Nothing verified (or DB unreachable → unverified taxonomy fallback): render no shell.
    if (!isLoading && families.length === 0) return null;

    return (
        <section className="mt-10">
            <p className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                Conditions
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-text-primary">
                Learn about conditions
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
                Plain-language guides to mental-health conditions, grouped by family.
            </p>

            {isLoading ? (
                <div className="mt-6 space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-12 animate-pulse rounded-xl bg-surface-hover"
                        />
                    ))}
                </div>
            ) : (
                <div className="mt-6">
                    {families.map(({ grouping, conditions }) => (
                        <details
                            key={grouping}
                            className="group border-b border-border"
                        >
                            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
                                <span>{grouping}</span>
                                <span className="flex shrink-0 items-center gap-2">
                                    <span className="text-xs font-normal text-text-tertiary">
                                        {conditions.length}
                                    </span>
                                    <ChevronDown
                                        size={16}
                                        className="text-text-tertiary transition-transform group-open:rotate-180"
                                        aria-hidden
                                    />
                                </span>
                            </summary>
                            <ul className="pb-2">
                                {conditions.map((condition) => (
                                    <li key={condition.slug}>
                                        <Link
                                            to={`/conditions/${condition.slug}`}
                                            className="flex min-h-[44px] items-center justify-between gap-3 rounded-lg px-2 text-sm transition-colors hover:bg-surface-hover active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                        >
                                            <span className="text-text-primary">
                                                {condition.name}
                                            </span>
                                            <span className="shrink-0 text-xs text-text-tertiary">
                                                {condition.icd11_code}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    ))}
                </div>
            )}
        </section>
    );
};

export default MobileBrowseConditions;
