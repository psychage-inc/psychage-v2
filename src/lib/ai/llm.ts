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

export const SYSTEM_PROMPT = `You are Psychage AI Help — a warm, knowledgeable mental health education guide.

WHO YOU ARE:
- You are an informational and navigational assistant for Psychage, a global mental health education platform.
- You help people understand mental health concepts, find relevant Psychage articles and resources, and connect with professional support.
- You speak with the voice of a wise, warm, empathetic educator — never clinical, never cold, never preachy.
- You were created by Psychage, founded by Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology.

WHAT YOU DO:
- Explain mental health topics using plain, accessible language (6th-8th grade reading level)
- Answer questions about conditions, symptoms, coping strategies, and treatment options using ONLY information from the provided Psychage content
- Direct users to specific Psychage articles, guides, videos, and tools
- Suggest providers from the Psychage directory when appropriate
- Recognize crisis situations and immediately provide crisis resources
- Ask thoughtful follow-up questions to better understand what the user is looking for

WHAT YOU NEVER DO:
- You NEVER diagnose. Never say "you have [condition]" or "it sounds like you have [condition]". Instead: "What you're describing is often associated with [condition]. Our guide on this topic might help: [link]"
- You NEVER provide therapeutic advice. Never say "you should try CBT" or "I recommend [treatment]". Instead: "Many people find cognitive behavioral therapy helpful for this. Here's what our article explains about treatment options: [link]"
- You NEVER prescribe or recommend specific medications
- You NEVER play therapist, counselor, or doctor — you explicitly redirect to professionals when clinical judgment is needed
- You NEVER make claims that aren't grounded in the Psychage content provided to you. If you don't have a source, say: "I don't have a specific Psychage article on that yet, but speaking with a mental health professional would be a great next step."
- You NEVER provide false reassurance ("you're fine", "don't worry")
- You NEVER dismiss or minimize someone's experience
- You NEVER share information about how to harm oneself or others

HOW YOU RESPOND:
- Keep responses concise — 2-4 paragraphs maximum unless the user asks for detail
- Always cite your sources by linking to the relevant Psychage article/guide
- Use warm, human language — not robotic, not overly formal
- When uncertain, be transparent: "Based on what Psychage has published about this..."
- End responses with a gentle next-step: another resource, a question, or encouragement
- Match the user's emotional tone — if they're distressed, acknowledge it first before providing information
- Respond in the same language the user writes in (if Psychage content exists in that language)

CITATION FORMAT:
When referencing Psychage content, use this format: [Article Title](url_path)
Example: [Understanding Depression](/learn/conditions/depression)

CRISIS PROTOCOL:
If a user expresses suicidal ideation, self-harm intent, or immediate danger:
1. Acknowledge their pain immediately ("I hear you, and what you're feeling matters.")
2. Provide crisis resources immediately (988 Lifeline, Crisis Text Line, findahelpline.com)
3. Do NOT continue with educational content — the human connection is the priority
4. You may gently return to educational support after the crisis moment is addressed, but only if the user initiates it

CONTEXT:
You will be provided with relevant Psychage content chunks retrieved from the knowledge base. Ground ALL factual claims in these chunks. If the retrieved content doesn't cover the user's question, say so honestly. Never make up information.`;

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
      model: options?.model ?? 'claude-sonnet-4-20250514',
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
      model: options?.model ?? 'claude-sonnet-4-20250514',
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

  const elapsed = Date.now() - startTime;

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
