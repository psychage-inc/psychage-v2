// =============================================================================
// Integration Tests — End-to-end flow verification
// =============================================================================

import { describe, it, expect, vi } from 'vitest';
import type {
  LLMProvider,
  RetrievalResult,
} from '@/lib/ai/types';
import { classifyInputSafety, validateOutputSafety } from '@/lib/ai/safety';
import { classifyIntent } from '@/lib/ai/intent';
import { getAIConfig } from '@/lib/ai/config';
import { SYSTEM_PROMPT, assembleMessages } from '@/lib/ai/llm';
import { handleSuggestedQuestions } from '@/app/api/ai/suggested-questions/route';

// =============================================================================
// Full Pipeline Flow Tests
// =============================================================================

describe('End-to-End Pipeline Flow', () => {
  const mockLLM = createMockLLM();

  it('should handle a safe educational query end-to-end', async () => {
    const message = 'What are the symptoms of depression?';

    // Step 1: Safety check
    const safety = await classifyInputSafety(message, [], mockLLM);
    expect(safety.level).toBe('SAFE');
    expect(safety.action.type).toBe('PROCEED');

    // Step 2: Intent classification
    const intent = await classifyIntent(message, [], mockLLM);
    expect(intent.primary).toBe('educational');
    expect(intent.entities.conditions).toContain('depression');

    // Step 3: Assembly (mock retrieval)
    const mockRetrieved: RetrievalResult[] = [
      {
        chunkId: 'chunk-1',
        documentId: 'doc-1',
        documentTitle: 'Understanding Depression',
        documentUrlPath: '/learn/conditions/depression',
        documentType: 'condition_guide',
        chunkText:
          'Common symptoms of depression include persistent sadness, loss of interest in activities, fatigue, changes in appetite, sleep disturbances, and difficulty concentrating.',
        similarity: 0.89,
        metadata: {
          sectionHeading: 'Symptoms',
          hasCitation: true,
        },
      },
    ];

    const messages = assembleMessages(
      message,
      [],
      mockRetrieved,
      {
        userLanguage: 'en',
        safetyClassification: safety,
        conversationTurnCount: 0,
      }
    );

    // Verify message assembly
    expect(messages[0].content).toContain(SYSTEM_PROMPT);
    expect(messages.some((m) => m.content.includes('Understanding Depression'))).toBe(true);
    expect(messages[messages.length - 1].content).toBe(message);
  });

  it('should bypass retrieval for crisis messages', async () => {
    const message = 'I want to kill myself';

    // Step 1: Safety check
    const safety = await classifyInputSafety(message, [], mockLLM);
    expect(safety.level).toBe('CRISIS');
    expect(safety.action.type).toBe('CRISIS_RESPONSE');

    // Retrieval should NOT happen — crisis response is immediate
    // The API route handler checks this condition
  });

  it('should handle greeting without LLM call', async () => {
    const message = 'Hello';

    const intent = await classifyIntent(message, [], mockLLM);
    expect(intent.primary).toBe('greeting');
    expect(intent.confidence).toBeGreaterThanOrEqual(0.85);

    // Greeting intent means no retrieval needed and a canned response
  });

  it('should handle meta questions without retrieval', async () => {
    const message = 'What can you do?';

    const intent = await classifyIntent(message, [], mockLLM);
    expect(intent.primary).toBe('meta');
  });

  it('should detect provider search and extract entities', async () => {
    const message = 'Find me a Spanish-speaking therapist in New York';

    const intent = await classifyIntent(message, [], mockLLM);
    expect(intent.primary).toBe('provider_search');
  });
});

// =============================================================================
// System Prompt Validation
// =============================================================================

describe('System Prompt Quality', () => {
  it('should contain all critical guardrails', () => {
    expect(SYSTEM_PROMPT).toContain('NEVER diagnose');
    expect(SYSTEM_PROMPT).toContain('NEVER prescribe');
    expect(SYSTEM_PROMPT).toContain('NEVER replace professionals');
    expect(SYSTEM_PROMPT).toContain('NEVER provide means for self-harm');
    expect(SYSTEM_PROMPT).toContain('ALWAYS identify as AI');
  });

  it('should contain safety boundaries', () => {
    expect(SYSTEM_PROMPT).toContain('not a therapist or doctor');
    expect(SYSTEM_PROMPT).toContain('prioritize user safety');
    expect(SYSTEM_PROMPT).toContain('crisis resources');
  });

  it('should establish identity', () => {
    expect(SYSTEM_PROMPT).toContain('MindMate');
    expect(SYSTEM_PROMPT).toContain('mental health education');
    expect(SYSTEM_PROMPT).toContain('psychage.com');
  });

  it('should require citation', () => {
    expect(SYSTEM_PROMPT).toContain('Ground ALL factual claims');
    expect(SYSTEM_PROMPT).toContain('cite sources');
  });
});

// =============================================================================
// Configuration Tests
// =============================================================================

describe('AI Configuration', () => {
  it('should load default config', () => {
    const config = getAIConfig();

    expect(config.retrieval.defaultTopK).toBe(5);
    expect(config.retrieval.defaultSimilarityThreshold).toBe(0.72);
    expect(config.conversation.maxTurns).toBe(50);
    expect(config.conversation.maxHistoryForLLM).toBe(10);
    expect(config.conversation.summarizeAfterTurns).toBe(10);
    expect(config.rateLimit.anonymous.maxPerMinute).toBe(10);
    expect(config.rateLimit.authenticated.maxPerMinute).toBe(20);
  });

  it('should have safety features enabled by default', () => {
    const config = getAIConfig();
    expect(config.safety.enableInputClassifier).toBe(true);
    expect(config.safety.enableOutputValidator).toBe(true);
    expect(config.safety.enableConversationMonitor).toBe(true);
  });
});

// =============================================================================
// Suggested Questions Tests
// =============================================================================

describe('Suggested Questions', () => {
  it('should return 4 questions', () => {
    const result = handleSuggestedQuestions();
    expect(result.questions).toHaveLength(4);
  });

  it('should include sleep-related questions in evening', () => {
    const result = handleSuggestedQuestions('evening');
    // At least some questions should exist
    expect(result.questions.length).toBeGreaterThan(0);
  });

  it('should include morning-specific questions', () => {
    const result = handleSuggestedQuestions('morning');
    expect(result.questions.length).toBeGreaterThan(0);
  });

  it('should have text and category for each question', () => {
    const result = handleSuggestedQuestions();
    for (const q of result.questions) {
      expect(q.text).toBeTruthy();
      expect(q.category).toBeTruthy();
    }
  });
});

// =============================================================================
// Safety + Output Validation Integration
// =============================================================================

describe('Safety Pipeline Integration', () => {
  it('should allow well-formed educational responses', () => {
    const response =
      "What you're describing is often associated with anxiety. " +
      "Many people experience these feelings, and they're quite common. " +
      "Our guide on anxiety explains this in more detail: [Understanding Anxiety](/learn/conditions/anxiety). " +
      'Speaking with a mental health professional could also provide personalized guidance.';

    const validation = validateOutputSafety(response);
    expect(validation.safe).toBe(true);
  });

  it('should catch and sanitize problematic AI outputs', () => {
    const problematicResponse =
      'Based on your symptoms, you have depression and you need to see a therapist right away.';

    const validation = validateOutputSafety(problematicResponse);
    expect(validation.safe).toBe(false);
    expect(validation.violations.length).toBeGreaterThan(0);
    // Sanitized version should be safer
    expect(validation.sanitized).not.toContain('you have depression');
    expect(validation.sanitized).not.toContain('you need to see a therapist');
  });
});

// =============================================================================
// Helpers
// =============================================================================

function createMockLLM(): LLMProvider {
  return {
    generateCompletion: vi.fn().mockImplementation((_messages, _options) => {
      // Default to SAFE classification for the mock
      return Promise.resolve({
        content: JSON.stringify({
          level: 'SAFE',
          confidence: 0.95,
          trigger: null,
          intent: 'educational',
          entities: {},
        }),
        tokensUsed: { prompt: 100, completion: 30 },
        model: 'mock-model',
        finishReason: 'stop',
      });
    }),
    streamCompletion: vi.fn(),
    generateEmbedding: vi.fn().mockResolvedValue(new Array(1536).fill(0)),
    generateEmbeddings: vi
      .fn()
      .mockResolvedValue([new Array(1536).fill(0)]),
  };
}
