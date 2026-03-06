/**
 * Service fallback utilities
 *
 * Generic helpers to reduce the repeated try/Supabase/catch/mock pattern
 * used across 8+ services.
 *
 * NOTE: The `fallback` parameter accepts `T | (() => T)`. If `T` itself is a
 * function type, wrap it in a thunk to avoid ambiguity:
 *   `() => myFallbackFn` rather than `myFallbackFn`
 */

/** Supabase error shape shared by both query helpers. */
type SupabaseError = { message: string; code?: string } | null;

/**
 * Wraps an async operation with a fallback value on failure.
 * Replaces the common try { ... } catch { console.error(...); return fallback } pattern.
 */
export async function withFallback<T>(
  primary: () => Promise<T>,
  fallback: T | (() => T),
  label: string
): Promise<T> {
  try {
    return await primary();
  } catch (error) {
    console.error(`[${label}] Failed, using fallback:`, error);
    return resolveFallback(fallback);
  }
}

/**
 * Wraps a Supabase list query with automatic error handling, empty-data fallback, and mapping.
 *
 * Handles the 3 failure modes:
 * 1. Supabase returns an error → fallback
 * 2. Supabase returns null/empty data → fallback
 * 3. Network/runtime exception → fallback
 *
 * NOTE: Empty results (`data: []`) trigger the fallback. Use `withFallback` instead
 * if empty results should be returned as-is.
 */
export async function queryWithFallback<TRow, TResult>(
  queryFn: () => PromiseLike<{ data: TRow[] | null; error: SupabaseError }>,
  mapper: (row: TRow) => TResult,
  fallback: TResult[] | (() => TResult[]),
  label: string
): Promise<TResult[]> {
  try {
    const { data, error } = await queryFn();

    if (error) {
      console.error(`[${label}] Supabase error:`, error.message);
      return resolveFallback(fallback);
    }

    if (!data || data.length === 0) {
      return resolveFallback(fallback);
    }

    return data.map(mapper);
  } catch (error) {
    console.error(`[${label}] Query failed, using fallback:`, error);
    return resolveFallback(fallback);
  }
}

/**
 * Wraps a Supabase single-row query with fallback.
 * Returns `undefined` for PGRST116 (not found) without logging an error.
 */
export async function queryOneWithFallback<TRow, TResult>(
  queryFn: () => PromiseLike<{
    data: TRow | null;
    error: SupabaseError;
  }>,
  mapper: (row: TRow) => TResult,
  fallback: (() => TResult | undefined) | TResult | undefined,
  label: string
): Promise<TResult | undefined> {
  try {
    const { data, error } = await queryFn();

    if (error) {
      // PGRST116 = not found — not an error, just return undefined
      if (error.code === 'PGRST116') return undefined;
      console.error(`[${label}] Supabase error:`, error.message);
      return resolveFallback(fallback);
    }

    if (!data) {
      return resolveFallback(fallback);
    }

    return mapper(data);
  } catch (error) {
    console.error(`[${label}] Query failed, using fallback:`, error);
    return resolveFallback(fallback);
  }
}

function resolveFallback<T>(fallback: T | (() => T)): T {
  return typeof fallback === 'function' ? (fallback as () => T)() : fallback;
}
