/**
 * MindMate 2.0 - Chat API
 * POST /api/ai/chat
 *
 * Streaming chat endpoint with RAG, safety layers, and crisis detection
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { classifyInputSafety, generateCrisisResponse, validateOutputSafety } from '../../src/lib/ai/safety';
import { sanitizeClientMessages } from '../../src/lib/ai/sanitizeMessages';
import { splitAtSentenceBoundary } from '../../src/lib/ai/streamSafety';
import { retrieveRelevantContent } from '../../src/lib/ai/retrieval';
import { AnthropicProvider, OpenAIProvider, SYSTEM_PROMPT } from '../../src/lib/ai/llm';
import { getRequiredEnv, getOptionalEnv, getAIConfig } from '../../src/lib/ai/config';
import { encodeSSE } from '../../src/lib/ai/streaming';
import { getCountryEntry } from '../../src/lib/crisis';
import type { Message, SafetyLevel, Citation, RetrievalResult } from '../../src/lib/ai/types';

// ============================================================================
// Rate Limiting (in-memory - use Redis/Upstash for production)
// ============================================================================

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(
  identifier: string,
  maxPerMinute: number = 20
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const key = `rate:${identifier}`;
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + 60000 });
    return { allowed: true };
  }

  if (entry.count >= maxPerMinute) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count++;
  return { allowed: true };
}

// ============================================================================
// Helper: Generate Session ID
// ============================================================================

function generateSessionId(): string {
  return crypto.randomUUID();
}

// ============================================================================
// Helper: Extract Citations from LLM Response
// ============================================================================

function extractCitations(content: string, searchResults: RetrievalResult[]): Citation[] {
  const citations: Citation[] = [];
  const seen = new Set<string>();
  const citationRegex = /\[SOURCE:\s*([^|]+?)\s*\|\s*([^\]]+)\]/g;

  let match;
  while ((match = citationRegex.exec(content)) !== null) {
    const [, rawTitle, rawUrl] = match;
    const title = rawTitle.trim();
    const url = rawUrl.trim();

    // Only emit citations that map to actually-retrieved content — drop any
    // [SOURCE: …] the model hallucinated so invented links never render (B3-9).
    const source = searchResults.find(
      (r) => r.documentTitle === title || r.documentUrlPath === url
    );
    if (!source || seen.has(source.documentId)) continue;
    seen.add(source.documentId);

    citations.push({
      document_id: source.documentId,
      title: source.documentTitle,
      url_path: source.documentUrlPath,
    });
  }

  return citations;
}

// ============================================================================
// Main Handler
// ============================================================================

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Env preflight — fail fast with a named-var error instead of throwing mid-request
  const requiredEnv = ['ANTHROPIC_API_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'VITE_SUPABASE_URL'];
  const missingEnv = requiredEnv.filter((k) => !process.env[k]);
  if (missingEnv.length > 0) {
    console.error('[mindmate] missing env vars:', missingEnv);
    return res.status(503).json({
      error: `MindMate misconfigured: missing env ${missingEnv.join(', ')}`,
      code: 'ENV_MISSING',
      missing: missingEnv,
    });
  }

  const startTime = Date.now();

  try {
    // Parse request
    const { messages, sessionId: providedSessionId, stream: requestStream, region: clientRegion } = req.body as {
      messages: Message[];
      sessionId?: string;
      stream?: boolean;
      region?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const userMessage = messages[messages.length - 1];
    if (!userMessage || userMessage.role !== 'user') {
      return res.status(400).json({ error: 'Last message must be from user' });
    }

    // Role allow-list — never forward a client-supplied `system` (or unknown)
    // role to the model; the server prompt is the only system message (B3-1).
    const safeMessages = sanitizeClientMessages(messages);

    // Initialize Supabase admin client (auth validation + RAG retrieval)
    const supabase = createClient(
      getRequiredEnv('VITE_SUPABASE_URL'),
      getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')
    );

    // Auth gate — require a valid Supabase JWT
    const authHeader = req.headers.authorization;
    const token = typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : null;

    if (!token) {
      return res.status(401).json({ error: 'Authentication required', code: 'NO_TOKEN' });
    }

    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData?.user) {
      return res.status(401).json({ error: 'Invalid or expired session', code: 'INVALID_TOKEN' });
    }
    const user = authData.user;

    // Generate or use provided session ID
    const sessionId = providedSessionId || generateSessionId();

    // Rate limit check (per-user)
    const rateLimit = checkRateLimit(user.id);
    if (!rateLimit.allowed) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        retryAfter: rateLimit.retryAfter,
      });
    }

    const config = getAIConfig();
    const llmProvider = new AnthropicProvider(getRequiredEnv('ANTHROPIC_API_KEY'));

    // ========================================================================
    // LAYER 1: Input Safety Check
    // ========================================================================

    const safetyCheck = await classifyInputSafety(
      userMessage.content,
      safeMessages.slice(0, -1),
      llmProvider
    );

    // ========================================================================
    // Crisis Bypass - Never invoke LLM for crisis
    // ========================================================================

    if (safetyCheck.level === 'CRISIS') {
      // Resolve the user's region for crisis resources: a validated client-supplied
      // region wins, else the Vercel geo header, else the international set — never
      // a silent US default (B3/C-2).
      const headerCountry = req.headers['x-vercel-ip-country'];
      const crisisRegion =
        [clientRegion, typeof headerCountry === 'string' ? headerCountry : undefined]
          .map((c) => (typeof c === 'string' ? c.toUpperCase() : undefined))
          .find((c) => c && getCountryEntry(c)) ?? 'XX';
      const crisisContent = generateCrisisResponse(crisisRegion, 'en');

      return res.status(200).json({
        message: crisisContent,
        citations: [],
        sessionId,
        safetyLevel: 'CRISIS' as SafetyLevel,
        isCrisis: true,
      });
    }

    // ========================================================================
    // Handle Harmful Requests
    // ========================================================================

    if (safetyCheck.level === 'HARMFUL_REQUEST') {
      return res.status(200).json({
        message: "I'm not able to help with that request. I'm here to provide mental health education and connect you with professional resources.",
        citations: [],
        sessionId,
        safetyLevel: 'HARMFUL_REQUEST' as SafetyLevel,
        isCrisis: false,
      });
    }

    // ========================================================================
    // RAG: Search for relevant Psychage content
    // ========================================================================

    // Embeddings require OpenAI — gracefully skip RAG if unavailable
    const openaiKey = getOptionalEnv('OPENAI_API_KEY');
    let searchResults: Awaited<ReturnType<typeof retrieveRelevantContent>> = [];

    if (openaiKey) {
      const embeddingProvider = new OpenAIProvider(openaiKey);
      searchResults = await retrieveRelevantContent(
        userMessage.content,
        {
          topK: config.retrieval.defaultTopK,
          similarityThreshold: config.retrieval.defaultSimilarityThreshold,
        },
        supabase,
        embeddingProvider
      );
    }

    // ========================================================================
    // Build augmented prompt with retrieved context
    // ========================================================================

    const contextChunks = searchResults
      .map((result, idx) => `[${idx + 1}] ${result.chunkText}\nSource: ${result.documentTitle} | ${result.documentUrlPath}`)
      .join('\n\n');

    const augmentedPrompt = SYSTEM_PROMPT.replace(
      '{retrieved_chunks}',
      contextChunks || 'No relevant content found in Psychage knowledge base.'
    );

    // ========================================================================
    // Build LLM messages
    // ========================================================================

    const llmMessages = [
      { role: 'system' as const, content: augmentedPrompt },
      ...safeMessages.map(m => ({ role: m.role, content: m.content })),
    ];

    const llmOptions = {
      model: config.primaryModel,
      maxTokens: 1024,
      temperature: 0.7,
    };

    // Output validation fallback — sent in place of any response that trips
    // validateOutputSafety (diagnostic/therapeutic/dismissive/certainty language).
    const DIAGNOSTIC_FALLBACK = "I want to make sure I give you accurate information on this topic. For questions like this, I'd recommend checking Psychage's articles directly at psychage.com, or speaking with a licensed mental health professional who can give you personalized guidance.";

    // ========================================================================
    // STREAMING PATH
    // ========================================================================

    if (requestStream) {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      });

      // Track client disconnect to stop LLM generation
      let clientDisconnected = false;
      req.on('close', () => { clientDisconnected = true; });

      // Send metadata immediately
      res.write(encodeSSE({ type: 'metadata', sessionId }));
      res.write(encodeSSE({ type: 'safety', level: safetyCheck.level as SafetyLevel }));

      // safeContent: validated + already flushed to client.
      // pending: buffered tokens not yet at a sentence boundary / not yet validated.
      let safeContent = '';
      let pending = '';
      let firstTokenTime: number | null = null;
      let safetyViolation = false;

      try {
        for await (const chunk of llmProvider.streamCompletion(llmMessages, llmOptions)) {
          if (clientDisconnected || chunk.done) break;

          if (firstTokenTime === null) {
            firstTokenTime = Date.now();
          }

          pending += chunk.content;
          const { ready, rest } = splitAtSentenceBoundary(pending);
          if (!ready) continue;

          // Validate completed sentence(s) BEFORE flushing them to the client.
          if (!validateOutputSafety(safeContent + ready).safe) {
            safetyViolation = true;
            break;
          }
          safeContent += ready;
          pending = rest;
          res.write(encodeSSE({ type: 'token', content: ready }));
        }

        // Flush + validate any trailing partial sentence (no boundary at EOS).
        if (!safetyViolation && pending) {
          if (!validateOutputSafety(safeContent + pending).safe) {
            safetyViolation = true;
          } else {
            safeContent += pending;
            res.write(encodeSSE({ type: 'token', content: pending }));
            pending = '';
          }
        }

        let fullContent = safeContent;
        if (safetyViolation) {
          // Withhold the offending content; replace the whole message. The
          // client treats SAFETY_VIOLATION as the final replacement text.
          fullContent = DIAGNOSTIC_FALLBACK;
          res.write(encodeSSE({ type: 'error', message: fullContent, code: 'SAFETY_VIOLATION' }));
        }

        // Extract citations and send
        const citations = extractCitations(fullContent, searchResults);
        if (citations.length > 0) {
          res.write(encodeSSE({ type: 'citations', citations }));
        }

        // Done event with metrics
        const usage = llmProvider.lastStreamUsage;
        res.write(encodeSSE({
          type: 'done',
          responseTimeMs: Date.now() - startTime,
          timeToFirstTokenMs: firstTokenTime ? firstTokenTime - startTime : 0,
          tokensUsed: usage ?? undefined,
        }));
      } catch (streamError) {
        console.error('Streaming error:', streamError);
        res.write(encodeSSE({
          type: 'error',
          message: 'Something went wrong during generation. Please try again.',
          code: 'LLM_ERROR',
        }));
      }

      res.end();
      return;
    }

    // ========================================================================
    // NON-STREAMING PATH (existing, preserved for backward compat / rollback)
    // ========================================================================

    const response = await llmProvider.generateCompletion(llmMessages, llmOptions);

    let finalContent = response.content;
    if (!validateOutputSafety(finalContent).safe) {
      finalContent = DIAGNOSTIC_FALLBACK;
    }

    const citations = extractCitations(finalContent, searchResults);

    return res.status(200).json({
      message: finalContent,
      citations,
      sessionId,
      safetyLevel: safetyCheck.level,
      isCrisis: false,
      responseTimeMs: Date.now() - startTime,
    });

  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[mindmate] chat handler error:', errMsg, error);
    // Surface the underlying cause via `error` so chatService can display it
    return res.status(500).json({
      error: `MindMate request failed: ${errMsg}`,
      code: 'HANDLER_ERROR',
    });
  }
}
