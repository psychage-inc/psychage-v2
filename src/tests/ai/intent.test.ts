// =============================================================================
// Intent Classification Tests
// =============================================================================

import { describe, it, expect, vi } from 'vitest';
import { classifyIntent } from '@/lib/ai/intent';
import type { Message, LLMProvider } from '@/lib/ai/types';

// =============================================================================
// Mock LLM Provider
// =============================================================================

function createMockLLM(intent: string, confidence: number = 0.9): LLMProvider {
  return {
    generateCompletion: vi.fn().mockResolvedValue({
      content: JSON.stringify({
        intent,
        confidence,
        entities: {},
      }),
      tokensUsed: { prompt: 50, completion: 30 },
      model: 'mock',
      finishReason: 'stop',
    }),
    streamCompletion: vi.fn(),
    generateEmbedding: vi.fn(),
    generateEmbeddings: vi.fn(),
  };
}

const emptyHistory: Message[] = [];

// =============================================================================
// Quick Classification (no LLM needed)
// =============================================================================

describe('Intent Classification', () => {
  describe('Greeting detection', () => {
    const greetings = ['Hi', 'Hello', 'Hey there', 'Good morning', 'Howdy'];

    for (const msg of greetings) {
      it(`should classify "${msg}" as greeting`, async () => {
        const mockLLM = createMockLLM('greeting');
        const result = await classifyIntent(msg, emptyHistory, mockLLM);
        expect(result.primary).toBe('greeting');
        expect(result.confidence).toBeGreaterThanOrEqual(0.85);
      });
    }
  });

  describe('Feedback detection', () => {
    const feedbackMessages = ['Thanks', 'Thank you', 'That was helpful', 'Great'];

    for (const msg of feedbackMessages) {
      it(`should classify "${msg}" as feedback`, async () => {
        const mockLLM = createMockLLM('feedback');
        const result = await classifyIntent(msg, emptyHistory, mockLLM);
        expect(result.primary).toBe('feedback');
      });
    }
  });

  describe('Meta questions', () => {
    const metaQuestions = [
      'What can you do?',
      'Who made you?',
      'Are you a real therapist?',
      'What are you?',
    ];

    for (const msg of metaQuestions) {
      it(`should classify "${msg}" as meta`, async () => {
        const mockLLM = createMockLLM('meta');
        const result = await classifyIntent(msg, emptyHistory, mockLLM);
        expect(result.primary).toBe('meta');
      });
    }
  });

  describe('Provider search detection', () => {
    it('should detect "Find me a therapist in London"', async () => {
      const mockLLM = createMockLLM('provider_search');
      const result = await classifyIntent(
        'Find me a therapist in London',
        emptyHistory,
        mockLLM
      );
      expect(result.primary).toBe('provider_search');
    });

    it('should detect "I need a psychiatrist"', async () => {
      const mockLLM = createMockLLM('provider_search');
      const result = await classifyIntent(
        'I need a psychiatrist',
        emptyHistory,
        mockLLM
      );
      expect(result.primary).toBe('provider_search');
    });

    it('should detect "Can I do therapy online?"', async () => {
      const mockLLM = createMockLLM('provider_search');
      const result = await classifyIntent(
        'Can I do therapy online?',
        emptyHistory,
        mockLLM
      );
      expect(['provider_search', 'educational']).toContain(result.primary);
    });
  });

  describe('Navigation detection', () => {
    it('should detect "Where\'s the article about PTSD?"', async () => {
      const mockLLM = createMockLLM('navigation');
      const result = await classifyIntent(
        "Where's the article about PTSD?",
        emptyHistory,
        mockLLM
      );
      expect(result.primary).toBe('navigation');
    });

    it('should detect "Show me your sleep guide"', async () => {
      const mockLLM = createMockLLM('navigation');
      const result = await classifyIntent(
        'Show me your sleep guide',
        emptyHistory,
        mockLLM
      );
      expect(result.primary).toBe('navigation');
    });
  });

  describe('Coping request detection', () => {
    it('should detect "How can I cope with anxiety right now?"', async () => {
      const mockLLM = createMockLLM('coping_request');
      const result = await classifyIntent(
        'How can I cope with anxiety right now?',
        emptyHistory,
        mockLLM
      );
      expect(result.primary).toBe('coping_request');
    });

    it('should detect "I need help calming down"', async () => {
      const mockLLM = createMockLLM('coping_request');
      const result = await classifyIntent(
        'I need help calming down',
        emptyHistory,
        mockLLM
      );
      expect(result.primary).toBe('coping_request');
    });
  });

  describe('Tool routing detection', () => {
    it('should detect "Can I use the symptom checker?"', async () => {
      const mockLLM = createMockLLM('tool_route');
      const result = await classifyIntent(
        'Can I use the symptom checker?',
        emptyHistory,
        mockLLM
      );
      expect(result.primary).toBe('tool_route');
    });

    it('should detect "Take me to the breathing exercise"', async () => {
      const mockLLM = createMockLLM('tool_route');
      const result = await classifyIntent(
        'Take me to the breathing exercise',
        emptyHistory,
        mockLLM
      );
      expect(result.primary).toBe('tool_route');
    });
  });

  describe('Educational intent (LLM needed)', () => {
    it('should classify "What is depression?" as educational', async () => {
      const mockLLM = createMockLLM('educational', 0.95);
      const result = await classifyIntent(
        'What is depression?',
        emptyHistory,
        mockLLM
      );
      expect(result.primary).toBe('educational');
    });

    it('should classify "How does anxiety affect the brain?" as educational', async () => {
      const mockLLM = createMockLLM('educational', 0.9);
      const result = await classifyIntent(
        'How does anxiety affect the brain?',
        emptyHistory,
        mockLLM
      );
      expect(result.primary).toBe('educational');
    });
  });
});

// =============================================================================
// Entity Extraction Tests
// =============================================================================

describe('Entity Extraction', () => {
  it('should extract condition entities', async () => {
    const mockLLM = createMockLLM('educational');
    const result = await classifyIntent(
      'Tell me about depression and anxiety',
      emptyHistory,
      mockLLM
    );
    expect(result.entities.conditions).toContain('depression');
    expect(result.entities.conditions).toContain('anxiety');
  });

  it('should extract symptom entities', async () => {
    const mockLLM = createMockLLM('symptom_inquiry');
    const result = await classifyIntent(
      "I can't sleep and I feel very tired all the time",
      emptyHistory,
      mockLLM
    );
    expect(result.entities.symptoms).toContain('insomnia');
    expect(result.entities.symptoms).toContain('fatigue');
  });

  it('should extract provider type entities', async () => {
    const mockLLM = createMockLLM('provider_search');
    const result = await classifyIntent(
      'I need a psychiatrist for my ADHD',
      emptyHistory,
      mockLLM
    );
    expect(result.entities.providerType).toBe('psychiatrist');
    expect(result.entities.conditions).toContain('adhd');
  });

  it('should detect multiple symptoms as symptom_inquiry', async () => {
    const mockLLM = createMockLLM('symptom_inquiry');
    const result = await classifyIntent(
      "I can't sleep, I'm always tired, and I can't concentrate",
      emptyHistory,
      mockLLM
    );
    expect(result.primary).toBe('symptom_inquiry');
    expect(result.entities.symptoms?.length).toBeGreaterThanOrEqual(2);
  });
});

// =============================================================================
// Fallback Tests
// =============================================================================

describe('LLM Failure Fallback', () => {
  it('should fall back to quick classification on LLM error', async () => {
    const failingLLM: LLMProvider = {
      generateCompletion: vi.fn().mockRejectedValue(new Error('API error')),
      streamCompletion: vi.fn(),
      generateEmbedding: vi.fn(),
      generateEmbeddings: vi.fn(),
    };

    const result = await classifyIntent('Hello', emptyHistory, failingLLM);
    expect(result.primary).toBe('greeting');
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should default to educational on LLM error with no quick match', async () => {
    const failingLLM: LLMProvider = {
      generateCompletion: vi.fn().mockRejectedValue(new Error('API error')),
      streamCompletion: vi.fn(),
      generateEmbedding: vi.fn(),
      generateEmbeddings: vi.fn(),
    };

    const result = await classifyIntent(
      'Tell me about serotonin and its effects on mood regulation',
      emptyHistory,
      failingLLM
    );
    expect(result.primary).toBe('educational');
  });
});
