import { test, expect } from '@playwright/test';

/**
 * Desktop "Browse by category" row on /learn.
 *
 * The posters live in a horizontally-scrolling container guarded by
 * useDragScrollGuard: a sideways drag must scroll (never navigate), while a
 * stationary tap must still open the category. These two behaviors are the
 * merge gate for fix/category-scroll-nav.
 *
 * page.mouse dispatches trusted pointer events, which is what the guard
 * listens to. The category buttons carry aria-label="Browse <name>" (no
 * data-testid exists), so we select by role + accessible name.
 */
test.describe('Learn — category row drag vs. tap', () => {
    const POSTER = { role: 'button' as const, name: /^Browse / };

    test('sideways drag scrolls the row without navigating', async ({ page }) => {
        await page.goto('/learn');
        const first = page.getByRole(POSTER.role, { name: POSTER.name }).first();
        await first.waitFor({ state: 'visible', timeout: 15000 });

        const box = await first.boundingBox();
        expect(box, 'category poster should have a bounding box').toBeTruthy();
        const cx = box!.x + box!.width / 2;
        const cy = box!.y + box!.height / 2;

        // Press, drag ~80px sideways (well past the 8px guard threshold and the
        // 12px spec floor), release. A drag must NOT trigger navigation.
        await page.mouse.move(cx, cy);
        await page.mouse.down();
        await page.mouse.move(cx - 80, cy, { steps: 10 });
        await page.mouse.up();

        // Still on the Learn index — no /learn/<slug> navigation occurred.
        await expect(page).toHaveURL(/\/learn$/);
    });

    test('stationary tap navigates to the category', async ({ page }) => {
        await page.goto('/learn');
        const first = page.getByRole(POSTER.role, { name: POSTER.name }).first();
        await first.waitFor({ state: 'visible', timeout: 15000 });

        // A plain click has no movement, so the guard stays inert and the
        // button's navigate() fires.
        await first.click();

        await expect(page).toHaveURL(/\/learn\/[a-z0-9-]+/i);
    });
});
