/**
 * MindMate 2.0 - Health Check
 * GET /api/ai/health
 *
 * Reports whether the required environment variables are configured.
 * Deliberately does NOT call the Anthropic API — this endpoint is
 * unauthenticated and un-rate-limited, so a live completion per hit was a
 * token-burn / cost-amplification vector (audit B3-4).
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const checks: Record<string, { set: boolean; hint?: string }> = {
    ANTHROPIC_API_KEY: {
      set: !!process.env.ANTHROPIC_API_KEY,
      hint: 'Required for Claude AI responses',
    },
    VITE_SUPABASE_URL: {
      set: !!process.env.VITE_SUPABASE_URL,
      hint: 'Required for database access',
    },
    SUPABASE_SERVICE_ROLE_KEY: {
      set: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      hint: 'Required for server-side database access',
    },
    OPENAI_API_KEY: {
      set: !!process.env.OPENAI_API_KEY,
      hint: 'Optional — needed for RAG content retrieval (embeddings)',
    },
  };

  const allRequired = checks.ANTHROPIC_API_KEY.set &&
    checks.VITE_SUPABASE_URL.set &&
    checks.SUPABASE_SERVICE_ROLE_KEY.set;

  const status = allRequired ? 'healthy' : 'unhealthy';

  return res.status(status === 'healthy' ? 200 : 503).json({
    status,
    checks,
    timestamp: new Date().toISOString(),
  });
}
