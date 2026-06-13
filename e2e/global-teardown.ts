import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Cleanup is intentionally NOT automatic: the verification battery creates rows
 * that later specs (e.g. dashboard reads) and successive iterative runs rely on.
 * Purging is an explicit Phase-5 step via `tsx scripts/e2e-cleanup.ts`. This
 * teardown only reports the account whose rows are pending cleanup.
 */
export default async function globalTeardown() {
    const accountPath = path.join(dirname, '.auth', 'account.json');
    if (!fs.existsSync(accountPath)) return;
    const { userId, email } = JSON.parse(fs.readFileSync(accountPath, 'utf8'));
    // eslint-disable-next-line no-console
    console.log(
        `[global-teardown] test account ${email} (${userId}) retained — run scripts/e2e-cleanup.ts to purge created rows.`,
    );
}
