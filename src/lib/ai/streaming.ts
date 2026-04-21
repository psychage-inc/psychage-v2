/**
 * SSE Streaming Protocol for MindMate AI
 *
 * Shared types and utilities used by both the Vercel serverless handler
 * (server-side encoder) and the React client (client-side parser).
 */

import type { SafetyLevel, SourceCitation, ProviderResult } from './types';

// ---------------------------------------------------------------------------
// Event Types
// ---------------------------------------------------------------------------

export interface MetadataEvent {
  type: 'metadata';
  sessionId: string;
  conversationId?: string;
}

export interface SafetyEvent {
  type: 'safety';
  level: SafetyLevel;
}

export interface TokenEvent {
  type: 'token';
  content: string;
}

export interface CitationsEvent {
  type: 'citations';
  citations: SourceCitation[];
}

export interface SuggestionsEvent {
  type: 'suggestions';
  followUps: string[];
}

export interface ProvidersEvent {
  type: 'providers';
  providers: ProviderResult[];
  totalMatches: number;
}

export interface DoneEvent {
  type: 'done';
  responseTimeMs: number;
  timeToFirstTokenMs: number;
  tokensUsed?: { prompt: number; completion: number };
}

export interface StreamErrorEvent {
  type: 'error';
  message: string;
  code?: 'SAFETY_VIOLATION' | 'LLM_ERROR' | 'TIMEOUT' | 'RATE_LIMIT' | 'INTERNAL';
}

export type StreamEvent =
  | MetadataEvent
  | SafetyEvent
  | TokenEvent
  | CitationsEvent
  | SuggestionsEvent
  | ProvidersEvent
  | DoneEvent
  | StreamErrorEvent;

// ---------------------------------------------------------------------------
// Server-side: encode a StreamEvent into an SSE "data:" line
// ---------------------------------------------------------------------------

export function encodeSSE(event: StreamEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

// ---------------------------------------------------------------------------
// Client-side: parse a ReadableStream<Uint8Array> into StreamEvents
// ---------------------------------------------------------------------------

export async function* parseSSEStream(
  stream: ReadableStream<Uint8Array>,
): AsyncGenerator<StreamEvent> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // SSE events are delimited by double newlines
      const parts = buffer.split('\n\n');
      // Last part may be incomplete — keep it in the buffer
      buffer = parts.pop() ?? '';

      for (const part of parts) {
        for (const line of part.split('\n')) {
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (!jsonStr || jsonStr === '[DONE]') continue;

          try {
            yield JSON.parse(jsonStr) as StreamEvent;
          } catch {
            // Skip malformed JSON
          }
        }
      }
    }

    // Flush any remaining data in the buffer
    if (buffer.trim()) {
      for (const line of buffer.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        const jsonStr = line.slice(6).trim();
        if (!jsonStr || jsonStr === '[DONE]') continue;
        try {
          yield JSON.parse(jsonStr) as StreamEvent;
        } catch {
          // Skip malformed JSON
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
