/**
 * supabase-js resolves `{ data, error }` and never throws on a database error.
 * Write paths across the services layer used to discard `error` and return
 * success-shaped values, so failed writes were reported to the UI as success.
 * Use this at write boundaries to turn a Supabase error into a real throw the
 * caller's try/catch, rollback, or React Query `onError` can act on.
 */
export function throwOnError(
    error: { message: string } | null | undefined,
    context: string
): void {
    if (error) {
        throw new Error(`${context}: ${error.message}`);
    }
}
