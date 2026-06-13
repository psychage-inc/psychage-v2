import { test, expect } from '@playwright/test';

/**
 * Authed checklist coverage: dashboard render (item 10), admin-negative
 * (item 11), and the audited logout-clears-chat-history requirement (item 1).
 */
test.describe('Authed flows', () => {
    test('dashboard renders for the account (item 10)', async ({ page }) => {
        await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(3000);
        await expect(page).not.toHaveURL(/\/login/);
        await expect(page.locator('main, [role="main"]').first()).toBeVisible();
        const heading = await page
            .locator('h1, h2')
            .first()
            .textContent()
            .catch(() => null);
        // eslint-disable-next-line no-console
        console.log(
            `[dash] url=${page.url().replace('https://www.psychage.com', '')} heading=${JSON.stringify((heading || '').trim().slice(0, 60))}`,
        );
    });

    test('admin panel denied to a patient account (item 11)', async ({ page }) => {
        await page.goto('/admin', { waitUntil: 'domcontentloaded' }).catch(() => {});
        await page.waitForTimeout(4000);
        const adminUiVisible = await page
            .getByText(/admin dashboard|user management|audit log|safety dashboard|content editor/i)
            .first()
            .isVisible()
            .catch(() => false);
        // eslint-disable-next-line no-console
        console.log(`[admin-neg] finalUrl=${page.url()} adminUiVisible=${adminUiVisible}`);
        expect(adminUiVisible, 'patient must not see admin UI').toBeFalsy();
    });

    test('logout clears MindMate chat history from localStorage (item 1)', async ({ page }) => {
        await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(2500);
        await page.evaluate(() =>
            localStorage.setItem('psychage_ai_chat_history', JSON.stringify([{ role: 'user', content: 'hi' }])),
        );
        const before = await page.evaluate(() => localStorage.getItem('psychage_ai_chat_history'));

        await page.getByRole('button', { name: /user menu/i }).click({ timeout: 8000 });
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: /sign out|log ?out/i }).click({ timeout: 5000 });
        await page.waitForTimeout(3500);

        const after = await page.evaluate(() => localStorage.getItem('psychage_ai_chat_history'));
        // eslint-disable-next-line no-console
        console.log(
            `[logout] urlAfter=${page.url().replace('https://www.psychage.com', '')} chatBefore=${before ? 'set' : 'null'} chatAfter=${after === null ? 'null(cleared)' : 'STILL-SET'}`,
        );
        expect(after, 'chat history cleared on logout').toBeNull();
    });
});
