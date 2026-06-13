import { defineConfig, devices } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env.e2e (gitignored) so authed prod runs pick up the test-account creds
// and Supabase keys without having to export them on the command line. Existing
// process.env always wins, so CI / ad-hoc overrides are respected.
const envE2ePath = path.join(dirname, '.env.e2e');
if (fs.existsSync(envE2ePath)) {
    for (const line of fs.readFileSync(envE2ePath, 'utf8').split('\n')) {
        const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
        if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2];
    }
}

/**
 * Target is env-driven so the same suite runs against local dev (default) or a
 * remote deployment (e.g. PLAYWRIGHT_BASE_URL=https://www.psychage.com).
 * When a remote target is set the auto-start dev `webServer` is dropped.
 */
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5173';
const IS_REMOTE =
    /^https?:\/\//.test(BASE_URL) && !BASE_URL.includes('localhost') && !BASE_URL.includes('127.0.0.1');

// Logged-in projects replay this session (produced by e2e/global-setup.ts).
const STORAGE_STATE = path.join(dirname, 'e2e/.auth/patient.json');
// Auth setup/teardown only wire up when a test account is provided, so CI and
// contributors without prod creds keep running the logged-out matrix untouched.
const HAS_E2E_CREDS = !!process.env.PSYCHAGE_E2E_EMAIL;

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : IS_REMOTE ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? 'html' : [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        // Stabilize i18n autodetect for specs that don't drive the switcher.
        locale: 'en-US',
    },
    globalSetup: HAS_E2E_CREDS ? './e2e/global-setup.ts' : undefined,
    globalTeardown: HAS_E2E_CREDS ? './e2e/global-teardown.ts' : undefined,
    projects: [
        // Logged-out matrix: no stored session; *.authed.spec.ts excluded.
        {
            name: 'chromium-public',
            use: { ...devices['Desktop Chrome'] },
            testIgnore: /.*\.authed\.spec\.ts/,
        },
        {
            name: 'firefox-public',
            use: { ...devices['Desktop Firefox'] },
            testIgnore: /.*\.authed\.spec\.ts/,
        },
        {
            name: 'webkit-public',
            use: { ...devices['Desktop Safari'] },
            testIgnore: /.*\.authed\.spec\.ts/,
        },
        // Logged-in: replays the test-account session; only *.authed.spec.ts.
        {
            name: 'chromium-authed',
            use: { ...devices['Desktop Chrome'], storageState: STORAGE_STATE },
            testMatch: /.*\.authed\.spec\.ts/,
        },
    ],
    ...(IS_REMOTE
        ? {}
        : {
              webServer: {
                  command: 'pnpm run dev',
                  url: 'http://localhost:5173',
                  reuseExistingServer: !process.env.CI,
              },
          }),
});
