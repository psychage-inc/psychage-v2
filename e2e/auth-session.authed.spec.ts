import { test, expect } from '@playwright/test';

/**
 * Validates the authed harness end-to-end: the replayed test-account session
 * lands on the dashboard (not bounced to /login) and renders its main content.
 */
test.describe('Authed session', () => {
    test('replayed session lands on dashboard, not login', async ({ page }) => {
        await page.goto('/dashboard');
        await expect(page).not.toHaveURL(/\/login/, { timeout: 15000 });
        await expect(page.locator('main, [role="main"]').first()).toBeVisible({ timeout: 15000 });
    });
});
