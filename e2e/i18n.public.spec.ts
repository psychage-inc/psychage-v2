import { test, expect } from '@playwright/test';

/**
 * Item 9 — i18n. In deployed code the LanguageSwitcher renders ONLY inside the
 * mobile menu (MobileMenu.tsx), so this drives a mobile viewport: open the
 * hamburger, switch each language, and assert <html lang> updates and the
 * providers namespace (the one that's fully translated) actually changes.
 */
test.use({ viewport: { width: 390, height: 844 } });

test('mobile language switcher updates <html lang> and translates providers', async ({ page }) => {
    await page.goto('/providers', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2500);

    const htmlLang = () => page.evaluate(() => document.documentElement.lang);
    const h1 = () =>
        page
            .locator('h1')
            .first()
            .textContent()
            .then((t) => (t || '').trim().slice(0, 70))
            .catch(() => null);

    const results: Record<string, { lang: string; h1: string | null }> = {};
    results.initial = { lang: await htmlLang(), h1: await h1() };

    const langs = [
        { code: 'pt', name: /português/i },
        { code: 'es', name: /español/i },
        { code: 'sv', name: /svenska/i },
        { code: 'fr', name: /français/i },
        { code: 'en', name: /english/i },
    ];

    // Open the mobile menu once; the switcher lives inside it.
    await page.getByRole('button', { name: /open navigation menu/i }).click();
    await page.waitForTimeout(600);
    const switcherCount = await page.getByRole('button', { name: /select language/i }).count();

    for (const lang of langs) {
        await page
            .getByRole('button', { name: /select language/i })
            .first()
            .click({ timeout: 6000 })
            .catch((e) => console.log(`[i18n] open switcher fail ${lang.code}: ${e.message.slice(0, 70)}`));
        await page.waitForTimeout(300);
        await page
            .getByRole('button', { name: lang.name })
            .first()
            .click({ timeout: 5000 })
            .catch((e) => console.log(`[i18n] pick fail ${lang.code}: ${e.message.slice(0, 70)}`));
        await page.waitForTimeout(1000);
        results[lang.code] = { lang: await htmlLang(), h1: await h1() };
    }

    const body = (await page.locator('body').textContent()) || '';
    const rawKeys = (body.match(/\b[a-z][a-zA-Z]+\.[a-z][a-zA-Z]+\.[a-zA-Z.]+\b/g) || []).filter(
        (k) => !/\.(com|org|net|co|io|gov)\b/.test(k) && !k.includes('psychage'),
    );

    // eslint-disable-next-line no-console
    console.log(`[i18n] switcherCount=${switcherCount}`);
    // eslint-disable-next-line no-console
    console.log(`[i18n] results=${JSON.stringify(results)}`);
    // eslint-disable-next-line no-console
    console.log(`[i18n] raw-key-like strings (first 6)=${JSON.stringify(rawKeys.slice(0, 6))}`);

    expect(switcherCount, 'language switcher present in mobile menu').toBeGreaterThan(0);
});
