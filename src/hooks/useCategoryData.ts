import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services/categoryService';
import {
    resolveCanonicalSlug,
    type CategoryGroup,
    type CategoryWithCount,
} from '@/config/taxonomy';

/**
 * Shared category selector for every mobile screen (Browse, Category, Search,
 * Home) and, in Wave 2, Conditions A–Z. Wraps the single source of truth —
 * `categoryService.getGrouped()` over `src/config/taxonomy.ts` — and does NOT
 * fork it. Zero-article categories are already dropped by the service.
 *
 * Cached via react-query (the app already provides a `QueryClientProvider`),
 * with a 5-minute `staleTime` to match the service's in-memory TTL.
 */
export interface UseCategoryData {
    /** The three top-level groups, each with its populated categories + counts. */
    groups: CategoryGroup[];
    /** Flattened list of every populated category across all groups. */
    categories: CategoryWithCount[];
    /** Resolve a (possibly legacy) slug to its category, or undefined. */
    bySlug: (slug: string) => CategoryWithCount | undefined;
    isLoading: boolean;
    error: Error | null;
}

export function useCategoryData(): UseCategoryData {
    const { data, isLoading, error } = useQuery({
        queryKey: ['categories', 'grouped'],
        queryFn: () => categoryService.getGrouped(),
        staleTime: 5 * 60 * 1000,
    });

    const groups = useMemo<CategoryGroup[]>(() => data ?? [], [data]);

    const categories = useMemo<CategoryWithCount[]>(
        () => groups.flatMap((g) => g.categories),
        [groups],
    );

    const bySlugMap = useMemo(() => {
        const map = new Map<string, CategoryWithCount>();
        for (const c of categories) map.set(c.slug, c);
        return map;
    }, [categories]);

    const bySlug = useMemo(
        () => (slug: string) => bySlugMap.get(resolveCanonicalSlug(slug)),
        [bySlugMap],
    );

    return { groups, categories, bySlug, isLoading, error: (error as Error) ?? null };
}
