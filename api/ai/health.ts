/**
 * MindMate 2.0 - Health Check
 * GET /api/ai/health
 *
 * Verifies that all required environment variables are set
 * and the Anthropic API key is valid.
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

  // If API key is set, do a quick validation call
  let apiKeyValid = false;
  if (checks.ANTHROPIC_API_KEY.set) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY!,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 10,
          messages: [{ role: 'user', content: 'ping' }],
        }),
      });
      apiKeyValid = response.ok;
      if (!response.ok) {
        const err = await response.text();
        console.error('[MindMate Health] API key validation failed:', response.status, err);
      }
    } catch (err) {
      console.error('[MindMate Health] API key validation error:', err);
    }
  }

  const status = allRequired && apiKeyValid ? 'healthy' : 'unhealthy';

  return res.status(status === 'healthy' ? 200 : 503).json({
    status,
    checks,
    apiKeyValid,
    timestamp: new Date().toISOString(),
  });
}
