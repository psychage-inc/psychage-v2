/**
 * GET /api/navigator/saved-results
 *
 * Returns the authenticated user's saved navigator results (decrypted).
 * Paginated with cursor-based pagination.
 *
 * Query params:
 * - limit: number (default 10, max 50)
 * - cursor: string (ISO timestamp for pagination)
 */

import { createClient } from '@supabase/supabase-js';
import { decryptResults } from '../save-results/route';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function authenticateUser(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}

export async function GET(request: Request): Promise<Response> {
  try {
    const user = await authenticateUser(request);
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const url = new URL(request.url);
    const limit = Math.min(Number(url.searchParams.get('limit')) || 10, 50);
    const cursor = url.searchParams.get('cursor');

    // Build query
    let query = supabase
      .from('navigator_saved_results')
      .select('id, user_id, encrypted_results, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit + 1); // Fetch one extra to determine has_more

    if (cursor) {
      query = query.lt('created_at', cursor);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[Navigator Saved Results] Query error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch saved results' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const hasMore = data.length > limit;
    const results = data.slice(0, limit);

    // Decrypt each result
    const decryptedResults = results.map((row) => {
      try {
        const decrypted = decryptResults(row.encrypted_results);
        return {
          id: row.id,
          created_at: row.created_at,
          results: JSON.parse(decrypted),
        };
      } catch {
        // If decryption fails, return metadata only
        return {
          id: row.id,
          created_at: row.created_at,
          results: null,
          decryption_error: true,
        };
      }
    });

    const nextCursor = hasMore && results.length > 0
      ? results[results.length - 1].created_at
      : null;

    return new Response(
      JSON.stringify({
        results: decryptedResults,
        cursor: nextCursor,
        has_more: hasMore,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'private, no-store',
        },
      }
    );
  } catch (error) {
    console.error('[Navigator Saved Results] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
