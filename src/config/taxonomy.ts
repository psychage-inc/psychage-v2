/**
 * TAXONOMY CONTRACT — single source of truth for the Learn category taxonomy.
 *
 * Frozen in Stage 0a. Every Learn surface (data layer, nav, category index,
 * condition directory) imports from here so slugs can never drift across
 * sources again. The canonical slug for a category is reused VERBATIM as:
 *   - the article `category.slug` tag (src/data/articles/<dir>/_shared.ts)
 *   - the Supabase `article_categories.slug`
 *   - the `categoryThemes` key (src/config/categoryThemes.ts)
 *   - the nav href (`/learn/<slug>`) and the `/learn/:categorySlug` route param
 *
 * Canonical list = the categories that own real published articles
 * (the 31 `category-*` / `eating-body` corpus dirs). Genuinely empty
 * categories are hidden at runtime by `categoryService.getGrouped()`, never
 * rendered as a broken "0 articles".
 *
 * To re-bucket a category or rename a group, edit THIS file only.
 */

import type { Category } from '../types/models';

// ── Top-level groups (book table-of-contents) ───────────────────────────────

export type TopGroupId = 'conditions-disorders' | 'behavior-wellness' | 'life-society';

export interface TopGroup {
    id: TopGroupId;
    title: string;
    description: string;
}

/** Ordered — drives the display order of the grouped Learn index. */
export const TOP_GROUPS: TopGroup[] = [
    {
        id: 'conditions-disorders',
        title: 'Conditions & Disorders',
        description: 'Understanding specific mental health conditions, what they feel like, and paths to support.',
    },
    {
        id: 'behavior-wellness',
        title: 'Behavior & Wellness',
        description: 'Everyday skills, habits, and the mind–body foundations of mental wellbeing.',
    },
    {
        id: 'life-society',
        title: 'Life & Society',
        description: 'Relationships, work, identity, culture, and the wider context of mental health.',
    },
];

// ── Canonical category list ─────────────────────────────────────────────────

export interface CanonicalCategory {
    /** Canonical slug == id. kebab-case. Matches the article `_shared.ts` slug. */
    slug: string;
    /** Display name, taken verbatim from the article `_shared.ts` category. */
    name: string;
    group: TopGroupId;
}

/**
 * The 31 categories that own real article content. Names mirror the
 * corpus `_shared.ts` definitions exactly. Order within each group is the
 * intended reading order for the grouped index.
 */
export const CANONICAL_CATEGORIES: CanonicalCategory[] = [
    // ── Conditions & Disorders ──────────────────────────────────────────────
    { slug: 'anxiety-stress', name: 'Anxiety, Stress & Overwhelm', group: 'conditions-disorders' },
    { slug: 'depression-grief', name: 'Depression, Grief & Loss', group: 'conditions-disorders' },
    { slug: 'trauma-healing', name: 'Trauma-Informed Education & Healing', group: 'conditions-disorders' },
    { slug: 'mental-health-conditions', name: 'Understanding Mental Health Conditions', group: 'conditions-disorders' },
    { slug: 'psychosis-schizophrenia', name: 'Psychosis, Schizophrenia & Severe Mental Illness', group: 'conditions-disorders' },
    { slug: 'neurodivergence-adhd-autism', name: 'Neurodivergence, ADHD & Autism Spectrum', group: 'conditions-disorders' },
    { slug: 'eating-body', name: 'Eating & Body', group: 'conditions-disorders' },
    { slug: 'chronic-illness-pain', name: 'Chronic Illness, Pain & Medical Psychology', group: 'conditions-disorders' },
    { slug: 'aging-dementia-late-life', name: 'Aging, Dementia & Late-Life Mental Health', group: 'conditions-disorders' },

    // ── Behavior & Wellness ─────────────────────────────────────────────────
    { slug: 'emotional-regulation', name: 'Emotional Regulation & Self-Awareness', group: 'behavior-wellness' },
    { slug: 'habits-behavior-change', name: 'Habits, Motivation & Behavior Change', group: 'behavior-wellness' },
    { slug: 'sleep-body-connection', name: 'Sleep, Body & Mind-Body Connection', group: 'behavior-wellness' },
    { slug: 'self-worth-identity', name: 'Self-Worth, Confidence & Identity', group: 'behavior-wellness' },
    { slug: 'therapy-navigation', name: 'Therapy, Treatment & Mental Health Navigation', group: 'behavior-wellness' },
    { slug: 'brain-neuroscience', name: 'The Brain & Neuroscience of Mental Health', group: 'behavior-wellness' },
    { slug: 'creativity-therapeutic-arts', name: 'Creativity, Therapeutic Arts & Expressive Healing', group: 'behavior-wellness' },
    { slug: 'life-skills-practical-psychology', name: 'Applied Life Skills, Self-Design & Practical Psychology', group: 'behavior-wellness' },
    { slug: 'sports-exercise-psychology', name: 'Sports, Exercise & Movement Psychology', group: 'behavior-wellness' },

    // ── Life & Society ──────────────────────────────────────────────────────
    { slug: 'relationships-communication', name: 'Relationships & Communication', group: 'life-society' },
    { slug: 'work-productivity', name: 'Work, Productivity & Burnout', group: 'life-society' },
    { slug: 'family-parenting', name: 'Family, Parenting & Childhood Patterns', group: 'life-society' },
    { slug: 'loneliness-connection', name: 'Loneliness, Social Connection & Belonging', group: 'life-society' },
    { slug: 'digital-life', name: 'Digital Life, Social Media & Modern Stressors', group: 'life-society' },
    { slug: 'technology-digital-life', name: 'Technology, Digital Life & Mental Health', group: 'life-society' },
    { slug: 'cultural-global', name: 'Cultural Perspectives, Inclusion & Global Wellness', group: 'life-society' },
    { slug: 'womens-mental-health', name: "Women's Mental Health", group: 'life-society' },
    { slug: 'mens-mental-health', name: "Men's Mental Health", group: 'life-society' },
    { slug: 'sexuality-intimacy', name: 'Sexuality, Intimacy & Sexual Health', group: 'life-society' },
    { slug: 'disability-accessibility', name: 'Disability, Accessibility & Inclusive Mental Health', group: 'life-society' },
    { slug: 'forensic-legal-justice', name: 'Forensic Psychology, Legal & Justice Systems', group: 'life-society' },
    { slug: 'military-veterans-firstresponder', name: 'Military, Veterans & First Responder Mental Health', group: 'life-society' },
    { slug: 'environmental-eco-psychology', name: 'Environmental, Eco-Psychology & Planetary Mental Health', group: 'life-society' },
    { slug: 'spirituality-meaning', name: 'Spirituality, Meaning & Existential Mental Health', group: 'life-society' },
    { slug: 'financial-wellness', name: 'Financial Wellness & Economic Mental Health', group: 'life-society' },
];

/**
 * Old (pre-rename) Supabase / nav slugs → canonical slug. Used by the data
 * migration to rename rows, and by the category page to redirect stale inbound
 * links (bookmarks, the mobile app, external sites) to the canonical URL.
 * Old slugs with no canonical successor (retired clinical buckets) are absent
 * and resolve to nothing.
 */
export const LEGACY_SLUG_ALIASES: Record<string, string> = {
    'depression-mood': 'depression-grief',
    'relationships-social': 'relationships-communication',
    'trauma-ptsd': 'trauma-healing',
    'sleep-circadian': 'sleep-body-connection',
    'self-esteem-identity': 'self-worth-identity',
    'workplace-academic': 'work-productivity',
    'global-cultural': 'cultural-global',
    'therapy-treatment': 'therapy-navigation',
    // Near-duplicate of chronic-illness-pain; merged (articles re-tagged in the reconcile migration).
    'chronic-illness-disability': 'chronic-illness-pain',
};

// ── Derived lookups + frozen runtime shapes ─────────────────────────────────

export const CANONICAL_SLUGS: ReadonlySet<string> = new Set(
    CANONICAL_CATEGORIES.map((c) => c.slug),
);

const SLUG_TO_GROUP: ReadonlyMap<string, TopGroupId> = new Map(
    CANONICAL_CATEGORIES.map((c) => [c.slug, c.group]),
);

/** Canonical slug for any slug — resolves a legacy alias, else returns input. */
export function resolveCanonicalSlug(slug: string): string {
    if (CANONICAL_SLUGS.has(slug)) return slug;
    return LEGACY_SLUG_ALIASES[slug] ?? slug;
}

/** The top-level group a category belongs to, or undefined if not canonical. */
export function groupForSlug(slug: string): TopGroupId | undefined {
    return SLUG_TO_GROUP.get(resolveCanonicalSlug(slug));
}

export function isCanonicalSlug(slug: string): boolean {
    return CANONICAL_SLUGS.has(slug);
}

/** A category augmented with its live article count, for grouped rendering. */
export type CategoryWithCount = Category & { articleCount: number };

/** The frozen return shape of `categoryService.getGrouped()`. */
export interface CategoryGroup {
    id: TopGroupId;
    title: string;
    description: string;
    categories: CategoryWithCount[];
}
