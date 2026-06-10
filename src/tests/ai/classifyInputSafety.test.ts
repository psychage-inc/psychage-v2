// =============================================================================
// Input classifier fail direction (B3-3) — on classifier error with no keyword
// match, fail CLOSED to WATCH rather than open to SAFE.
// =============================================================================

import { describe, it, expect, vi } from 'vitest';
import { classifyInputSafety } from '@/lib/ai/safety';
import type { LLMProvider } from '@/lib/ai/types';

function throwingLLM(): LLMProvider {
  return {
    generateCompletion: vi.fn().mockRejectedValue(new Error('classifier timeout')),
    streamCompletion: vi.fn(),
    generateEmbedding: vi.fn(),
    generateEmbeddings: vi.fn(),
  };
}

describe('classifyInputSafety — failure direction', () => {
  it('returns WATCH when the classifier errors and no keyword matched', async () => {
    const result = await classifyInputSafety(
      'Can you explain how mindfulness breathing works?',
      [],
      throwingLLM(),
    );
    expect(result.level).toBe('WATCH');
  });

  it('still honors a crisis keyword pre-check (never reaches the LLM)', async () => {
    const result = await classifyInputSafety('I want to kill myself', [], throwingLLM());
    expect(result.level).toBe('CRISIS');
  });
});
