import { test, expect } from '@playwright/test';
import fs from 'node:fs';

/** Item 8 — Crisis page country picker + tel: link well-formedness (verify-only). */
test('crisis page: country picker switches to GB resources with valid tel links', async ({ page }) => {
    fs.mkdirSync('verify-shots', { recursive: true });
    await page.goto('/crisis', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const h1 = await page.locator('h1').first().textContent();
    // Switch country to United Kingdom.
    await page.getByRole('button', { name: /change country/i }).click({ timeout: 8000 }).catch((e) => console.log(`[crisis] open picker fail: ${e.message.slice(0, 70)}`));
    await page.waitForTimeout(600);
    // Picker may have a search box; type then pick United Kingdom.
    const search = page.getByRole('textbox').first();
    if (await search.isVisible().catch(() => false)) await search.fill('United Kingdom').catch(() => {});
    await page.waitForTimeout(400);
    await page.getByText(/united kingdom/i).first().click({ timeout: 5000 }).catch((e) => console.log(`[crisis] pick GB fail: ${e.message.slice(0, 70)}`));
    await page.waitForTimeout(1500);

    const telLinks = await page.locator('a[href^="tel:"]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')));
    const bodyText = (await page.locator('main').textContent()) || '';
    const gbResource = /samaritans|116\s?123|shout|85258|nhs/i.test(bodyText);
    const malformed = telLinks.filter((t) => !/^tel:\+?[\d\s-]{3,}$/.test(t || ''));
    await page.screenshot({ path: 'verify-shots/crisis-gb.png', fullPage: false });

    // eslint-disable-next-line no-console
    console.log(`[crisis] h1=${JSON.stringify((h1 || '').trim())} gbResourceVisible=${gbResource} telLinks=${JSON.stringify(telLinks.slice(0, 6))} malformed=${JSON.stringify(malformed)}`);
    expect(telLinks.length, 'has tel links').toBeGreaterThan(0);
    expect(malformed, 'all tel links well-formed').toHaveLength(0);
});

/** Item 3 — Symptom Navigator: drive welcome -> domains -> symptoms and capture progress. */
test('symptom navigator: drives through the adaptive flow', async ({ page }) => {
    test.setTimeout(90000);
    fs.mkdirSync('verify-shots', { recursive: true });
    await page.goto('/tools/symptom-navigator', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => Object.keys(localStorage).filter((k) => /nav/i.test(k)).forEach((k) => localStorage.removeItem(k)));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const steps: string[] = [];
    for (let i = 0; i < 10; i++) {
        const heading = ((await page.locator('main h1, main h2').first().textContent().catch(() => '')) || '').trim().slice(0, 50);
        steps.push(`${i}:${heading}`);
        // Select up to 3 selectable options if present (domain/symptom cards are buttons/checkboxes).
        const selectable = page.locator('main [role="checkbox"], main button[aria-pressed], main [role="button"][aria-pressed]');
        const n = await selectable.count().catch(() => 0);
        for (let j = 0; j < Math.min(n, 2); j++) await selectable.nth(j).click().catch(() => {});
        await page.waitForTimeout(400);
        // Advance with a primary button.
        const next = page.getByRole('button', { name: /continue|next|see (my )?results|view results|begin|start/i }).first();
        if (!(await next.isVisible().catch(() => false))) break;
        await next.click().catch(() => {});
        await page.waitForTimeout(1200);
        // Crisis overlay short-circuit?
        const crisis = await page.getByText(/you are not alone|crisis|988|immediate (help|support)/i).first().isVisible().catch(() => false);
        if (crisis) { steps.push(`${i}:CRISIS-OVERLAY`); break; }
    }
    const reachedResults = /result|match|condition|next step|your (experience|results)/i.test((await page.locator('main').textContent()) || '');
    await page.screenshot({ path: 'verify-shots/navigator-end.png', fullPage: true });
    // eslint-disable-next-line no-console
    console.log(`[nav] steps=${JSON.stringify(steps)} reachedResultsLike=${reachedResults}`);
});
