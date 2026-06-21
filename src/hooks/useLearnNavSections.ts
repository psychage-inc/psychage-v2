import { useMemo } from 'react';
import { useAsyncData } from '@/hooks/useAsyncData';
import { categoryService } from '@/services/categoryService';
import { buildLearnSections, learnSections as fullLearnSections } from '@/config/navigation';
import type { NavSection } from '@/types/navigation';

/**
 * Learn mega-menu sections containing ONLY populated canonical categories.
 *
 * Reuses `categoryService.getGrouped()` (the live `articleCount > 0` filter) so the
 * nav menu, the `/learn` index, and the taxonomy contract all derive from one source
 * of truth and cannot drift. While loading or on error it returns the full canonical
 * set (the menu is closed by default and `getGrouped` resolves in tens of ms, so a
 * dead-link flash is effectively never visible; the full set is the safe superset).
 *
 * Read-only: it only reads article counts. It changes no article status, serving, or
 * gate logic.
 */
export function useLearnNavSections(): { sections: NavSection[]; loading: boolean } {
    const { data, loading, error } = useAsyncData(() => categoryService.getGrouped(), []);

    const sections = useMemo<NavSection[]>(
        () => (data ? buildLearnSections(data) : fullLearnSections),
        [data],
    );

    return { sections, loading: loading && !error };
}
