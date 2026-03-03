/**
 * CRISIS COMPANION API ROUTE
 *
 * Anthropic Claude API endpoint for empathetic AI responses.
 *
 * CRITICAL: NEVER forward raw user text containing crisis keywords.
 * Only send: tier, sanitized context summary, locale, country code.
 *
 * Rate limiting: 20 calls per session (TIER 3 exempt from limits).
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { CrisisCompanionRequest, CrisisCompanionResponse } from '../../src/crisis/types/crisis.types';
import { getSystemPromptForTier } from '../../src/crisis/data/systemPrompts';

// ==================== RATE LIMITING ====================

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(
  sessionId: string,
  maxCalls: number = 20,
  tier: number
): { allowed: boolean; retryAfter?: number } {
  // Tier 3 exempt from limits (crisis situations)
  if (tier === 3) {
    return { allowed: true };
  }

  const now = Date.now();
  const key = `crisis-companion:${sessionId}`;
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    // Reset window (1 hour)
    rateLimitStore.set(key, { count: 1, resetAt: now + 3600000 });
    return { allowed: true };
  }

  if (entry.count >= maxCalls) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count++;
  return { allowed: true };
}

// ==================== HANDLER ====================

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tier, context, locale, countryCode, sessionTurn }: CrisisCompanionRequest = req.body;

    // Validate tier
    if (![1, 2, 3].includes(tier)) {
      return res.status(400).json({ error: 'Invalid tier (must be 1, 2, or 3)' });
    }

    // Validate context (sanitized, max 1000 chars)
    if (!context || typeof context !== 'string' || context.length > 1000) {
      return res.status(400).json({ error: 'Invalid context (must be string, max 1000 chars)' });
    }

    // Validate sessionTurn
    if (typeof sessionTurn !== 'number' || sessionTurn < 0) {
      return res.status(400).json({ error: 'Invalid sessionTurn' });
    }

    // Get session ID from headers or use 'anonymous'
    const sessionId = (req.headers['x-session-id'] as string) || 'anonymous';

    // Check rate limit
    const rateCheck = checkRateLimit(sessionId, 20, tier);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        message: "I hear that you're going through something difficult. If you need immediate support, please reach out to a crisis helpline.",
        rateLimitExceeded: true,
        retryAfter: rateCheck.retryAfter,
      });
    }

    // Get Anthropic API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    // Get tier-specific system prompt
    const systemPrompt = getSystemPromptForTier(tier);

    // Call Anthropic API
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1024,
        temperature: 0.7,
        system: systemPrompt,
        messages: [
          { role: 'user', content: context }  // Sanitized context only
        ],
      }),
    });

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      throw new Error(`Anthropic API error (${anthropicResponse.status}): ${errorText}`);
    }

    const data = await anthropicResponse.json();
    const message = data.content[0].text;

    const response: CrisisCompanionResponse = {
      message,
      followUpPrompt: tier === 3 ? undefined : 'How are you feeling right now?',
    };

    return res.status(200).json(response);

  } catch (apiError) {
    console.error('[Crisis Companion API Error]', apiError);

    // CRITICAL: Never fail on crisis — return supportive message
    const { tier } = req.body;
    return res.status(200).json({
      message: "I hear that you're going through something difficult. Please know that support is available right now.",
      followUpPrompt: tier === 3 ? undefined : 'Would you like to talk about what\'s on your mind?',
    });
  }
}
