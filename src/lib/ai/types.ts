// =============================================================================
// Psychage AI Help — Complete Type Definitions
// =============================================================================

// -----------------------------------------------------------------------------
// Content & Documents
// -----------------------------------------------------------------------------

export type ContentType =
  | 'article'
  | 'condition_guide'
  | 'coping_strategy'
  | 'video_transcript'
  | 'faq'
  | 'tool_description'
  | 'crisis_resource';

export interface ContentDocument {
  id: string;
  type: ContentType;
  title: string;
  slug: string;
  url_path: string;
  content_body: string;
  summary: string;
  condition_tags: string[];
  topic_tags: string[];
  language: string;
  author: string | null;
  sources: ContentSource[];
  last_reviewed: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContentSource {
  title: string;
  url: string;
  type?: string;
}

export interface ChunkMetadata {
  section_heading?: string;
  has_statistics: boolean;
  has_citation: boolean;
  content_type: ContentType;
}

export interface ContentChunk {
  id: string;
  document_id: string;
  chunk_index: number;
  chunk_text: string;
  chunk_summary: string | null;
  embedding: number[];
  token_count: number;
  metadata: ChunkMetadata;
  created_at: string;
}

// -----------------------------------------------------------------------------
// Conversations & Messages
// -----------------------------------------------------------------------------

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Conversation {
  id: string;
  session_id: string;
  user_id: string | null;
  language: string;
  started_at: string;
  last_message_at: string;
  message_count: number;
  safety_flags: string[];
  is_active: boolean;
  metadata: ConversationMetadata;
}

export interface ConversationMetadata {
  user_agent?: string;
  detected_region?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: MessageRole;
  content: string;
  sources_cited: SourceCitation[] | null;
  intent_classification: Intent | null;
  safety_flag: SafetyLevel | null;
  response_time_ms: number | null;
  token_count_prompt: number | null;
  token_count_completion: number | null;
  created_at: string;
}

export interface NewMessage {
  role: MessageRole;
  content: string;
  sources_cited?: SourceCitation[];
  intent_classification?: Intent;
  safety_flag?: SafetyLevel | null;
  response_time_ms?: number;
  token_count_prompt?: number;
  token_count_completion?: number;
}

export interface ConversationWithMessages extends Conversation {
  messages: Message[];
}

// -----------------------------------------------------------------------------
// Safety
// -----------------------------------------------------------------------------

export type SafetyLevel =
  | 'SAFE'
  | 'CRISIS'
  | 'URGENT'
  | 'WATCH'
  | 'OUT_OF_SCOPE'
  | 'HARMFUL_REQUEST';

export interface SafetyClassification {
  level: SafetyLevel;
  confidence: number;
  trigger: string | null;
  action: SafetyAction;
}

export type SafetyAction =
  | { type: 'PROCEED' }
  | { type: 'CRISIS_RESPONSE'; resources: CrisisResource[] }
  | { type: 'REDIRECT_TO_PROFESSIONAL' }
  | { type: 'SCOPE_REDIRECT'; message: string }
  | { type: 'BLOCK'; reason: string };

export interface CrisisResource {
  name: string;
  contact: string;
  type: 'phone' | 'text' | 'chat' | 'website';
  description: string;
  region: string;
  available_24_7: boolean;
}

export interface OutputValidation {
  safe: boolean;
  violations: string[];
  sanitized: string;
}

// -----------------------------------------------------------------------------
// Intent Classification
// -----------------------------------------------------------------------------

export type Intent =
  | 'educational'
  | 'navigation'
  | 'symptom_inquiry'
  | 'provider_search'
  | 'coping_request'
  | 'tool_route'
  | 'crisis'
  | 'greeting'
  | 'feedback'
  | 'off_topic'
  | 'meta';

export type UrgencyLevel = 'low' | 'moderate' | 'high';

export interface ExtractedEntities {
  conditions?: string[];
  symptoms?: string[];
  location?: string;
  providerType?: string;
  language?: string;
  urgency?: UrgencyLevel;
}

export interface IntentClassification {
  primary: Intent;
  confidence: number;
  entities: ExtractedEntities;
}

// -----------------------------------------------------------------------------
// Retrieval
// -----------------------------------------------------------------------------

export interface RetrievalOptions {
  topK: number;
  similarityThreshold: number;
  contentTypes?: ContentType[];
  conditionTags?: string[];
  language?: string;
  excludeDocumentIds?: string[];
  boostRecent?: boolean;
}

export interface RetrievalResult {
  chunkId: string;
  documentId: string;
  documentTitle: string;
  documentUrlPath: string;
  documentType: ContentType;
  chunkText: string;
  similarity: number;
  metadata: {
    sectionHeading?: string;
    hasCitation: boolean;
    sources?: ContentSource[];
  };
}

// -----------------------------------------------------------------------------
// LLM
// -----------------------------------------------------------------------------

export type LLMRole = 'system' | 'user' | 'assistant';

export interface LLMMessage {
  role: LLMRole;
  content: string;
}

export interface LLMOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
  stopSequences?: string[];
}

export interface LLMResponse {
  content: string;
  tokensUsed: {
    prompt: number;
    completion: number;
  };
  model: string;
  finishReason: string;
}

export interface LLMStreamChunk {
  content: string;
  done: boolean;
}

export interface LLMProvider {
  generateCompletion(
    messages: LLMMessage[],
    options?: LLMOptions
  ): Promise<LLMResponse>;

  streamCompletion(
    messages: LLMMessage[],
    options?: LLMOptions
  ): AsyncGenerator<LLMStreamChunk>;

  generateEmbedding(text: string): Promise<number[]>;

  generateEmbeddings(texts: string[]): Promise<number[][]>;
}

// -----------------------------------------------------------------------------
// AI Response
// -----------------------------------------------------------------------------

export interface SourceCitation {
  document_id: string;
  title: string;
  url_path: string;
  chunk_id?: string;
}

// Alias for backward compatibility
export type Citation = SourceCitation;

export interface ResourceLink {
  title: string;
  url_path: string;
  type: ContentType;
  description: string;
}

export interface ProviderSuggestion {
  providers: ProviderResult[];
  searchCriteria: ProviderSearchCriteria;
  totalMatches: number;
}

export interface AIResponse {
  content: string;
  sourcesCited: SourceCitation[];
  suggestedFollowUps: string[];
  suggestedResources: ResourceLink[];
  providerSuggestion?: ProviderSuggestion;
  safetyLevel: SafetyLevel;
  tokensUsed: { prompt: number; completion: number };
}

export interface GenerationContext {
  userLanguage: string;
  detectedRegion?: string;
  crisisResourcesForRegion?: CrisisResource[];
  safetyClassification: SafetyClassification;
  conversationTurnCount: number;
}

// -----------------------------------------------------------------------------
// Providers
// -----------------------------------------------------------------------------

export type ProviderType =
  | 'psychologist'
  | 'therapist'
  | 'counselor'
  | 'psychiatrist'
  | 'social_worker';

export type ListingTier = 'basic' | 'premium';

export interface Provider {
  id: string;
  name: string;
  credentials: string;
  provider_type: ProviderType;
  specialties: string[];
  location_city: string;
  location_state: string | null;
  location_country: string;
  location_lat: number | null;
  location_lng: number | null;
  telehealth_available: boolean;
  languages: string[];
  insurance_accepted: string[] | null;
  bio: string | null;
  website: string | null;
  phone: string | null;
  is_verified: boolean;
  listing_tier: ListingTier;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProviderResult {
  id: string;
  name: string;
  credentials: string;
  providerType: ProviderType;
  specialties: string[];
  city: string;
  state: string | null;
  country: string;
  telehealthAvailable: boolean;
  languages: string[];
  bio: string | null;
  website: string | null;
  isVerified: boolean;
  listingTier: ListingTier;
}

export interface ProviderSearchCriteria {
  query?: string;
  location?: string;
  specialty?: string;
  providerType?: ProviderType;
  telehealth?: boolean;
  language?: string;
  page?: number;
  limit?: number;
}

// -----------------------------------------------------------------------------
// Conversation Patterns & Context
// -----------------------------------------------------------------------------

export interface ConversationPatterns {
  dominantTopics: string[];
  distressTrend: 'stable' | 'improving' | 'escalating';
  safetyFlagsTriggered: string[];
  turnCount: number;
  shouldSuggestProfessional: boolean;
  shouldSuggestNewConversation: boolean;
}

export interface ConversationSummary {
  summary: string;
  keyTopics: string[];
  userConcerns: string[];
  generatedAt: string;
}

// -----------------------------------------------------------------------------
// Analytics
// -----------------------------------------------------------------------------

export type AnalyticsEventType =
  | 'conversation_started'
  | 'message_sent'
  | 'crisis_detected'
  | 'article_linked'
  | 'provider_suggested'
  | 'tool_routed'
  | 'feedback_received';

export interface AnalyticsEvent {
  event_type: AnalyticsEventType;
  session_hash: string;
  intent?: Intent;
  articles_cited_count?: number;
  response_time_ms?: number;
  feedback_helpful?: boolean;
  language?: string;
}

// -----------------------------------------------------------------------------
// Ingestion
// -----------------------------------------------------------------------------

export interface IngestionSource {
  type: 'file' | 'cms';
  path?: string;
  contentType: ContentType;
}

export interface IngestionResult {
  documentsProcessed: number;
  chunksCreated: number;
  embeddingsGenerated: number;
  errors: IngestionError[];
  duration_ms: number;
}

export interface IngestionError {
  documentTitle: string;
  error: string;
  stage: 'parse' | 'chunk' | 'embed' | 'upsert';
}

export interface ParsedDocument {
  title: string;
  slug: string;
  url_path: string;
  content_body: string;
  summary: string;
  type: ContentType;
  condition_tags: string[];
  topic_tags: string[];
  language: string;
  author: string | null;
  sources: ContentSource[];
}

export interface TextChunk {
  text: string;
  index: number;
  tokenCount: number;
  metadata: ChunkMetadata;
}

// -----------------------------------------------------------------------------
// API Request / Response
// -----------------------------------------------------------------------------

export interface ChatRequest {
  message: string;
  conversationId?: string;
  sessionId: string;
  language?: string;
}

export interface ChatResponse {
  conversationId: string;
  messageId: string;
  content: string;
  sources: SourceCitation[];
  suggestedFollowUps: string[];
  suggestedResources: ResourceLink[];
  providerSuggestion?: ProviderSuggestion;
  safetyLevel: SafetyLevel;
}

export interface FeedbackRequest {
  messageId: string;
  helpful: boolean;
}

export interface ProviderSearchRequest {
  query?: string;
  location?: string;
  specialty?: string;
  providerType?: ProviderType;
  telehealth?: boolean;
  language?: string;
  page?: number;
  limit?: number;
}

export interface ProviderSearchResponse {
  providers: ProviderResult[];
  total: number;
  page: number;
  limit: number;
}

export interface SuggestedQuestionsResponse {
  questions: SuggestedQuestion[];
}

export interface SuggestedQuestion {
  text: string;
  category: string;
  icon?: string;
}

// -----------------------------------------------------------------------------
// Rate Limiting
// -----------------------------------------------------------------------------

export interface RateLimitConfig {
  maxPerMinute: number;
  maxPerHour: number;
  maxPerDay: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: string;
  retryAfter?: number;
}

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

export type LLMProviderName = 'anthropic' | 'openai';

export interface AIConfig {
  llmProvider: LLMProviderName;
  primaryModel: string;
  safetyModel: string;
  embeddingModel: string;
  summarizationModel: string;
  retrieval: {
    defaultTopK: number;
    defaultSimilarityThreshold: number;
    hybridSearchWeight: number;
  };
  conversation: {
    maxTurns: number;
    maxHistoryForLLM: number;
    summarizeAfterTurns: number;
    inactivityTimeoutMinutes: number;
    anonymousRetentionHours: number;
  };
  safety: {
    enableInputClassifier: boolean;
    enableOutputValidator: boolean;
    enableConversationMonitor: boolean;
  };
  rateLimit: {
    anonymous: RateLimitConfig;
    authenticated: RateLimitConfig;
    global: { maxPerHour: number };
  };
}
