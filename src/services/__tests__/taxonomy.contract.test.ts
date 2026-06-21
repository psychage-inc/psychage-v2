import { describe, it, expect, beforeAll } from 'vitest';
import type { Article } from '../../types/models';
import { loadAllArticles } from '../../data/articles/all-articles';
import {
    CANONICAL_CATEGORIES,
    CANONICAL_SLUGS,
    LEGACY_SLUG_ALIASES,
    resolveCanonicalSlug,
} from '../../config/taxonomy';

/**
 * Taxonomy contract guard.
 *
 * The Learn "0 articles" bug was caused by category slugs drifting apart across
 * sources, so the article↔category join returned nothing. These tests fail
 * loudly in CI if drift is reintroduced — a renamed slug, an orphan-tagged
 * article, or a category that silently loses all its content.
 *
 * Canonical categories that are intentionally empty (a real category with no
 * web articles yet) must be listed in ALLOWED_EMPTY so a NEW accidental empty
 * — the signature of a fresh drift — can never slip through unnoticed.
 */
// `eating-body` has only a stub in the TSX corpus. The next three categories own
// real content only in the Supabase corpus (the autonomous draft batch), not in the
// in-repo TSX articles this test loads — so they read as empty here while being fully
// populated + reachable at runtime via categoryService.getGrouped().
const ALLOWED_EMPTY = new Set<string>([
    'eating-body',
    'neurodivergence-adhd-autism',
    'sports-exercise-psychology',
    'financial-wellness',
]);

describe('taxonomy contract', () => {
    // Loading the full TSX corpus is heavy (one-time transform); do it once.
    let articles: Article[] = [];
    beforeAll(async () => {
        articles = await loadAllArticles();
    }, 120_000);

    it('canonical slugs are unique and every category has a group', () => {
        const slugs = CANONICAL_CATEGORIES.map((c) => c.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
        for (const c of CANONICAL_CATEGORIES) {
            expect(c.group, `${c.slug} is missing a group`).toBeTruthy();
        }
    });

    it('every legacy alias points at a canonical slug', () => {
        for (const [oldSlug, newSlug] of Object.entries(LEGACY_SLUG_ALIASES)) {
            expect(CANONICAL_SLUGS.has(newSlug), `${oldSlug} -> ${newSlug} is not canonical`).toBe(true);
        }
    });

    it('every article resolves to a canonical category slug', () => {
        const orphans = new Set<string>();
        for (const a of articles) {
            const slug = a.category?.slug;
            if (!slug) continue;
            if (!CANONICAL_SLUGS.has(resolveCanonicalSlug(slug))) orphans.add(slug);
        }
        expect([...orphans], 'articles tagged with non-canonical category slugs').toEqual([]);
    });

    it('every canonical category resolves to >=1 article (except known-empty)', () => {
        const counts = new Map<string, number>();
        for (const a of articles) {
            const slug = resolveCanonicalSlug(a.category?.slug ?? '');
            if (CANONICAL_SLUGS.has(slug)) counts.set(slug, (counts.get(slug) ?? 0) + 1);
        }

        const unexpectedlyEmpty = CANONICAL_CATEGORIES
            .map((c) => c.slug)
            .filter((slug) => (counts.get(slug) ?? 0) === 0 && !ALLOWED_EMPTY.has(slug));

        expect(unexpectedlyEmpty, 'canonical categories with zero articles (drift?)').toEqual([]);
    });
});
