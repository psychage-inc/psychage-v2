/**
 * Stable, greppable tag embedded in any free-text field a spec writes to prod,
 * so created rows are human-identifiable. Cleanup keys on the test-account
 * user_id (the account does nothing else), so this tag is a secondary aid.
 */
export const E2E_RUN_TAG = 'e2e-verify-20260613';
