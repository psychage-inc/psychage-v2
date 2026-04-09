import { parseSSEStream } from '@/lib/ai/streaming';
import type {
  ChatResponseMeta,
  CitationSource,
  Conversation,
  ConversationListItem,
} from '../types/chat.types';

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
// ERRORS
// ============================================================

/** Thrown when server-side output validation replaces the streamed content. */
export class SafetyReplacementError extends Error {
  readonly replacementText: string;
  constructor(replacementText: string) {
    super('Response replaced by safety filter');
    this.name = 'SafetyReplacementError';
    this.replacementText = replacementText;
  }
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
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Chat API error: ${response.status}`,
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
