// =============================================================================
// Psychage AI Help — Module Exports
// =============================================================================

// Types
export type * from './types';

// Configuration
export { getAIConfig, getEnv, getRequiredEnv, getOptionalEnv } from './config';

// LLM Providers
export {
  AnthropicProvider,
  OpenAIProvider,
  createLLMProvider,
  createEmbeddingProvider,
  generateResponse,
  summarizeConversation,
  assembleMessages,
  SYSTEM_PROMPT,
} from './llm';

// Safety System
export {
  classifyInputSafety,
  validateOutputSafety,
  analyzeConversationPatterns,
  generateCrisisResponse,
  getCrisisResourcesForRegion,
} from './safety';

// Intent Classification
export { classifyIntent } from './intent';

// Retrieval Engine
export { retrieveRelevantContent } from './retrieval';

// Provider Search
export {
  searchProviders,
  extractProviderCriteria,
  formatProviderSuggestion,
} from './providers';

// Conversation Management
export { ConversationManager } from './context';

// Analytics
export { AnalyticsTracker, generateSessionHash } from './analytics';

// Ingestion Pipeline
export {
  ingestDocument,
  ingestDocuments,
  cleanContent,
  chunkContent,
  estimateTokens,
  parseMarkdownDocument,
  parseJSONDocument,
} from './ingestion';
