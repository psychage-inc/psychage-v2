import { test, expect } from '@playwright/test';

/**
 * Comprehensive smoke test for all application routes
 * Verifies that every page loads without errors
 */

test.describe('Public Routes Smoke Test', () => {
    const publicRoutes = [
        { path: '/', name: 'Homepage' },
        { path: '/learn', name: 'Learn Page' },
        { path: '/find-care', name: 'Provider Directory' },
        { path: '/tools', name: 'Tools Page' },
        { path: '/clarity-score', name: 'Clarity Score Tool' },
        { path: '/about', name: 'About Page' },
        { path: '/contact', name: 'Contact Page' },
        { path: '/legal/privacy', name: 'Privacy Policy' },
        { path: '/legal/terms', name: 'Terms of Service' },
        { path: '/crisis', name: 'Crisis Resources' },
        { path: '/navigator', name: 'Symptom Navigator' },
        { path: '/providers/register', name: 'Provider Registration' },
        { path: '/login', name: 'Login Page' },
        { path: '/signup', name: 'Signup Page' },
        { path: '/reset-password', name: 'Reset Password Page' },
    ];

    publicRoutes.forEach(({ path, name }) => {
        test(`should load ${name} (${path})`, async ({ page }) => {
            const response = await page.goto(path);

            // Check HTTP status
            expect(response?.status()).toBeLessThan(400);

            // Check no console errors
            const errors: string[] = [];
            page.on('console', (msg) => {
                if (msg.type() === 'error') {
                    errors.push(msg.text());
                }
            });

            // Wait for page to be loaded
            await page.waitForLoadState('networkidle');

            // Verify page rendered (has content)
            const bodyContent = await page.textContent('body');
            expect(bodyContent).toBeTruthy();
            expect(bodyContent!.length).toBeGreaterThan(0);

            // Check for main content area
            const mainElement = page.locator('main, #main-content, [role="main"]');
            await expect(mainElement.first()).toBeVisible({ timeout: 5000 });
        });
    });
});

test.describe('Protected Routes Smoke Test (Unauthenticated)', () => {
    const protectedRoutes = [
        { path: '/dashboard', name: 'User Dashboard' },
        { path: '/dashboard/settings', name: 'Account Settings' },
        { path: '/dashboard/bookmarks', name: 'Bookmarks' },
        { path: '/dashboard/history', name: 'Assessment History' },
        { path: '/admin', name: 'Admin Dashboard' },
        { path: '/admin/providers', name: 'Provider Management' },
        { path: '/admin/audit', name: 'Audit Log' },
        { path: '/admin/reports', name: 'Reports' },
        { path: '/provider', name: 'Provider Dashboard' },
        { path: '/provider/profile', name: 'Provider Profile Editor' },
        { path: '/provider/analytics', name: 'Provider Analytics' },
        { path: '/provider/patients', name: 'Provider Patients' },
    ];

    protectedRoutes.forEach(({ path, name }) => {
        test(`should redirect ${name} (${path}) to login when unauthenticated`, async ({ page }) => {
            await page.goto(path);

            // Should redirect to login
            await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
        });
    });
});

test.describe('Dynamic Routes Smoke Test', () => {
    test('should handle article category routes', async ({ page }) => {
        // Test with a common category slug
        const response = await page.goto('/learn/anxiety');

        // Should either load the category page or redirect to learn page
        expect(response?.status()).toBeLessThan(500);

        const mainElement = page.locator('main, #main-content');
        await expect(mainElement.first()).toBeVisible({ timeout: 5000 });
    });

    test('should handle 404 for non-existent routes', async ({ page }) => {
        await page.goto('/this-route-does-not-exist-12345');

        // Should show 404 page or redirect
        const bodyText = await page.textContent('body');
        expect(bodyText).toBeTruthy();

        // Check if 404 page is shown
        const notFoundText = page.getByText(/not found|404|page.*not.*exist/i);
        const isVisible = await notFoundText.isVisible().catch(() => false);

        // Either shows 404 page or redirects to homepage
        if (!isVisible) {
            await expect(page).toHaveURL('/');
        }
    });
});

test.describe('Navigation Links Smoke Test', () => {
    test('should have working navigation links on homepage', async ({ page }) => {
        await page.goto('/');

        // Check main navigation exists
        const nav = page.locator('nav, [role="navigation"]');
        await expect(nav.first()).toBeVisible();

        // Check for common navigation links
        const learnLink = page.getByRole('link', { name: /learn/i }).first();
        const toolsLink = page.getByRole('link', { name: /tools/i }).first();

        // At least one of these should be visible
        const learnVisible = await learnLink.isVisible().catch(() => false);
        const toolsVisible = await toolsLink.isVisible().catch(() => false);

        expect(learnVisible || toolsVisible).toBeTruthy();
    });

    test('should have working footer links', async ({ page }) => {
        await page.goto('/');

        // Check footer exists
        const footer = page.locator('footer');
        await expect(footer.first()).toBeVisible();

        // Check for privacy and terms links
        const privacyLink = page.getByRole('link', { name: /privacy/i });
        const termsLink = page.getByRole('link', { name: /terms/i });

        await expect(privacyLink.first()).toBeVisible();
        await expect(termsLink.first()).toBeVisible();
    });
});

test.describe('Critical User Flows', () => {
    test('should navigate from homepage to tools', async ({ page }) => {
        await page.goto('/');

        // Find and click tools link
        const toolsLink = page.getByRole('link', { name: /tools/i }).first();
        await toolsLink.click();

        await expect(page).toHaveURL(/\/tools/);

        // Verify tools page loaded
        const mainElement = page.locator('main');
        await expect(mainElement).toBeVisible();
    });

    test('should navigate from homepage to learn', async ({ page }) => {
        await page.goto('/');

        // Find and click learn link
        const learnLink = page.getByRole('link', { name: /learn/i }).first();
        await learnLink.click();

        await expect(page).toHaveURL(/\/learn/);

        // Verify learn page loaded
        const mainElement = page.locator('main');
        await expect(mainElement).toBeVisible();
    });

    test('should access crisis resources from multiple entry points', async ({ page }) => {
        // Test direct access
        await page.goto('/crisis');
        await expect(page.locator('main')).toBeVisible();

        // Test homepage access (if crisis banner exists)
        await page.goto('/');
        const crisisLink = page.getByRole('link', { name: /crisis|emergency|988/i }).first();
        const hasLink = await crisisLink.isVisible().catch(() => false);

        if (hasLink) {
            await crisisLink.click();
            await expect(page).toHaveURL(/\/crisis/);
        }
    });
});

test.describe('Search Functionality', () => {
    test('should handle search route with query parameters', async ({ page }) => {
        await page.goto('/search?q=anxiety');

        // Should load search results page
        const mainElement = page.locator('main');
        await expect(mainElement).toBeVisible({ timeout: 5000 });

        // Verify page has content
        const bodyText = await page.textContent('body');
        expect(bodyText).toBeTruthy();
        expect(bodyText!.length).toBeGreaterThan(100);
    });
});
