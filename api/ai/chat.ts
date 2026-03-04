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
import { AnthropicProvider, SYSTEM_PROMPT } from '../../src/lib/ai/llm';
import { getRequiredEnv, getAIConfig } from '../../src/lib/ai/config';
import type { ChatMessage, SafetyLevel, Citation } from '../../src/lib/ai/types';

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

function extractCitations(content: string, searchResults: unknown[]): Citation[] {
  const citations: Citation[] = [];
  const citationRegex = /\[SOURCE:\s*([^\|]+)\s*\|\s*([^\]]+)\]/g;

  let match;
  while ((match = citationRegex.exec(content)) !== null) {
    const [, title, url] = match;
    citations.push({
      id: crypto.randomUUID(),
      title: title.trim(),
      url: url.trim(),
      contentType: url.includes('/video') ? 'video' : 'article',
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
    // Parse request
    const { messages, sessionId: providedSessionId } = req.body as {
      messages: ChatMessage[];
      sessionId?: string;
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
    const supabase = createClient(
      getRequiredEnv('VITE_SUPABASE_URL'),
      getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')
    );

    const config = getAIConfig();
    const llmProvider = new AnthropicProvider(getRequiredEnv('ANTHROPIC_API_KEY'));

    // ========================================================================
    // LAYER 1: Input Safety Check
    // ========================================================================

    const safetyCheck = await classifyInputSafety(
      userMessage.content,
      messages.slice(0, -1),
      llmProvider
    );

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

    const searchResults = await retrieveRelevantContent(
      userMessage.content,
      {
        topK: config.retrieval.defaultTopK,
        similarityThreshold: config.retrieval.defaultSimilarityThreshold,
      },
      supabase,
      { getEmbedding: async (text: string) => {
        // OpenAI embedding call here
        // For now, using a placeholder
        return [];
      }}
    );

    // ========================================================================
    // Build augmented prompt with retrieved context
    // ========================================================================

    const contextChunks = searchResults
      .map((result, idx) => `[${idx + 1}] ${result.chunk_text}\nSource: ${result.title} | ${result.url_path}`)
      .join('\n\n');

    const augmentedPrompt = SYSTEM_PROMPT.replace(
      '{retrieved_chunks}',
      contextChunks || 'No relevant content found in Psychage knowledge base.'
    );

    // ========================================================================
    // Generate LLM Response
    // ========================================================================

    const llmMessages = [
      { role: 'system' as const, content: augmentedPrompt },
      ...messages.map(m => ({ role: m.role, content: m.content })),
    ];

    const response = await llmProvider.generateCompletion(llmMessages, {
      model: config.primaryModel,
      maxTokens: 1024,
      temperature: 0.7,
    });

    // ========================================================================
    // LAYER 3: Output Validation
    // ========================================================================

    // Simple validation - check for diagnostic language
    let finalContent = response.content;
    const diagnosticPatterns = [
      /you have (depression|anxiety|bipolar|schizophrenia|ptsd|ocd)/i,
      /this is (depression|anxiety|bipolar|schizophrenia|ptsd|ocd)/i,
      /you are (depressed|anxious|bipolar|schizophrenic)/i,
    ];

    const hasDiagnostic = diagnosticPatterns.some(pattern => pattern.test(finalContent));
    if (hasDiagnostic) {
      finalContent = "I want to make sure I give you accurate information on this topic. For questions like this, I'd recommend checking Psychage's articles directly at psychage.com, or speaking with a licensed mental health professional who can give you personalized guidance.";
    }

    // ========================================================================
    // Extract citations
    // ========================================================================

    const citations = extractCitations(finalContent, searchResults);

    // ========================================================================
    // Return response
    // ========================================================================

    return res.status(200).json({
      message: finalContent,
      citations,
      sessionId,
      safetyLevel: safetyCheck.level,
      isCrisis: false,
      responseTimeMs: Date.now() - startTime,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
