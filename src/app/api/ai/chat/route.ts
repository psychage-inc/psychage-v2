// =============================================================================
// POST /api/ai/chat — Main Conversation Endpoint
// =============================================================================
//
// Flow:
// 1. Rate limit check
// 2. Load or create conversation
// 3. Run input safety classifier
// 4. If CRISIS → immediately return crisis response
// 5. Classify intent
// 6. Retrieve relevant content from vector store
// 7. If provider search intent → also query providers
// 8. Assemble context + call LLM (stream response)
// 9. Run output safety check
// 10. Save messages to database
// 11. Fire anonymous analytics event
// =============================================================================

import { createClient } from '@supabase/supabase-js';
import type {
  ChatRequest,
  ChatResponse,
  SafetyClassification,
  RetrievalResult,
  ProviderSuggestion,
  AIResponse,
} from '@/lib/ai/types';
import { getAIConfig, getRequiredEnv } from '@/lib/ai/config';
import {
  createLLMProvider,
  createEmbeddingProvider,
  generateResponse,
} from '@/lib/ai/llm';
import {
  classifyInputSafety,
  validateOutputSafety,
  generateCrisisResponse,
} from '@/lib/ai/safety';
import { classifyIntent } from '@/lib/ai/intent';
import { retrieveRelevantContent } from '@/lib/ai/retrieval';
import {
  searchProviders,
  extractProviderCriteria,
  formatProviderSuggestion,
} from '@/lib/ai/providers';
import { ConversationManager } from '@/lib/ai/context';
import { AnalyticsTracker, generateSessionHash } from '@/lib/ai/analytics';

// =============================================================================
// Rate Limiting (in-memory for simplicity; replace with Redis in production)
// =============================================================================

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(
  sessionId: string,
  maxPerMinute: number
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const key = `rate:${sessionId}`;
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

// =============================================================================
// Handler
// =============================================================================

export async function handleChatRequest(
  request: ChatRequest
): Promise<ChatResponse> {
  const config = getAIConfig();
  const startTime = Date.now();

  // Initialize clients
  const supabase = createClient(
    getRequiredEnv('SUPABASE_URL'),
    getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')
  );

  const llmProvider = createLLMProvider(
    config.llmProvider,
    getRequiredEnv(
      config.llmProvider === 'anthropic' ? 'ANTHROPIC_API_KEY' : 'OPENAI_API_KEY'
    )
  );

  const safetyProvider = createLLMProvider(
    config.llmProvider,
    getRequiredEnv(
      config.llmProvider === 'anthropic' ? 'ANTHROPIC_API_KEY' : 'OPENAI_API_KEY'
    )
  );

  const embeddingProvider = createEmbeddingProvider(
    getRequiredEnv('OPENAI_API_KEY')
  );

  const conversationManager = new ConversationManager(supabase, config);
  const analytics = new AnalyticsTracker(supabase);

  try {
    // -------------------------------------------------------------------------
    // 1. Rate limit check
    // -------------------------------------------------------------------------
    const rateLimit = checkRateLimit(
      request.sessionId,
      config.rateLimit.anonymous.maxPerMinute
    );

    if (!rateLimit.allowed) {
      throw new RateLimitError(
        `Rate limit exceeded. Try again in ${rateLimit.retryAfter} seconds.`
      );
    }

    // -------------------------------------------------------------------------
    // 2. Load or create conversation
    // -------------------------------------------------------------------------
    let conversation;
    let messages;

    if (request.conversationId) {
      const loaded = await conversationManager.loadConversationBySession(
        request.sessionId,
        request.conversationId
      );

      if (!loaded) {
        throw new NotFoundError('Conversation not found or session mismatch');
      }

      conversation = loaded;
      messages = loaded.messages;
    } else {
      conversation = await conversationManager.createConversation(
        request.sessionId,
        undefined,
        request.language ?? 'en'
      );
      messages = [];

      const sessionHash = await generateSessionHash(request.sessionId);
      analytics.trackConversationStarted(sessionHash, request.language);
    }

    // Save user message
    await conversationManager.addMessage(conversation.id, {
      role: 'user',
      content: request.message,
    });

    // -------------------------------------------------------------------------
    // 3. Run input safety classifier
    // -------------------------------------------------------------------------
    let safetyClassification: SafetyClassification;

    if (config.safety.enableInputClassifier) {
      safetyClassification = await classifyInputSafety(
        request.message,
        messages,
        safetyProvider
      );
    } else {
      safetyClassification = {
        level: 'SAFE',
        confidence: 1,
        trigger: null,
        action: { type: 'PROCEED' },
      };
    }

    // -------------------------------------------------------------------------
    // 4. CRISIS → Immediate crisis response
    // -------------------------------------------------------------------------
    if (safetyClassification.level === 'CRISIS') {
      const crisisContent = generateCrisisResponse(
        conversation.metadata?.detected_region,
        request.language
      );

      const crisisMessage = await conversationManager.addMessage(
        conversation.id,
        {
          role: 'assistant',
          content: crisisContent,
          safety_flag: 'CRISIS',
          response_time_ms: Date.now() - startTime,
        }
      );

      const sessionHash = await generateSessionHash(request.sessionId);
      analytics.trackCrisisDetected(sessionHash, request.language);
      await analytics.flush();

      return {
        conversationId: conversation.id,
        messageId: crisisMessage.id,
        content: crisisContent,
        sources: [],
        suggestedFollowUps: [
          'Would you like me to help you find a professional to talk to?',
        ],
        suggestedResources: [],
        safetyLevel: 'CRISIS',
      };
    }

    // Handle HARMFUL_REQUEST
    if (safetyClassification.level === 'HARMFUL_REQUEST') {
      const blockMessage =
        safetyClassification.action.type === 'BLOCK'
          ? safetyClassification.action.reason
          : "I'm not able to help with that request. I'm here to provide mental health education and connect you with professional resources.";

      const savedMessage = await conversationManager.addMessage(
        conversation.id,
        {
          role: 'assistant',
          content: blockMessage,
          safety_flag: 'HARMFUL_REQUEST',
          response_time_ms: Date.now() - startTime,
        }
      );

      return {
        conversationId: conversation.id,
        messageId: savedMessage.id,
        content: blockMessage,
        sources: [],
        suggestedFollowUps: [
          'What mental health topic would you like to learn about?',
        ],
        suggestedResources: [],
        safetyLevel: 'HARMFUL_REQUEST',
      };
    }

    // Handle OUT_OF_SCOPE
    if (safetyClassification.level === 'OUT_OF_SCOPE') {
      const redirectMessage =
        safetyClassification.action.type === 'SCOPE_REDIRECT'
          ? safetyClassification.action.message
          : "I'm designed to help with mental health education and finding resources on Psychage. I'd be happy to help with any mental health questions you have.";

      const savedMessage = await conversationManager.addMessage(
        conversation.id,
        {
          role: 'assistant',
          content: redirectMessage,
          safety_flag: null,
          intent_classification: 'off_topic',
          response_time_ms: Date.now() - startTime,
        }
      );

      return {
        conversationId: conversation.id,
        messageId: savedMessage.id,
        content: redirectMessage,
        sources: [],
        suggestedFollowUps: [
          'What mental health topic would you like to learn about?',
          'Would you like to explore our condition guides?',
          'Can I help you find a mental health professional?',
        ],
        suggestedResources: [],
        safetyLevel: 'SAFE',
      };
    }

    // -------------------------------------------------------------------------
    // 5. Classify intent
    // -------------------------------------------------------------------------
    const intentResult = await classifyIntent(
      request.message,
      messages,
      safetyProvider
    );

    // -------------------------------------------------------------------------
    // 6. Retrieve relevant content
    // -------------------------------------------------------------------------
    let retrievedContent: RetrievalResult[] = [];

    if (
      intentResult.primary !== 'greeting' &&
      intentResult.primary !== 'feedback' &&
      intentResult.primary !== 'meta'
    ) {
      retrievedContent = await retrieveRelevantContent(
        request.message,
        {
          topK: 5,
          contentTypes:
            intentResult.primary === 'coping_request'
              ? ['coping_strategy']
              : undefined,
          conditionTags: intentResult.entities.conditions,
          language: request.language,
        },
        supabase,
        embeddingProvider
      );
    }

    // -------------------------------------------------------------------------
    // 7. Provider search (if intent matches)
    // -------------------------------------------------------------------------
    let providerSuggestion: ProviderSuggestion | undefined;

    if (intentResult.primary === 'provider_search') {
      const criteria = extractProviderCriteria(
        request.message,
        intentResult.entities
      );
      providerSuggestion = await searchProviders(criteria, supabase);
    }

    // -------------------------------------------------------------------------
    // 8. Generate response
    // -------------------------------------------------------------------------
    const { messages: _historyMessages, summary } =
      await conversationManager.getFormattedHistory(
        conversation.id,
        config.conversation.maxHistoryForLLM
      );

    const generationContext = {
      userLanguage: request.language ?? 'en',
      detectedRegion: conversation.metadata?.detected_region,
      safetyClassification,
      conversationTurnCount: messages.length,
    };

    let aiResponse: AIResponse;

    // Special handling for certain intents
    if (intentResult.primary === 'greeting') {
      aiResponse = {
        content:
          "Hello! I'm Psychage AI Help, your mental health education guide. I can help you learn about mental health conditions, find coping strategies, discover Psychage articles and tools, or connect you with mental health professionals. What would you like to know about?",
        sourcesCited: [],
        suggestedFollowUps: [
          'What is anxiety?',
          'How can I manage stress?',
          'Find a therapist near me',
        ],
        suggestedResources: [],
        safetyLevel: 'SAFE',
        tokensUsed: { prompt: 0, completion: 0 },
      };
    } else if (intentResult.primary === 'meta') {
      aiResponse = {
        content:
          "I'm Psychage AI Help, created by Psychage — a global mental health education platform founded by Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology. I can help you understand mental health topics, find articles and resources, suggest coping strategies, and connect you with mental health professionals. I'm not a therapist or doctor, and I don't diagnose or provide medical advice. Think of me as a knowledgeable guide to Psychage's library of evidence-based mental health content.",
        sourcesCited: [],
        suggestedFollowUps: [
          'What mental health topics can you help with?',
          'Show me your articles on depression',
          'How do I find a therapist?',
        ],
        suggestedResources: [],
        safetyLevel: 'SAFE',
        tokensUsed: { prompt: 0, completion: 0 },
      };
    } else if (intentResult.primary === 'tool_route') {
      aiResponse = {
        content:
          'Psychage has several helpful tools you can use:\n\n' +
          '- **[Symptom Navigator](/tools/symptom-navigator)** — Helps you understand your symptoms and find relevant information\n' +
          '- **[Clarity Score](/clarity-score)** — A cognitive assessment to understand your mental clarity\n' +
          '- **[Mood Journal](/tools/mood-journal)** — Track your moods and identify patterns over time\n' +
          '- **[Sleep Architect](/tools/sleep-architect)** — Tools to improve your sleep quality\n\n' +
          'Which tool would you like to try?',
        sourcesCited: [],
        suggestedFollowUps: [
          'Tell me more about the Symptom Navigator',
          'How does the Clarity Score work?',
          'I want to start tracking my mood',
        ],
        suggestedResources: [],
        safetyLevel: 'SAFE',
        tokensUsed: { prompt: 0, completion: 0 },
      };
    } else {
      // Full LLM generation
      aiResponse = await generateResponse(
        request.message,
        messages,
        retrievedContent,
        generationContext,
        llmProvider,
        config,
        summary
      );

      // Append provider info if available
      if (providerSuggestion && providerSuggestion.providers.length > 0) {
        const providerText = formatProviderSuggestion(providerSuggestion);
        aiResponse.content += '\n\n' + providerText;
        aiResponse.providerSuggestion = providerSuggestion;
      }
    }

    // -------------------------------------------------------------------------
    // 9. Output safety check
    // -------------------------------------------------------------------------
    if (config.safety.enableOutputValidator) {
      const outputCheck = validateOutputSafety(aiResponse.content);
      if (!outputCheck.safe) {
        console.warn('Output safety violations:', outputCheck.violations);
        aiResponse.content = outputCheck.sanitized;
      }
    }

    // -------------------------------------------------------------------------
    // 10. Save assistant message
    // -------------------------------------------------------------------------
    const assistantMessage = await conversationManager.addMessage(
      conversation.id,
      {
        role: 'assistant',
        content: aiResponse.content,
        sources_cited: aiResponse.sourcesCited,
        intent_classification: intentResult.primary,
        safety_flag: safetyClassification.level === 'SAFE' ? null : safetyClassification.level,
        response_time_ms: Date.now() - startTime,
        token_count_prompt: aiResponse.tokensUsed.prompt,
        token_count_completion: aiResponse.tokensUsed.completion,
      }
    );

    // -------------------------------------------------------------------------
    // 11. Analytics
    // -------------------------------------------------------------------------
    const sessionHash = await generateSessionHash(request.sessionId);
    analytics.trackMessageSent(
      sessionHash,
      intentResult.primary,
      Date.now() - startTime,
      aiResponse.sourcesCited.length,
      request.language
    );

    if (aiResponse.sourcesCited.length > 0) {
      analytics.trackArticleLinked(
        sessionHash,
        aiResponse.sourcesCited.length,
        request.language
      );
    }

    if (providerSuggestion) {
      analytics.trackProviderSuggested(sessionHash, request.language);
    }

    // Fire and forget
    analytics.flush();

    // -------------------------------------------------------------------------
    // Return response
    // -------------------------------------------------------------------------
    return {
      conversationId: conversation.id,
      messageId: assistantMessage.id,
      content: aiResponse.content,
      sources: aiResponse.sourcesCited,
      suggestedFollowUps: aiResponse.suggestedFollowUps,
      suggestedResources: aiResponse.suggestedResources,
      providerSuggestion: aiResponse.providerSuggestion,
      safetyLevel: aiResponse.safetyLevel,
    };
  } finally {
    await analytics.dispose();
  }
}

// =============================================================================
// Error Classes
// =============================================================================

class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export { RateLimitError, NotFoundError };
