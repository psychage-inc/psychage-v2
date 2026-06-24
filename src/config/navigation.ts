import type { NavigationConfig, NavMegaMenu, NavLink, NavSection } from '../types/navigation';
import { CANONICAL_CATEGORIES, TOP_GROUPS, type CategoryGroup } from './taxonomy';

/**
 * Comprehensive Navigation Configuration
 *
 * Single source of truth for all navigation items across the application.
 * Items are automatically filtered based on permissions, roles, and feature flags.
 */

// ── Learn menu, generated from the taxonomy contract ────────────────────────
// The Learn mega-menu (desktop + mobile hamburger) is built from
// src/config/taxonomy.ts so it always exposes the FULL canonical category set
// on the canonical slugs — never a stale, hardcoded subset on renamed slugs.

/** Decorative icon per category slug (keys map to NavMenu's iconMap; unknown → default). */
export const LEARN_NAV_ICONS: Record<string, string> = {
    'anxiety-stress': 'brain',
    'depression-grief': 'cloud',
    'trauma-healing': 'shield-check',
    'mental-health-conditions': 'stethoscope',
    'psychosis-schizophrenia': 'brain',
    'neurodivergence-adhd-autism': 'brain',
    'eating-body': 'apple',
    'chronic-illness-pain': 'heart-pulse',
    'aging-dementia-late-life': 'compass',
    'emotional-regulation': 'heart',
    'habits-behavior-change': 'target',
    'sleep-body-connection': 'moon',
    'self-worth-identity': 'star',
    'therapy-navigation': 'message-circle',
    'brain-neuroscience': 'brain',
    'creativity-therapeutic-arts': 'edit',
    'life-skills-practical-psychology': 'target',
    'sports-exercise-psychology': 'heart-pulse',
    'relationships-communication': 'users',
    'work-productivity': 'briefcase',
    'family-parenting': 'home',
    'loneliness-connection': 'user-plus',
    'digital-life': 'smartphone',
    'technology-digital-life': 'smartphone',
    'cultural-global': 'globe',
    'womens-mental-health': 'heart',
    'mens-mental-health': 'shield-check',
    'sexuality-intimacy': 'heart',
    'disability-accessibility': 'users',
    'forensic-legal-justice': 'shield-check',
    'military-veterans-firstresponder': 'shield-check',
    'environmental-eco-psychology': 'leaf',
    'spirituality-meaning': 'compass',
    'financial-wellness': 'briefcase',
};

/** Static "Browse" section, shared by the full and populated-only Learn menus. */
const browseSection: NavSection = {
    title: 'Browse',
    items: [
        {
            id: 'browse-all',
            label: 'Browse All Articles',
            description: 'Explore our complete library',
            href: '/learn',
            icon: 'library',
        },
        {
            id: 'browse-by-topic',
            label: 'Browse by Topic',
            description: 'All topics, grouped by area',
            href: '/learn/topics',
            icon: 'layout-grid',
        },
    ],
};

/**
 * Full canonical Learn menu (all 31 categories). Used as the static default on the
 * nav item and as the loading/error fallback for the data-driven populated menu.
 */
export const learnSections: NavSection[] = [
    browseSection,
    ...TOP_GROUPS.map((group) => ({
        title: group.title,
        items: CANONICAL_CATEGORIES.filter((c) => c.group === group.id).map((c) => ({
            id: c.slug,
            label: c.name,
            href: `/learn/${c.slug}`,
            icon: LEARN_NAV_ICONS[c.slug] ?? 'default',
        })),
    })),
];

/**
 * Build Learn mega-menu sections from populated category groups (the
 * `categoryService.getGrouped()` result). Keeps the "Browse" section verbatim,
 * emits only categories with `articleCount > 0` (so the menu can never render a
 * dead "0 articles" link), drops any section left empty, and reuses the same icon
 * map + `default` fallback as the static menu so icons stay identical. Pure: no
 * fetching, no article-status logic — it only reshapes an already-counted list.
 */
export function buildLearnSections(groups: CategoryGroup[]): NavSection[] {
    return [
        browseSection,
        ...groups
            .map((group) => ({
                title: group.title,
                items: group.categories
                    .filter((c) => c.articleCount > 0)
                    .map((c) => ({
                        id: c.slug,
                        label: c.name,
                        href: `/learn/${c.slug}`,
                        icon: LEARN_NAV_ICONS[c.slug] ?? 'default',
                    })),
            }))
            .filter((section) => section.items.length > 0),
    ];
}

export const navigationConfig: NavigationConfig = {
    // PRIMARY NAVIGATION (Desktop navbar, top-level items)
    primary: [
        // Learn mega menu — Browse + the 3 taxonomy groups, full canonical set
        {
            id: 'learn',
            label: 'Learn',
            type: 'mega-menu',
            sections: learnSections,
            quickActions: [
                { label: 'Browse All Articles', href: '/learn' },
                { label: 'Most Popular', href: '/learn?sort=popular' },
                { label: 'Recently Added', href: '/learn?sort=recent' },
                {
                    label: 'Symptom Navigator',
                    href: '/tools/symptom-navigator'
                }
            ]
        } as NavMegaMenu,

        // Tools mega menu (existing, enhanced with feature flags)
        {
            id: 'tools',
            label: 'Tools',
            type: 'mega-menu',
            sections: [
                {
                    title: 'Assessments',
                    items: [
                        {
                            id: 'clarity',
                            label: 'Clarity Score',
                            description: 'Cognitive assessment',
                            href: '/clarity-score',
                            icon: 'chart',
                            cta: 'Take Assessment',
                            requiredFeatureFlag: 'VITE_ENABLE_CLARITY_SCORE'
                        },
                        {
                            id: 'symptom-navigator',
                            label: 'Symptom Navigator',
                            description: 'Interactive symptom checker',
                            href: '/tools/symptom-navigator',
                            icon: 'brain',
                            cta: 'Start Navigation'
                        },
                        {
                            id: 'relationship-health',
                            label: 'Relationship Health',
                            description: 'Relationship quality check',
                            href: '/tools/relationship-health',
                            icon: 'heart-handshake',
                            cta: 'Take Assessment'
                        }
                    ]
                },
                {
                    title: 'Daily Tools',
                    items: [
                        {
                            id: 'mood',
                            label: 'Mood Journal',
                            description: 'Track patterns & triggers',
                            href: '/tools/mood-journal',
                            icon: 'edit',
                            requiredFeatureFlag: 'VITE_ENABLE_MOOD_JOURNAL'
                        },
                        {
                            id: 'sleep',
                            label: 'Sleep Architect',
                            description: 'Optimize your sleep',
                            href: '/tools/sleep-architect',
                            icon: 'moon',
                            requiredFeatureFlag: 'VITE_ENABLE_SLEEP_TRACKER'
                        },
                        {
                            id: 'mindmate',
                            label: 'Psychage AI',
                            description: 'AI mental health companion',
                            href: '/tools/mindmate',
                            icon: 'brain',
                            cta: 'Chat Now',
                            requiredFeatureFlag: 'VITE_ENABLE_AI_CHAT'
                        },
                        {
                            id: 'clarity-journal',
                            label: 'Clarity Journal',
                            description: 'Structured journaling & tracking',
                            href: '/tools/clarity-journal',
                            icon: 'notebook-pen'
                        },
                        {
                            id: 'medication-tracker',
                            label: 'Medication Tracker',
                            description: 'Track doses & adherence',
                            href: '/tools/medication-tracker',
                            icon: 'pill',
                            requiredFeatureFlag: 'VITE_ENABLE_MEDICATION_TRACKER'
                        }
                    ]
                }
            ],
            quickActions: [
                { label: 'All Tools', href: '/tools' },
                {
                    label: 'Clarity Score',
                    href: '/clarity-score',
                    requiredFeatureFlag: 'VITE_ENABLE_CLARITY_SCORE'
                },
                {
                    label: 'Symptom Navigator',
                    href: '/tools/symptom-navigator'
                },
                {
                    label: 'Psychage AI',
                    href: '/tools/mindmate',
                    requiredFeatureFlag: 'VITE_ENABLE_AI_CHAT'
                },
                {
                    label: 'Mood Journal',
                    href: '/tools/mood-journal',
                    requiredFeatureFlag: 'VITE_ENABLE_MOOD_JOURNAL'
                }
            ]
        } as NavMegaMenu,

        // Find Care — always visible (directory is live with 423K providers)
        {
            id: 'providers',
            label: 'Find Care',
            type: 'link',
            href: '/providers',
        } as NavLink,

        // Conditions A–Z — standalone reference (separate from the Learn categories)
        {
            id: 'conditions',
            label: 'Conditions',
            type: 'link',
            href: '/conditions',
        } as NavLink,

    ],

    // SECONDARY NAVIGATION (Utility items in top-right)
    secondary: [
        {
            id: 'crisis',
            label: 'Crisis Support',
            type: 'link',
            href: '/crisis',
            className: 'text-red-600 bg-red-50 hover:bg-red-100 border border-red-100'
        } as NavLink
    ],

    // DASHBOARD NAVIGATION (Role-specific dashboard links)
    dashboard: [
        {
            id: 'patient-dashboard',
            label: 'Dashboard',
            type: 'link',
            href: '/dashboard',
            allowedRoles: ['patient', 'admin'],
            requiredAuth: true,
            showOnlyWhenAuthenticated: true
        } as NavLink,
        {
            id: 'provider-dashboard',
            label: 'Dashboard',
            type: 'link',
            href: '/provider',
            allowedRoles: ['provider', 'admin'],
            requiredAuth: true,
            showOnlyWhenAuthenticated: true
        } as NavLink,
        {
            id: 'admin-dashboard',
            label: 'Admin',
            type: 'link',
            href: '/admin',
            allowedRoles: ['admin'],
            requiredAuth: true,
            showOnlyWhenAuthenticated: true
        } as NavLink
    ],

    // AUTH NAVIGATION (Login/Signup buttons)
    auth: [
        {
            id: 'login',
            label: 'Sign In',
            type: 'link',
            href: '/login',
            hideWhenAuthenticated: true
        } as NavLink,
        {
            id: 'signup',
            label: 'Get Started',
            type: 'link',
            href: '/signup',
            hideWhenAuthenticated: true,
            className: 'bg-teal-600 hover:bg-teal-700 text-white'
        } as NavLink
    ]
};

/**
 * LEGACY EXPORT (for backward compatibility with existing NavMenu component)
 * This will be removed once all components are updated to use the new structure.
 */
export const legacyNavigationConfig = {
    learn: navigationConfig.primary.find(item => item.id === 'learn')!,
    tools: navigationConfig.primary.find(item => item.id === 'tools')!,
};
