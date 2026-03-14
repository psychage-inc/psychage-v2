export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  sources?: CitationSource[];
  suggestedFollowUps?: string[];
  safetyLevel?: 'SAFE' | 'WATCH' | 'URGENT' | 'CRISIS';
  thinkingContent?: string;
}

export interface CitationSource {
  id: string;
  title: string;
  url: string;
  snippet: string;
  type: 'article' | 'guide' | 'tool' | 'video';
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

export interface ConversationListItem {
  id: string;
  title: string;
  updatedAt: Date;
  messageCount: number;
  preview: string;
}

export type StreamingState = 'idle' | 'streaming' | 'error';

export type TimeGroup = 'today' | 'yesterday' | 'last7days' | 'last30days' | 'older';

export interface GroupedConversations {
  label: string;
  key: TimeGroup;
  items: ConversationListItem[];
}
