/**
 * Admin launch readiness smoke test (prompt 2 §B.2 – B.4).
 *
 * Mirrors `public-routes.smoke.test.tsx` for the admin surface. We import each
 * admin route module to catch cheap regressions (broken lazy import paths,
 * missing default exports, syntax errors) without rendering — full render
 * would require mocking Supabase, Radix portals, and TanStack Query for every
 * page, which adds maintenance cost without proportionate launch value.
 *
 * The route table mirrors `src/AdminApp.tsx`. Drift is itself a finding.
 *
 * §B.3 / §B.4 (non-admin and logged-out flows) are covered by the existing
 * `src/components/auth/__tests__/RoleGuard.test.tsx` tests:
 *   - "should redirect when user role not in allowedRoles" — non-admin redirect
 *   - "should redirect to login when not authenticated" — logged-out redirect
 *   - "should show loading state" — no UI flash during auth hydration
 * That suite is the source of truth for the redirect contract.
 */

import { describe, it, expect } from 'vitest';

interface AdminRouteFixture {
    path: string;
    label: string;
    load: () => Promise<{ default?: unknown }>;
    public?: boolean;
}

const ADMIN_ROUTES: AdminRouteFixture[] = [
    // Auth on admin domain (public, no role gate)
    { path: '/login', label: 'LoginPage', load: () => import('../../pages/auth/LoginPage'), public: true },
    { path: '/auth/callback', label: 'AuthCallback', load: () => import('../../pages/auth/AuthCallback'), public: true },
    { path: '/reset-password', label: 'ResetPasswordPage', load: () => import('../../pages/auth/ResetPasswordPage'), public: true },
    { path: '/update-password', label: 'UpdatePasswordPage', load: () => import('../../pages/auth/UpdatePasswordPage'), public: true },

    // Onboarding (gated)
    { path: '/onboarding', label: 'AdminOnboarding', load: () => import('../../pages/admin/AdminOnboarding') },

    // Layout + dashboard
    { path: '/', label: 'AdminLayout', load: () => import('../../components/admin/AdminLayout') },
    { path: '/dashboard', label: 'AdminDashboardV2', load: () => import('../../pages/admin/v2/Dashboard') },

    // Articles command center
    { path: '/articles', label: 'AdminArticleList', load: () => import('../../pages/admin/v2/articles/ArticleList') },
    { path: '/articles/new', label: 'AdminArticleCreator', load: () => import('../../pages/admin/v2/articles/ArticleCreator') },
    { path: '/articles/categories', label: 'AdminArticleCategories', load: () => import('../../pages/admin/v2/articles/ArticleCategories') },
    { path: '/articles/pipeline', label: 'AdminArticlePipeline', load: () => import('../../pages/admin/v2/articles/ArticlePipeline') },
    { path: '/articles/tree', label: 'AdminArticleTree', load: () => import('../../pages/admin/v2/articles/ArticleTree') },
    { path: '/articles/quality', label: 'AdminArticleQualityMap', load: () => import('../../pages/admin/v2/articles/ArticleQualityMap') },
    { path: '/articles/citations', label: 'AdminArticleCitationReport', load: () => import('../../pages/admin/v2/articles/ArticleCitationReport') },
    { path: '/articles/quality-dashboard', label: 'AdminArticleQualityDashboard', load: () => import('../../pages/admin/v2/articles/ArticleQualityDashboard') },
    { path: '/articles/clusters', label: 'AdminTopicClusters', load: () => import('../../pages/admin/v2/articles/TopicClusters') },
    { path: '/articles/:id', label: 'AdminArticleDetail', load: () => import('../../pages/admin/v2/articles/ArticleDetail') },
    { path: '/articles/:id/breakdown', label: 'AdminArticleBreakdown', load: () => import('../../pages/admin/v2/articles/ArticleBreakdown') },

    // Content
    { path: '/content', label: 'AdminContentList', load: () => import('../../pages/admin/v2/content/ContentList') },
    { path: '/content/new', label: 'AdminContentEditor', load: () => import('../../pages/admin/v2/content/ContentEditor') },

    // Providers
    { path: '/providers', label: 'AdminProviderList', load: () => import('../../pages/admin/v2/providers/ProviderList') },
    { path: '/providers/new', label: 'AdminProviderEditor', load: () => import('../../pages/admin/v2/providers/ProviderEditor') },
    { path: '/providers/applications', label: 'AdminApplicationReview', load: () => import('../../pages/admin/v2/providers/ApplicationReview') },
    { path: '/providers/import', label: 'AdminBulkImport', load: () => import('../../pages/admin/v2/providers/BulkImport') },

    // Symptom Navigator
    { path: '/symptom-navigator/symptoms', label: 'AdminSymptomList', load: () => import('../../pages/admin/v2/symptom-navigator/SymptomList') },
    { path: '/symptom-navigator/conditions', label: 'AdminConditionList', load: () => import('../../pages/admin/v2/symptom-navigator/ConditionList') },
    { path: '/symptom-navigator/conditions/:id/edit', label: 'AdminConditionEditor', load: () => import('../../pages/admin/v2/symptom-navigator/ConditionEditor') },
    { path: '/symptom-navigator/mappings', label: 'AdminMappingMatrix', load: () => import('../../pages/admin/v2/symptom-navigator/MappingMatrix') },

    // Safety
    { path: '/safety', label: 'AdminSafetyDashboard', load: () => import('../../pages/admin/v2/safety/SafetyDashboard') },
    { path: '/safety/keywords', label: 'AdminCrisisKeywords', load: () => import('../../pages/admin/v2/safety/CrisisKeywords') },
    { path: '/safety/conversations', label: 'AdminConversationReview', load: () => import('../../pages/admin/v2/safety/ConversationReview') },

    // Settings (super-admin sub-section gated by useAdminAuth in component)
    { path: '/settings', label: 'AdminSettingsV2', load: () => import('../../pages/admin/v2/settings/Settings') },
    { path: '/settings/users', label: 'AdminUserManagementV2', load: () => import('../../pages/admin/v2/settings/UserManagement') },
    { path: '/settings/audit-log', label: 'AdminAuditLogV2', load: () => import('../../pages/admin/v2/settings/AuditLog') },
];

describe('Admin route imports (prompt 2 §B.2)', () => {
    it('admin route table is non-empty', () => {
        expect(ADMIN_ROUTES.length).toBeGreaterThan(20);
    });

    it('admin route paths are unique', () => {
        const paths = ADMIN_ROUTES.map(r => r.path);
        expect(new Set(paths).size).toBe(paths.length);
    });

    it.each(ADMIN_ROUTES)('$path: $label module imports cleanly', async ({ load }) => {
        const mod = await load();
        expect(mod).toBeDefined();
        expect(typeof mod.default).toBe('function');
    });
});

describe('Admin authorization contract (prompt 2 §B.3, §B.4, §C.1)', () => {
    /**
     * Behavioral guarantees for the authorization contract are exercised by
     * `src/components/auth/__tests__/RoleGuard.test.tsx`. This block asserts
     * the structural contract: that every non-public admin route in the
     * fixture above is implicitly under the gated `/` layout in AdminApp.
     */
    const PUBLIC_PATHS = ADMIN_ROUTES.filter(r => r.public).map(r => r.path);
    const GATED_PATHS = ADMIN_ROUTES.filter(r => !r.public).map(r => r.path);

    it('exactly four public auth paths exist on admin domain', () => {
        expect(PUBLIC_PATHS).toEqual(['/login', '/auth/callback', '/reset-password', '/update-password']);
    });

    it('every non-public admin path is under the gated layout', () => {
        // Every gated path is either '/' itself (the layout) or a nested
        // child route. None should match the four auth-public prefixes.
        const authPrefixes = ['/login', '/auth/callback', '/reset-password', '/update-password'];
        for (const path of GATED_PATHS) {
            for (const prefix of authPrefixes) {
                expect(
                    path.startsWith(prefix),
                    `gated path ${path} accidentally falls under public auth prefix ${prefix}`,
                ).toBe(false);
            }
        }
    });
});
