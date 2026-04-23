import * as Sentry from '@sentry/react';
import { parseSSEStream } from '@/lib/ai/streaming';
import type {
  ChatResponseMeta,
  CitationSource,
  Conversation,
  ConversationListItem,
} from '../types/chat.types';
import {
  MindMateUnavailableError,
  SafetyReplacementError,
} from './errors';

// Re-export so existing consumers (e.g. useChat.ts) keep their import surface.
export { SafetyReplacementError } from './errors';

// ============================================================
// API TYPES
// ============================================================

interface ApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ApiCitation {
  document_id: string;
  title: string;
  url_path: string;
}

interface ApiResponse {
  message: string;
  citations: ApiCitation[];
  sessionId: string;
  safetyLevel: string;
  isCrisis: boolean;
  responseTimeMs?: number;
}

// ============================================================
// HELPERS
// ============================================================

function mapCitation(c: ApiCitation): CitationSource {
  return {
    id: c.document_id,
    title: c.title,
    url: c.url_path,
    snippet: '',
    type: 'article',
  };
}

function normalizeSafetyLevel(
  level: string,
): 'SAFE' | 'WATCH' | 'URGENT' | 'CRISIS' {
  if (level === 'CRISIS') return 'CRISIS';
  if (level === 'URGENT') return 'URGENT';
  if (level === 'WATCH') return 'WATCH';
  return 'SAFE';
}

// ============================================================
// PUBLIC API
// ============================================================

export async function* sendMessage(
  messages: ApiMessage[],
  sessionId?: string,
  onMeta?: (meta: ChatResponseMeta) => void,
  signal?: AbortSignal,
): AsyncGenerator<string> {
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, sessionId, stream: true }),
    signal,
  });

  if (!response.ok) {
    // Read the body exactly once as text. Parsing defensively afterward lets
    // us distinguish handler-returned errors (structured JSON with `.error`)
    // from platform-level failures (cold-start crash, hard timeout, HTML
    // error page from a proxy), which are never parseable JSON.
    const bodyText = await response.text().catch(() => '');

    let parsedError: string | null = null;
    try {
      const parsed = JSON.parse(bodyText);
      if (parsed && typeof parsed.error === 'string') {
        parsedError = parsed.error;
      }
    } catch {
      // Body wasn't JSON — fall through to the typed platform-failure path.
    }

    if (parsedError) {
      throw new Error(parsedError);
    }

    Sentry.captureException(new Error('MindMate API non-JSON error response'), {
      level: 'error',
      tags: {
        component: 'mindmate',
        endpoint: '/api/ai/chat',
        consumer: 'chatService',
      },
      extra: {
        status: response.status,
        statusText: response.statusText,
        bodyPreview: bodyText.slice(0, 500),
        sessionId,
        requestId: response.headers.get('x-vercel-id'),
        contentType: response.headers.get('content-type'),
      },
    });

    throw new MindMateUnavailableError(
      `MindMate unavailable (status ${response.status})`,
      { cause: new Error(bodyText.slice(0, 200)) },
    );
  }

  const contentType = response.headers.get('Content-Type') ?? '';

  // ── JSON fallback (crisis responses, non-streaming fallback) ──
  if (contentType.includes('application/json')) {
    const data: ApiResponse = await response.json();

    onMeta?.({
      citations: (data.citations ?? []).map(mapCitation),
      safetyLevel: normalizeSafetyLevel(data.safetyLevel),
      isCrisis: data.isCrisis ?? false,
      sessionId: data.sessionId,
    });

    // Yield full text at once for crisis/fallback responses
    if (data.message) {
      yield data.message;
    }
    return;
  }

  // ── SSE stream ──
  if (!response.body) {
    throw new Error('No response body for streaming');
  }

  let safetyLevel: 'SAFE' | 'WATCH' | 'URGENT' | 'CRISIS' = 'SAFE';
  let receivedSessionId = sessionId ?? '';
  const citations: CitationSource[] = [];

  for await (const event of parseSSEStream(response.body)) {
    switch (event.type) {
      case 'token':
        yield event.content;
        break;

      case 'metadata':
        receivedSessionId = event.sessionId;
        break;

      case 'safety':
        safetyLevel = normalizeSafetyLevel(event.level);
        break;

      case 'citations':
        for (const c of event.citations) {
          citations.push(mapCitation(c));
        }
        break;

      case 'error':
        if (event.code === 'SAFETY_VIOLATION') {
          // Output was replaced by safety filter — throw so consumer can
          // replace accumulated text instead of appending
          throw new SafetyReplacementError(event.message);
        } else {
          throw new Error(event.message);
        }
        break;

      case 'done':
        onMeta?.({
          citations,
          safetyLevel,
          isCrisis: false,
          sessionId: receivedSessionId,
        });
        break;
    }
  }
}

export async function getConversations(): Promise<ConversationListItem[]> {
  return [];
}

export async function getConversation(
  _id: string,
): Promise<Conversation | null> {
  return null;
}

export async function deleteConversation(_id: string): Promise<boolean> {
  return true;
}
