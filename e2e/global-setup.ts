import { chromium, type FullConfig } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const AUTH_DIR = path.join(dirname, '.auth');
const STORAGE_STATE = path.join(AUTH_DIR, 'patient.json');
const ACCOUNT_JSON = path.join(AUTH_DIR, 'account.json');

/**
 * Signs in (or creates, since email confirmation is disabled in prod) the single
 * dedicated test account, injects its Supabase session into a real browser origin,
 * and persists storageState for the chromium-authed project. Self-checks that a
 * protected route does not bounce to /login before trusting the session.
 */
export default async function globalSetup(_config: FullConfig) {
    const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5173';
    const url = process.env.VITE_SUPABASE_URL;
    const anon = process.env.VITE_SUPABASE_ANON_KEY;
    const email = process.env.PSYCHAGE_E2E_EMAIL;
    const password = process.env.PSYCHAGE_E2E_PASSWORD;
    if (!url || !anon || !email || !password) {
        throw new Error('global-setup: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, PSYCHAGE_E2E_EMAIL, PSYCHAGE_E2E_PASSWORD required.');
    }
    const ref = new URL(url).host.split('.')[0];

    // 1. Ensure the account exists. Instant session (no email confirmation in prod).
    const sb = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
    let { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) {
        const signUp = await sb.auth.signUp({
            email,
            password,
            options: { data: { display_name: 'E2E Verify', role: 'patient' } },
        });
        if (signUp.error) throw new Error(`global-setup signUp failed: ${signUp.error.message}`);
        data = signUp.data;
    }
    const session = data.session;
    if (!session) {
        throw new Error('global-setup: no session returned — is email confirmation unexpectedly ON?');
    }

    fs.mkdirSync(AUTH_DIR, { recursive: true });

    // 2. Inject the session into the app origin so storageState replays it.
    const browser = await chromium.launch();
    const context = await browser.newContext({ baseURL: BASE_URL });
    const page = await context.newPage();
    await page.goto('/');
    await page.evaluate(
        ({ key, value }) => window.localStorage.setItem(key, value),
        { key: `sb-${ref}-auth-token`, value: JSON.stringify(session) },
    );

    // 3. Self-check: with the session set, a protected route must not redirect to /login.
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    if (/\/login/.test(page.url())) {
        await browser.close();
        throw new Error(
            `global-setup: injected session did not authenticate (landed on ${page.url()}). ` +
                'Supabase storage format likely changed — switch to UI login.',
        );
    }

    await context.storageState({ path: STORAGE_STATE });
    fs.writeFileSync(ACCOUNT_JSON, JSON.stringify({ userId: session.user.id, email }, null, 2));
    await browser.close();
    // eslint-disable-next-line no-console
    console.log(`[global-setup] authenticated ${email} (${session.user.id}); storageState saved.`);
}
