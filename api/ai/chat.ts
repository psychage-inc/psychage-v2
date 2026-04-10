/**
 * MindMate 2.0 - Chat API
 * POST /api/ai/chat
 *
 * Streaming chat endpoint with RAG, safety layers, and crisis detection
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { classifyInputSafety, generateCrisisResponse } from '../../src/lib/ai/safety';
import { retrieveRelevantContent } from '../../src/lib/ai/retrieval';
import { AnthropicProvider, OpenAIProvider, SYSTEM_PROMPT } from '../../src/lib/ai/llm';
import { getRequiredEnv, getOptionalEnv, getAIConfig } from '../../src/lib/ai/config';
import { encodeSSE } from '../../src/lib/ai/streaming';
import type { Message, SafetyLevel, Citation } from '../../src/lib/ai/types';

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

function extractCitations(content: string, _searchResults: unknown[]): Citation[] {
  const citations: Citation[] = [];
  const citationRegex = /\[SOURCE:\s*([^|]+?)\s*\|\s*([^\]]+)\]/g;

  let match;
  while ((match = citationRegex.exec(content)) !== null) {
    const [, title, url] = match;
    citations.push({
      document_id: crypto.randomUUID(),
      title: title.trim(),
      url_path: url.trim(),
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

  const startTime = Date.now();

  try {
    // ========================================================================
    // Preflight: Check required environment variables
    // ========================================================================

    const missingEnvVars: string[] = [];
    if (!process.env.ANTHROPIC_API_KEY) missingEnvVars.push('ANTHROPIC_API_KEY');
    if (!process.env.VITE_SUPABASE_URL) missingEnvVars.push('VITE_SUPABASE_URL');
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missingEnvVars.push('SUPABASE_SERVICE_ROLE_KEY');

    if (missingEnvVars.length > 0) {
      console.error(`[MindMate] Missing env vars: ${missingEnvVars.join(', ')}`);
      return res.status(500).json({
        error: `Server configuration error: missing ${missingEnvVars.join(', ')}. Add these to your Vercel environment variables.`,
      });
    }

    // Parse request
    const { messages, sessionId: providedSessionId, stream: requestStream } = req.body as {
      messages: Message[];
      sessionId?: string;
      stream?: boolean;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const userMessage = messages[messages.length - 1];
    if (!userMessage || userMessage.role !== 'user') {
      return res.status(400).json({ error: 'Last message must be from user' });
    }

    // Generate or use provided session ID
    const sessionId = providedSessionId || generateSessionId();

    // Rate limit check
    const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    const identifier = Array.isArray(clientIp) ? clientIp[0] : clientIp;

    const rateLimit = checkRateLimit(identifier as string);
    if (!rateLimit.allowed) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        retryAfter: rateLimit.retryAfter,
      });
    }

    // Initialize clients
    console.log('[MindMate] Initializing clients...');
    const supabase = createClient(
      getRequiredEnv('VITE_SUPABASE_URL'),
      getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')
    );

    const config = getAIConfig();
    const llmProvider = new AnthropicProvider(getRequiredEnv('ANTHROPIC_API_KEY'));

    // ========================================================================
    // LAYER 1: Input Safety Check
    // ========================================================================

    console.log('[MindMate] Running safety check...');
    const safetyCheck = await classifyInputSafety(
      userMessage.content,
      messages.slice(0, -1),
      llmProvider
    );
    console.log(`[MindMate] Safety: ${safetyCheck.level} (confidence: ${safetyCheck.confidence})`);

    // ========================================================================
    // Crisis Bypass - Never invoke LLM for crisis
    // ========================================================================

    if (safetyCheck.level === 'CRISIS') {
      const crisisContent = generateCrisisResponse('US', 'en');

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
      ...messages.map(m => ({ role: m.role, content: m.content })),
    ];

    const llmOptions = {
      model: config.primaryModel,
      maxTokens: 1024,
      temperature: 0.7,
    };

    // Output validation helper
    const diagnosticPatterns = [
      /you have (depression|anxiety|bipolar|schizophrenia|ptsd|ocd)/i,
      /this is (depression|anxiety|bipolar|schizophrenia|ptsd|ocd)/i,
      /you are (depressed|anxious|bipolar|schizophrenic)/i,
    ];

    const DIAGNOSTIC_FALLBACK = "I want to make sure I give you accurate information on this topic. For questions like this, I'd recommend checking Psychage's articles directly at psychage.com, or speaking with a licensed mental health professional who can give you personalized guidance.";

    // ========================================================================
    // STREAMING PATH
    // ========================================================================

    if (requestStream) {
      console.log(`[MindMate] Starting stream (model: ${llmOptions.model}, RAG chunks: ${searchResults.length})`);
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

      let fullContent = '';
      let firstTokenTime: number | null = null;

      try {
        for await (const chunk of llmProvider.streamCompletion(llmMessages, llmOptions)) {
          if (clientDisconnected || chunk.done) break;

          if (firstTokenTime === null) {
            firstTokenTime = Date.now();
          }

          fullContent += chunk.content;
          res.write(encodeSSE({ type: 'token', content: chunk.content }));
        }

        // Output validation on accumulated content
        const hasDiagnostic = diagnosticPatterns.some(p => p.test(fullContent));
        if (hasDiagnostic) {
          fullContent = DIAGNOSTIC_FALLBACK;
          // Send a replacement — client should use this as the final text
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
    const hasDiagnostic = diagnosticPatterns.some(pattern => pattern.test(finalContent));
    if (hasDiagnostic) {
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[MindMate] Chat API error:', errorMessage, error);
    return res.status(500).json({
      error: errorMessage,
    });
  }
}
