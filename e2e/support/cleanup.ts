import { createClient } from '@supabase/supabase-js';

/**
 * Every prod table the verification battery can write a row to, keyed by
 * user_id. Deleting children before parents where an FK exists
 * (ai_messages before ai_conversations). Unknown/nonexistent tables surface as
 * an ERR string rather than throwing, so a sweep always completes.
 */
export const USER_OWNED_TABLES = [
    'clarity_score_history',
    'assessment_results',
    'mood_entries',
    'sleep_entries',
    'sleep_diary_entries',
    'sleep_user_settings',
    'bookmarks',
    'user_activity',
    'consent_log',
    'ai_messages',
    'ai_conversations',
    'navigator_saved_results',
    'bookings',
];

export async function cleanupTestAccount(
    userId: string,
    opts: { purgeAccount?: boolean } = {},
): Promise<Record<string, number | string>> {
    const url = process.env.VITE_SUPABASE_URL;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceRole) {
        throw new Error('cleanupTestAccount: VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY must be set.');
    }
    const sb = createClient(url, serviceRole, { auth: { persistSession: false } });

    const results: Record<string, number | string> = {};
    for (const table of USER_OWNED_TABLES) {
        const { error, count } = await sb.from(table).delete({ count: 'exact' }).eq('user_id', userId);
        results[table] = error ? `ERR ${error.message}` : count ?? 0;
    }

    if (opts.purgeAccount) {
        const { error } = await sb.auth.admin.deleteUser(userId);
        results.__auth_user__ = error ? `ERR ${error.message}` : 'deleted';
    }
    return results;
}
