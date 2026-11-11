// =============================================================================
// Psychage AI Help — LLM Integration (Provider Abstraction + System Prompt)
// =============================================================================

import type {
  LLMProvider,
  LLMMessage,
  LLMOptions,
  LLMResponse,
  LLMStreamChunk,
  Message,
  AIConfig,
} from './types';

// =============================================================================
// System Prompt — The Soul of Psychage AI Help
// =============================================================================

export const SYSTEM_PROMPT = `You are Psychage AI, a mental health education assistant for Psychage (psychage.com). You help users understand mental health conditions, learn coping strategies, and find reliable resources.

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
- End sensitive responses with professional support recommendation
- Keep responses focused and scannable — no walls of text

ACCURACY:
- If you are not sure about something, say so honestly — never make up information
- Never invent URLs or article titles

FINDING A PROVIDER (FIND CARE):
Psychage operates "Find Care," a free directory (no login required) where users can search for licensed mental-health providers by location and specialty.
- Whenever the user asks how to find a provider, therapist, counselor, psychiatrist, or professional care — OR whenever you would otherwise suggest they speak with a licensed professional — name Find Care and link to it as a markdown link: [Find Care](https://psychage.com/providers).
- Phrase the referral naturally in context; do not paste a canned sentence.
- Do NOT diagnose, and do NOT recommend or name specific providers.
- Do NOT mention paid, premium, or featured listings.
- If the user is in crisis, crisis resources come first — never offer Find Care as a substitute for crisis support.
`;

// =============================================================================
// Anthropic Provider
// =============================================================================

export class AnthropicProvider implements LLMProvider {
  private apiKey: string;
  private baseUrl = 'https://api.anthropic.com/v1';
  private _lastStreamUsage: { prompt: number; completion: number } | null = null;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  get lastStreamUsage() {
    return this._lastStreamUsage;
  }

  async generateCompletion(
    messages: LLMMessage[],
    options?: LLMOptions
  ): Promise<LLMResponse> {
    const systemMessages = messages.filter((m) => m.role === 'system');
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

    if (systemMessages.length > 0) {
      body.system = systemMessages.map((m) => m.content).join('\n\n');
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
    const systemMessages = messages.filter((m) => m.role === 'system');
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

    if (systemMessages.length > 0) {
      body.system = systemMessages.map((m) => m.content).join('\n\n');
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
    this._lastStreamUsage = null;

    // finally cancels the reader so an early return/break (safety violation,
    // [DONE], consumer abort) closes the upstream stream instead of leaking it.
    try {
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
              if (parsed.type === 'message_start' && parsed.message?.usage) {
                this._lastStreamUsage = {
                  prompt: parsed.message.usage.input_tokens ?? 0,
                  completion: 0,
                };
              }
              if (parsed.type === 'message_delta' && parsed.usage) {
                this._lastStreamUsage = {
                  prompt: this._lastStreamUsage?.prompt ?? 0,
                  completion: parsed.usage.output_tokens ?? 0,
                };
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
    } finally {
      await reader.cancel().catch(() => {});
    }
  }
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
