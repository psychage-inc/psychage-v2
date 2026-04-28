/**
 * Launch readiness smoke test (LB-007).
 *
 * Goal: catch the cheap regressions that ship a white screen — broken lazy
 * import paths, missing default exports, syntax errors in any public-route
 * module. We do not deep-render here; full route rendering would require
 * mocking Supabase, Three.js, Lottie, and every analytics surface, which
 * adds maintenance cost without proportionate launch-blocker value.
 *
 * The route table mirrors `src/App.tsx`. Drift between the two is itself
 * a finding — if you add a public route there, add it here.
 */

import { describe, it, expect } from 'vitest';

interface PublicRouteFixture {
    path: string;
    label: string;
    load: () => Promise<{ default?: unknown }>;
}

const PUBLIC_ROUTES: PublicRouteFixture[] = [
    // Top-level public surfaces
    { path: '/', label: 'HomePage', load: () => import('../../pages/home/HomePage') },
    { path: '/learn', label: 'LearnPage', load: () => import('../../pages/LearnPage') },
    { path: '/learn/:cat', label: 'ArticleCategoryPage', load: () => import('../../pages/ArticleCategoryPage') },
    { path: '/learn/:cat/:slug', label: 'ArticlePage', load: () => import('../../pages/learn/ArticlePage') },
    { path: '/category/:cat', label: 'CategoryPage', load: () => import('../../components/pages/CategoryPage') },
    { path: '/search', label: 'SearchResults', load: () => import('../../components/pages/SearchResults') },
    { path: '/watch/:id', label: 'VideoDetail', load: () => import('../../components/pages/VideoDetail') },

    // Provider directory
    { path: '/providers', label: 'ProvidersLandingPage', load: () => import('../../pages/providers/ProvidersLandingPage') },
    { path: '/providers/search', label: 'ProviderSearchPage', load: () => import('../../pages/providers/ProviderSearchPage') },
    { path: '/providers/:id', label: 'ProviderProfilePage', load: () => import('../../pages/providers/ProviderProfilePage') },
    { path: '/how-we-verify', label: 'HowWeVerifyPage', load: () => import('../../pages/providers/HowWeVerifyPage') },
    { path: '/for-providers', label: 'ForProvidersLandingPage', load: () => import('../../pages/providers/ForProvidersLandingPage') },
    { path: '/for-providers/apply', label: 'ProviderApplyPage', load: () => import('../../pages/providers/ProviderApplyPage') },
    { path: '/for-providers/claim', label: 'ProviderClaimPage', load: () => import('../../pages/providers/ProviderClaimPage') },

    // Tools (public)
    { path: '/tools', label: 'ToolsPage', load: () => import('../../components/pages/ToolsPage') },
    { path: '/tools/mood-journal', label: 'MoodJournal', load: () => import('../../components/tools/MoodJournal') },
    { path: '/tools/sleep-architect', label: 'SleepArchitect', load: () => import('../../components/tools/SleepArchitect') },
    { path: '/tools/symptom-navigator', label: 'NavigatorPage', load: () => import('../../components/pages/NavigatorPage') },
    { path: '/tools/symptom-navigator/crisis', label: 'CrisisResourcesScreen', load: () => import('../../components/screens/CrisisResourcesScreen') },
    { path: '/tools/relationship-health', label: 'RelationshipHealthCheck', load: () => import('../../components/tools/RelationshipHealthCheck') },
    { path: '/tools/medication-tracker', label: 'MedicationTracker', load: () => import('../../components/tools/MedicationTracker') },
    { path: '/clarity-score', label: 'ClarityScoreTool', load: () => import('../../components/pages/ClarityScoreTool') },

    // Core / company
    { path: '/about', label: 'AboutPage', load: () => import('../../components/pages/AboutPage') },
    { path: '/contact', label: 'ContactPage', load: () => import('../../pages/core/ContactPage') },
    { path: '/content-standards', label: 'ContentStandardsPage', load: () => import('../../pages/core/ContentStandardsPage') },
    { path: '/advisory-board', label: 'AdvisoryBoardPage', load: () => import('../../pages/core/AdvisoryBoardPage') },
    { path: '/authors/:slug', label: 'AuthorProfilePage', load: () => import('../../pages/core/AuthorProfilePage') },

    // Legal / regulatory
    { path: '/legal/privacy', label: 'LegalPage', load: () => import('../../components/pages/LegalPages') },
    { path: '/legal/terms', label: 'LegalPage', load: () => import('../../components/pages/LegalPages') },
    { path: '/legal/accessibility', label: 'LegalPage', load: () => import('../../components/pages/LegalPages') },

    // Crisis surfaces — sacred-rule public
    { path: '/crisis', label: 'CrisisPage', load: () => import('../../components/pages/CrisisPage') },

    // Sitemap
    { path: '/sitemap', label: 'SitemapPage', load: () => import('../../pages/SitemapPage') },

    // Auth (public-reachable, not auth-gated)
    { path: '/login', label: 'LoginPage', load: () => import('../../pages/auth/LoginPage') },
    { path: '/signup', label: 'SignUpPage', load: () => import('../../pages/auth/SignUpPage') },
    { path: '/reset-password', label: 'ResetPasswordPage', load: () => import('../../pages/auth/ResetPasswordPage') },
    { path: '/update-password', label: 'UpdatePasswordPage', load: () => import('../../pages/auth/UpdatePasswordPage') },
    { path: '/auth/callback', label: 'AuthCallback', load: () => import('../../pages/auth/AuthCallback') },
];

describe('Public route imports (LB-007)', () => {
    it('public route table is non-empty', () => {
        expect(PUBLIC_ROUTES.length).toBeGreaterThan(20);
    });

    it('public route paths are unique', () => {
        const paths = PUBLIC_ROUTES.map(r => r.path);
        expect(new Set(paths).size).toBe(paths.length);
    });

    it.each(PUBLIC_ROUTES)('$path: $label module imports cleanly', async ({ load }) => {
        const mod = await load();
        expect(mod).toBeDefined();
        expect(typeof mod.default).toBe('function');
    });
});

describe('Crisis surfaces remain public (sacred rule)', () => {
    const CRISIS_PATHS = ['/crisis', '/tools/symptom-navigator/crisis'];
    it.each(CRISIS_PATHS)('%s is registered in public route table', (path) => {
        const match = PUBLIC_ROUTES.find(r => r.path === path);
        expect(match, `${path} must be in PUBLIC_ROUTES`).toBeDefined();
    });
});
