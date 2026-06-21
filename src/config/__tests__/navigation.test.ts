import { describe, it, expect } from 'vitest';
import { buildLearnSections, learnSections, LEARN_NAV_ICONS } from '../navigation';
import { CANONICAL_CATEGORIES } from '../taxonomy';
import type { CategoryGroup, CategoryWithCount } from '../taxonomy';

/**
 * Learn mega-menu guard.
 *
 * The nav menu must surface ONLY populated categories — an empty category in the
 * Learn dropdown is a dead "Articles Coming Soon" link straight from the primary
 * nav. `buildLearnSections` is the single transform that produces the menu; these
 * tests lock its zero-dead-links and icon-coverage invariants.
 */

const cat = (slug: string, name: string, articleCount: number): CategoryWithCount =>
    ({
        id: slug,
        slug,
        name,
        description: '',
        icon: null,
        articleCount,
    }) as unknown as CategoryWithCount;

const groups: CategoryGroup[] = [
    {
        id: 'conditions-disorders',
        title: 'Conditions & Disorders',
        description: '',
        categories: [cat('anxiety-stress', 'Anxiety', 82), cat('eating-body', 'Eating', 0)],
    },
    {
        id: 'behavior-wellness',
        title: 'Behavior & Wellness',
        description: '',
        categories: [cat('brain-neuroscience', 'Brain', 0)],
    },
    {
        id: 'life-society',
        title: 'Life & Society',
        description: '',
        categories: [cat('digital-life', 'Digital Life', 50)],
    },
];

describe('buildLearnSections', () => {
    const sections = buildLearnSections(groups);

    it('keeps the Browse section first and verbatim', () => {
        expect(sections[0].title).toBe('Browse');
        expect(sections[0].items[0].href).toBe('/learn');
    });

    it('emits no category with zero articles (no dead links)', () => {
        const slugs = sections.flatMap((s) => s.items.map((i) => i.id));
        expect(slugs).toContain('anxiety-stress');
        expect(slugs).toContain('digital-life');
        expect(slugs).not.toContain('eating-body');
        expect(slugs).not.toContain('brain-neuroscience');
    });

    it('drops a group whose categories are all empty', () => {
        expect(sections.map((s) => s.title)).not.toContain('Behavior & Wellness');
    });

    it('links every category to /learn/:slug with a non-empty icon key', () => {
        for (const section of sections) {
            for (const item of section.items) {
                if (item.id === 'browse-all') continue;
                expect(item.href).toBe(`/learn/${item.id}`);
                expect(item.icon).toBeTruthy();
            }
        }
    });
});

describe('Learn nav icons', () => {
    it('every canonical category has a LEARN_NAV_ICONS entry (no silent default)', () => {
        const missing = CANONICAL_CATEGORIES.filter((c) => !(c.slug in LEARN_NAV_ICONS)).map(
            (c) => c.slug,
        );
        expect(missing, 'canonical categories missing a LEARN_NAV_ICONS entry').toEqual([]);
    });

    it('full static learnSections also routes every category to /learn/:slug', () => {
        for (const section of learnSections) {
            for (const item of section.items) {
                if (item.id === 'browse-all') continue;
                expect(item.href).toBe(`/learn/${item.id}`);
            }
        }
    });
});
