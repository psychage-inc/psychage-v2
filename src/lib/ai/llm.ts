// =============================================================================
// Psychage AI Help — LLM Integration (Provider Abstraction + System Prompt)
// =============================================================================

import type {
  LLMProvider,
  LLMMessage,
  LLMOptions,
  LLMResponse,
  LLMStreamChunk,
  AIResponse,
  RetrievalResult,
  GenerationContext,
  SourceCitation,
  ResourceLink,
  Message,
  SafetyClassification,
  LLMProviderName,
  AIConfig,
} from './types';

// =============================================================================
// System Prompt — The Soul of Psychage AI Help
// =============================================================================

export const SYSTEM_PROMPT = `You are MindMate, a mental health education assistant for Psychage (psychage.com). You help users understand mental health conditions, learn coping strategies, and find reliable resources.

CORE IDENTITY:
- You are an EDUCATOR, not a therapist or doctor
- You provide INFORMATION, not diagnosis or treatment
- You are EMPATHETIC but maintain professional boundaries
- You always prioritize user safety over conversation engagement

ABSOLUTE RULES (never violate):
1. NEVER diagnose: Do not say "You have [condition]" or "This sounds like [diagnosis]"
2. NEVER prescribe: Do not recommend specific medications, dosages, or drug combinations
3. NEVER replace professionals: Always recommend licensed support for personal situations
4. NEVER provide means for self-harm: If location, method, or means are requested in a distressed context, do not provide them — redirect to crisis resources
5. ALWAYS identify as AI: If asked directly, confirm you are an AI

RESPONSE FORMAT:
- Lead with empathy for emotionally-charged messages
- Provide clear educational content (2-4 paragraphs max)
- Cite Psychage articles using [SOURCE: title | url] format
- End sensitive responses with professional support recommendation
- Keep responses focused and scannable — no walls of text

RETRIEVED PSYCHAGE CONTENT:
The following content has been retrieved from Psychage's knowledge base to help answer the user's question. Ground ALL factual claims in these sources. If this content doesn't cover their question, say so honestly — never make up information.

<INTERNAL_CONTEXT>
{retrieved_chunks}
</INTERNAL_CONTEXT>

CITATION RULES:
- Always prefer Psychage content over general knowledge
- Only cite sources present in the context above — never hallucinate URLs
- Format citations as [SOURCE: Article Title | https://psychage.com/...]
- If no relevant content was retrieved, recommend speaking with a professional
`;

// =============================================================================
// Anthropic Provider
// =============================================================================

export class AnthropicProvider implements LLMProvider {
  private apiKey: string;
  private baseUrl = 'https://api.anthropic.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateCompletion(
    messages: LLMMessage[],
    options?: LLMOptions
  ): Promise<LLMResponse> {
    const systemMessage = messages.find((m) => m.role === 'system');
    const nonSystemMessages = messages.filter((m) => m.role !== 'system');

    const body: Record<string, unknown> = {
      model: options?.model ?? 'claude-sonnet-4-5-20250929',
      max_tokens: options?.maxTokens ?? 1024,
      temperature: options?.temperature ?? 0.7,
      messages: nonSystemMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    };

    if (systemMessage) {
      body.system = systemMessage.content;
    }

    if (options?.stopSequences) {
      body.stop_sequences = options.stopSequences;
    }

    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API error (${response.status}): ${error}`);
    }

    const data = await response.json();
    const content =
      data.content?.[0]?.type === 'text' ? data.content[0].text : '';

    return {
      content,
      tokensUsed: {
        prompt: data.usage?.input_tokens ?? 0,
        completion: data.usage?.output_tokens ?? 0,
      },
      model: data.model,
      finishReason: data.stop_reason ?? 'end_turn',
    };
  }

  async *streamCompletion(
    messages: LLMMessage[],
    options?: LLMOptions
  ): AsyncGenerator<LLMStreamChunk> {
    const systemMessage = messages.find((m) => m.role === 'system');
    const nonSystemMessages = messages.filter((m) => m.role !== 'system');

    const body: Record<string, unknown> = {
      model: options?.model ?? 'claude-sonnet-4-5-20250929',
      max_tokens: options?.maxTokens ?? 1024,
      temperature: options?.temperature ?? 0.7,
      stream: true,
      messages: nonSystemMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    };

    if (systemMessage) {
      body.system = systemMessage.content;
    }

    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API error (${response.status}): ${error}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            yield { content: '', done: true };
            return;
          }

          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
              yield { content: parsed.delta.text, done: false };
            }
            if (parsed.type === 'message_stop') {
              yield { content: '', done: true };
              return;
            }
          } catch {
            // Skip unparseable lines
          }
        }
      }
    }

    yield { content: '', done: true };
  }

  async generateEmbedding(_text: string): Promise<number[]> {
    throw new Error(
      'Anthropic does not provide embeddings. Use OpenAI for embeddings.'
    );
  }

  async generateEmbeddings(_texts: string[]): Promise<number[][]> {
    throw new Error(
      'Anthropic does not provide embeddings. Use OpenAI for embeddings.'
    );
  }
}

// =============================================================================
// OpenAI Provider
// =============================================================================

export class OpenAIProvider implements LLMProvider {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateCompletion(
    messages: LLMMessage[],
    options?: LLMOptions
  ): Promise<LLMResponse> {
    const body: Record<string, unknown> = {
      model: options?.model ?? 'gpt-4o',
      max_tokens: options?.maxTokens ?? 1024,
      temperature: options?.temperature ?? 0.7,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    };

    if (options?.stopSequences) {
      body.stop = options.stopSequences;
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error (${response.status}): ${error}`);
    }

    const data = await response.json();
    const choice = data.choices?.[0];

    return {
      content: choice?.message?.content ?? '',
      tokensUsed: {
        prompt: data.usage?.prompt_tokens ?? 0,
        completion: data.usage?.completion_tokens ?? 0,
      },
      model: data.model,
      finishReason: choice?.finish_reason ?? 'stop',
    };
  }

  async *streamCompletion(
    messages: LLMMessage[],
    options?: LLMOptions
  ): AsyncGenerator<LLMStreamChunk> {
    const body: Record<string, unknown> = {
      model: options?.model ?? 'gpt-4o',
      max_tokens: options?.maxTokens ?? 1024,
      temperature: options?.temperature ?? 0.7,
      stream: true,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    };

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error (${response.status}): ${error}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') {
            yield { content: '', done: true };
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              yield { content: delta, done: false };
            }
            if (parsed.choices?.[0]?.finish_reason) {
              yield { content: '', done: true };
              return;
            }
          } catch {
            // Skip unparseable lines
          }
        }
      }
    }

    yield { content: '', done: true };
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch(`${this.baseUrl}/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: text,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI embeddings error (${response.status}): ${error}`);
    }

    const data = await response.json();
    return data.data?.[0]?.embedding ?? [];
  }

  async generateEmbeddings(texts: string[]): Promise<number[][]> {
    const response = await fetch(`${this.baseUrl}/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: texts,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI embeddings error (${response.status}): ${error}`);
    }

    const data = await response.json();
    return (data.data ?? [])
      .sort((a: { index: number }, b: { index: number }) => a.index - b.index)
      .map((d: { embedding: number[] }) => d.embedding);
  }
}

// =============================================================================
// Provider Factory
// =============================================================================

export function createLLMProvider(
  providerName: LLMProviderName,
  apiKey: string
): LLMProvider {
  switch (providerName) {
    case 'anthropic':
      return new AnthropicProvider(apiKey);
    case 'openai':
      return new OpenAIProvider(apiKey);
    default:
      throw new Error(`Unknown LLM provider: ${providerName}`);
  }
}

// Always use OpenAI for embeddings (Anthropic doesn't offer them)
export function createEmbeddingProvider(openaiApiKey: string): LLMProvider {
  return new OpenAIProvider(openaiApiKey);
}

// =============================================================================
// Message Assembly
// =============================================================================

export function assembleMessages(
  userMessage: string,
  conversationHistory: LLMMessage[],
  retrievedContent: RetrievalResult[],
  context: GenerationContext,
  conversationSummary?: string
): LLMMessage[] {
  const messages: LLMMessage[] = [];

  // System prompt
  messages.push({ role: 'system', content: SYSTEM_PROMPT });

  // Retrieved content context
  if (retrievedContent.length > 0) {
    const contentBlocks = retrievedContent
      .map(
        (r, i) =>
          `[Source ${i + 1}] "${r.documentTitle}" (${r.documentType})\n${r.chunkText}\nLink: ${r.documentUrlPath}`
      )
      .join('\n\n');

    messages.push({
      role: 'system',
      content: `Retrieved Psychage content (use ONLY this to ground your response):\n\n${contentBlocks}`,
    });
  } else {
    messages.push({
      role: 'system',
      content:
        'No specific Psychage content was retrieved for this query. If the user asks a factual question, be honest that you don\'t have a specific Psychage article on this topic and suggest speaking with a professional.',
    });
  }

  // User context
  const contextParts = [
    `Language: ${context.userLanguage}`,
    `Conversation turn: ${context.conversationTurnCount}`,
    `Safety level: ${context.safetyClassification.level}`,
  ];
  if (context.detectedRegion) {
    contextParts.push(`Region: ${context.detectedRegion}`);
  }
  messages.push({
    role: 'system',
    content: `User context:\n${contextParts.join('\n')}`,
  });

  // Conversation summary for long conversations
  if (conversationSummary) {
    messages.push({
      role: 'system',
      content: `Summary of earlier conversation:\n${conversationSummary}`,
    });
  }

  // Conversation history (last 10 turns = 20 messages)
  messages.push(...conversationHistory);

  // Current user message
  messages.push({ role: 'user', content: userMessage });

  return messages;
}

// =============================================================================
// Response Generation
// =============================================================================

export async function generateResponse(
  userMessage: string,
  conversationHistory: Message[],
  retrievedContent: RetrievalResult[],
  context: GenerationContext,
  llmProvider: LLMProvider,
  config: AIConfig,
  conversationSummary?: string
): Promise<AIResponse> {
  const startTime = Date.now();

  // Format conversation history for LLM
  const formattedHistory: LLMMessage[] = conversationHistory
    .slice(-(config.conversation.maxHistoryForLLM * 2))
    .map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

  const messages = assembleMessages(
    userMessage,
    formattedHistory,
    retrievedContent,
    context,
    conversationSummary
  );

  const response = await llmProvider.generateCompletion(messages, {
    model: config.primaryModel,
    maxTokens: 1024,
    temperature: 0.7,
  });

  // Extract citations from response content
  const sourcesCited = extractCitationsFromResponse(
    response.content,
    retrievedContent
  );

  // Generate suggested follow-ups
  const suggestedFollowUps = generateFollowUps(
    context.safetyClassification,
    retrievedContent
  );

  // Build suggested resources
  const suggestedResources = buildSuggestedResources(retrievedContent);

  const _elapsed = Date.now() - startTime;

  return {
    content: response.content,
    sourcesCited,
    suggestedFollowUps,
    suggestedResources,
    safetyLevel: context.safetyClassification.level,
    tokensUsed: {
      prompt: response.tokensUsed.prompt,
      completion: response.tokensUsed.completion,
    },
  };
}

// =============================================================================
// Citation & Follow-up Helpers
// =============================================================================

function extractCitationsFromResponse(
  responseText: string,
  retrievedContent: RetrievalResult[]
): SourceCitation[] {
  const citations: SourceCitation[] = [];
  const seen = new Set<string>();

  for (const result of retrievedContent) {
    // Check if the response references this content (by title or URL)
    if (
      responseText.includes(result.documentTitle) ||
      responseText.includes(result.documentUrlPath)
    ) {
      if (!seen.has(result.documentId)) {
        citations.push({
          document_id: result.documentId,
          title: result.documentTitle,
          url_path: result.documentUrlPath,
          chunk_id: result.chunkId,
        });
        seen.add(result.documentId);
      }
    }
  }

  // If LLM didn't explicitly reference but content was retrieved, include top result
  if (citations.length === 0 && retrievedContent.length > 0) {
    const top = retrievedContent[0];
    citations.push({
      document_id: top.documentId,
      title: top.documentTitle,
      url_path: top.documentUrlPath,
      chunk_id: top.chunkId,
    });
  }

  return citations;
}

function generateFollowUps(
  safety: SafetyClassification,
  retrievedContent: RetrievalResult[]
): string[] {
  if (safety.level === 'CRISIS' || safety.level === 'URGENT') {
    return [
      'Would you like me to help you find a professional to talk to?',
      'Can I share some coping strategies that might help right now?',
    ];
  }

  const followUps: string[] = [];

  // Generate topic-based follow-ups from retrieved content
  const types = new Set(retrievedContent.map((r) => r.documentType));

  if (types.has('condition_guide')) {
    followUps.push('Would you like to learn about treatment options for this?');
    followUps.push('Shall I suggest some coping strategies?');
  }
  if (types.has('coping_strategy')) {
    followUps.push('Would you like to explore more coping techniques?');
  }
  if (types.has('article')) {
    followUps.push('Would you like to read more about a related topic?');
  }

  // Default follow-ups
  if (followUps.length === 0) {
    followUps.push('Is there anything else about mental health I can help you understand?');
    followUps.push('Would you like me to find a specific article or resource?');
  }

  return followUps.slice(0, 3);
}

function buildSuggestedResources(
  retrievedContent: RetrievalResult[]
): ResourceLink[] {
  const seen = new Set<string>();
  const resources: ResourceLink[] = [];

  for (const result of retrievedContent) {
    if (!seen.has(result.documentId) && resources.length < 3) {
      resources.push({
        title: result.documentTitle,
        url_path: result.documentUrlPath,
        type: result.documentType,
        description: result.chunkText.slice(0, 150) + '...',
      });
      seen.add(result.documentId);
    }
  }

  return resources;
}

// =============================================================================
// Conversation Summarization
// =============================================================================

export async function summarizeConversation(
  messages: Message[],
  llmProvider: LLMProvider,
  config: AIConfig
): Promise<string> {
  const formattedMessages = messages
    .map((m) => `${m.role}: ${m.content}`)
    .join('\n');

  const llmMessages: LLMMessage[] = [
    {
      role: 'system',
      content:
        'Summarize this mental health chatbot conversation in 2-3 sentences. Focus on the key topics discussed, the user\'s main concerns, and any important context. Do NOT include any clinical judgments or diagnoses.',
    },
    {
      role: 'user',
      content: formattedMessages,
    },
  ];

  const response = await llmProvider.generateCompletion(llmMessages, {
    model: config.summarizationModel,
    maxTokens: 200,
    temperature: 0.3,
  });

  return response.content.trim();
}
