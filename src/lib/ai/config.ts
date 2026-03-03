// =============================================================================
// Psychage AI Help — Configuration
// =============================================================================

import type { AIConfig, LLMProviderName } from './types';

// =============================================================================
// Default Configuration
// =============================================================================

export function getAIConfig(): AIConfig {
  const provider = (getEnv('LLM_PROVIDER', 'anthropic') as LLMProviderName);

  return {
    llmProvider: provider,
    primaryModel:
      provider === 'anthropic'
        ? 'claude-sonnet-4-5-20250929'
        : 'gpt-4o',
    safetyModel:
      provider === 'anthropic'
        ? 'claude-haiku-4-5-20251001'
        : 'gpt-4o-mini',
    embeddingModel: 'text-embedding-3-small',
    summarizationModel:
      provider === 'anthropic'
        ? 'claude-haiku-4-5-20251001'
        : 'gpt-4o-mini',
    retrieval: {
      defaultTopK: 5,
      defaultSimilarityThreshold: 0.72,
      hybridSearchWeight: 0.3,
    },
    conversation: {
      maxTurns: 50,
      maxHistoryForLLM: 10,
      summarizeAfterTurns: 10,
      inactivityTimeoutMinutes: 30,
      anonymousRetentionHours: 24,
    },
    safety: {
      enableInputClassifier: true,
      enableOutputValidator: true,
      enableConversationMonitor: true,
    },
    rateLimit: {
      anonymous: {
        maxPerMinute: 10,
        maxPerHour: 100,
        maxPerDay: 300,
      },
      authenticated: {
        maxPerMinute: 20,
        maxPerHour: 200,
        maxPerDay: -1, // unlimited
      },
      global: {
        maxPerHour: 10000,
      },
    },
  };
}

// =============================================================================
// Environment Variable Helpers
// =============================================================================

export function getEnv(key: string, fallback?: string): string {
  // Server-side (Node.js)
  if (typeof process !== 'undefined' && process.env?.[key]) {
    return process.env[key]!;
  }

  // Client-side (Vite)
  if (typeof import.meta !== 'undefined') {
    const viteKey = `VITE_${key}`;
    const env = ((import.meta as unknown) as Record<string, Record<string, string>>).env;
    if (env?.[viteKey]) return env[viteKey];
    if (env?.[key]) return env[key];
  }

  if (fallback !== undefined) return fallback;
  throw new Error(`Missing required environment variable: ${key}`);
}

export function getRequiredEnv(key: string): string {
  return getEnv(key);
}

export function getOptionalEnv(key: string, fallback: string = ''): string {
  try {
    return getEnv(key, fallback);
  } catch {
    return fallback;
  }
}
