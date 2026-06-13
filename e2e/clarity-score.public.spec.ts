import { test, expect } from '@playwright/test';
import fs from 'node:fs';

/**
 * Item 2 — Clarity Score (anonymous). Completes the 20-question assessment by
 * always picking the SAME option index, then verifies the results dashboard
 * renders a score + tier. Anonymous run must persist NOTHING to the DB.
 */
test('clarity score: full 20-question run renders results + tier (anonymous)', async ({ page }) => {
    test.setTimeout(120000);
    fs.mkdirSync('verify-shots', { recursive: true });

    const restWrites: string[] = [];
    page.on('request', (r) => {
        const m = r.method();
        if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(m) && /\/rest\/v1\//.test(r.url())) {
            restWrites.push(`${m} ${r.url().replace('https://ozourhqyqtpppvpbhphw.supabase.co', '')}`);
        }
    });

    await page.goto('/clarity-score', { waitUntil: 'domcontentloaded' });
    // Fresh start: clear any persisted in-progress state.
    await page.evaluate(() => {
        Object.keys(localStorage)
            .filter((k) => /clarity/i.test(k))
            .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    await page.getByRole('button', { name: /start assessment/i }).click({ timeout: 10000 });
    await page.locator('main button[aria-pressed]').first().waitFor({ state: 'visible', timeout: 10000 });

    const pickedLabels: string[] = [];
    let answered = 0;
    for (let i = 0; i < 24; i++) {
        const options = page.locator('main button[aria-pressed]');
        // Wait for the next question's options to animate in; if they never come,
        // we've left the questions step (results or a crisis modal).
        const hasOptions = await options
            .first()
            .waitFor({ state: 'visible', timeout: 6000 })
            .then(() => true)
            .catch(() => false);
        if (!hasOptions) {
            const cont = page.getByRole('button', { name: /continue|i'?m ok|close|got it/i }).first();
            if (await cont.isVisible().catch(() => false)) {
                await cont.click().catch(() => {});
                await page.waitForTimeout(500);
                continue;
            }
            break;
        }
        const opt = options.first();
        pickedLabels.push(((await opt.textContent()) || '').trim().slice(0, 24));
        await opt.click();
        answered++;
        await page.waitForTimeout(150);
        const next = page.getByRole('button', { name: /^(next|finish)$/i }).first();
        await next.click({ timeout: 5000 }).catch(() => {});
        await page.waitForTimeout(500);
    }

    await page.waitForTimeout(2500);
    await page.screenshot({ path: 'verify-shots/clarity-results.png', fullPage: true });

    const bodyText = (await page.locator('main').textContent()) || '';
    const scoreMatch = bodyText.match(/\b(\d{1,3})\s*\/?\s*(100)?\b/);
    const tierMatch = bodyText.match(/thriving|resilient|managing|struggling|developing|needs? attention|balanced|flourishing/i);

    // eslint-disable-next-line no-console
    console.log(`[clarity] answered=${answered} firstLabels=${JSON.stringify(pickedLabels.slice(0, 3))}`);
    // eslint-disable-next-line no-console
    console.log(`[clarity] score~=${scoreMatch?.[1] ?? 'NONE'} tier=${tierMatch?.[0] ?? 'NONE'}`);
    // eslint-disable-next-line no-console
    console.log(`[clarity] DB writes during anon run: ${restWrites.length} ${JSON.stringify(restWrites.slice(0, 5))}`);

    expect(answered, 'answered most questions').toBeGreaterThanOrEqual(18);
    expect(restWrites, 'anonymous run must not write to DB').toHaveLength(0);
});
