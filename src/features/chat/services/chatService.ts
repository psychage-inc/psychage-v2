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
// PUBLIC API
// ============================================================

export async function* sendMessage(
  messages: ApiMessage[],
  sessionId?: string,
  onMeta?: (meta: ChatResponseMeta) => void,
): AsyncGenerator<string> {
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, sessionId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Chat API error: ${response.status}`,
    );
  }

  const data: ApiResponse = await response.json();

  // Deliver metadata via callback
  onMeta?.({
    citations: (data.citations ?? []).map(mapCitation),
    safetyLevel: normalizeSafetyLevel(data.safetyLevel),
    isCrisis: data.isCrisis ?? false,
    sessionId: data.sessionId,
  });

  // Stream the response text word-by-word for typing animation
  const text = data.message || '';
  const words = text.split(' ');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const delay =
      word.endsWith('.') || word.endsWith('?') || word.endsWith('!')
        ? Math.random() * 40 + 30
        : word.startsWith('**')
          ? Math.random() * 20 + 15
          : Math.random() * 25 + 10;

    await new Promise((resolve) => setTimeout(resolve, delay));
    yield words[i] + (i < words.length - 1 ? ' ' : '');
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
