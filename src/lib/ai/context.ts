// =============================================================================
// Psychage AI Help — Conversation Context Manager
// =============================================================================

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  Conversation,
  ConversationWithMessages,
  Message,
  NewMessage,
  ConversationPatterns,
  ConversationSummary,
  LLMMessage,
  LLMProvider,
  AIConfig,
} from './types';
import { analyzeConversationPatterns } from './safety';
import { summarizeConversation } from './llm';

// =============================================================================
// Conversation Manager
// =============================================================================

export class ConversationManager {
  private supabase: SupabaseClient;
  private config: AIConfig;

  constructor(supabase: SupabaseClient, config: AIConfig) {
    this.supabase = supabase;
    this.config = config;
  }

  // ---------------------------------------------------------------------------
  // Create new conversation
  // ---------------------------------------------------------------------------
  async createConversation(
    sessionId: string,
    userId?: string,
    language: string = 'en',
    metadata: Record<string, string> = {}
  ): Promise<Conversation> {
    const { data, error } = await this.supabase
      .from('ai_conversations')
      .insert({
        session_id: sessionId,
        user_id: userId ?? null,
        language,
        metadata,
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create conversation: ${error.message}`);
    return data;
  }

  // ---------------------------------------------------------------------------
  // Load conversation with messages
  // ---------------------------------------------------------------------------
  async loadConversation(
    conversationId: string,
    messageLimit?: number
  ): Promise<ConversationWithMessages | null> {
    const { data: conversation, error: convError } = await this.supabase
      .from('ai_conversations')
      .select('*')
      .eq('id', conversationId)
      .single();

    if (convError || !conversation) return null;

    let query = this.supabase
      .from('ai_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (messageLimit) {
      query = query.limit(messageLimit);
    }

    const { data: messages, error: msgError } = await query;

    if (msgError) throw new Error(`Failed to load messages: ${msgError.message}`);

    return {
      ...conversation,
      messages: messages ?? [],
    };
  }

  // ---------------------------------------------------------------------------
  // Load conversation by session ID (for anonymous users)
  // ---------------------------------------------------------------------------
  async loadConversationBySession(
    sessionId: string,
    conversationId: string
  ): Promise<ConversationWithMessages | null> {
    const { data: conversation, error: convError } = await this.supabase
      .from('ai_conversations')
      .select('*')
      .eq('id', conversationId)
      .eq('session_id', sessionId)
      .eq('is_active', true)
      .single();

    if (convError || !conversation) return null;

    const { data: messages } = await this.supabase
      .from('ai_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    return {
      ...conversation,
      messages: messages ?? [],
    };
  }

  // ---------------------------------------------------------------------------
  // Add a message to conversation
  // ---------------------------------------------------------------------------
  async addMessage(
    conversationId: string,
    message: NewMessage
  ): Promise<Message> {
    const { data, error } = await this.supabase
      .from('ai_messages')
      .insert({
        conversation_id: conversationId,
        role: message.role,
        content: message.content,
        sources_cited: message.sources_cited ?? null,
        intent_classification: message.intent_classification ?? null,
        safety_flag: message.safety_flag ?? null,
        response_time_ms: message.response_time_ms ?? null,
        token_count_prompt: message.token_count_prompt ?? null,
        token_count_completion: message.token_count_completion ?? null,
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to add message: ${error.message}`);

    // Update conversation metadata
    await this.supabase
      .from('ai_conversations')
      .update({
        last_message_at: new Date().toISOString(),
        message_count: data.conversation_id
          ? await this.getMessageCount(conversationId)
          : 1,
        ...(message.safety_flag && message.safety_flag !== 'SAFE'
          ? {
              safety_flags: await this.appendSafetyFlag(
                conversationId,
                message.safety_flag
              ),
            }
          : {}),
      })
      .eq('id', conversationId);

    return data;
  }

  // ---------------------------------------------------------------------------
  // Get formatted history for LLM context
  // ---------------------------------------------------------------------------
  async getFormattedHistory(
    conversationId: string,
    maxTurns: number = 10
  ): Promise<{ messages: LLMMessage[]; summary?: string }> {
    const { data: allMessages } = await this.supabase
      .from('ai_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .in('role', ['user', 'assistant'])
      .order('created_at', { ascending: true });

    const messages = allMessages ?? [];

    // If within limits, return all
    if (messages.length <= maxTurns * 2) {
      return {
        messages: messages.map((m: Message) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      };
    }

    // For long conversations, summarize older messages
    const cutoff = messages.length - maxTurns * 2;
    const olderMessages = messages.slice(0, cutoff);
    const recentMessages = messages.slice(cutoff);

    // Check if we already have a summary cached
    const { data: existing } = await this.supabase
      .from('ai_messages')
      .select('content')
      .eq('conversation_id', conversationId)
      .eq('role', 'system')
      .ilike('content', 'CONVERSATION_SUMMARY:%')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    let summary: string;

    if (existing) {
      summary = existing.content.replace('CONVERSATION_SUMMARY:', '').trim();
    } else {
      // Generate summary (will be done externally, placeholder here)
      summary = `Earlier in this conversation, the user discussed: ${olderMessages
        .filter((m: Message) => m.role === 'user')
        .slice(0, 3)
        .map((m: Message) => m.content.slice(0, 50))
        .join('; ')}...`;
    }

    return {
      messages: recentMessages.map((m: Message) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      summary,
    };
  }

  // ---------------------------------------------------------------------------
  // Summarize history (for long conversations)
  // ---------------------------------------------------------------------------
  async summarizeHistory(
    conversationId: string,
    llmProvider: LLMProvider
  ): Promise<ConversationSummary> {
    const { data: messages } = await this.supabase
      .from('ai_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .in('role', ['user', 'assistant'])
      .order('created_at', { ascending: true });

    const summary = await summarizeConversation(
      messages ?? [],
      llmProvider,
      this.config
    );

    // Cache the summary as a system message
    await this.supabase.from('ai_messages').insert({
      conversation_id: conversationId,
      role: 'system',
      content: `CONVERSATION_SUMMARY: ${summary}`,
    });

    const userMessages = (messages ?? []).filter(
      (m: Message) => m.role === 'user'
    );

    return {
      summary,
      keyTopics: extractKeyTopics(userMessages),
      userConcerns: userMessages.slice(-3).map((m: Message) => m.content.slice(0, 100)),
      generatedAt: new Date().toISOString(),
    };
  }

  // ---------------------------------------------------------------------------
  // Analyze conversation patterns
  // ---------------------------------------------------------------------------
  async getConversationPatterns(
    conversationId: string
  ): Promise<ConversationPatterns> {
    const { data: messages } = await this.supabase
      .from('ai_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    return analyzeConversationPatterns(messages ?? []);
  }

  // ---------------------------------------------------------------------------
  // List user conversations
  // ---------------------------------------------------------------------------
  async listUserConversations(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{ conversations: Conversation[]; total: number }> {
    const offset = (page - 1) * limit;

    const { data, error, count } = await this.supabase
      .from('ai_conversations')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('last_message_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to list conversations: ${error.message}`);

    return {
      conversations: data ?? [],
      total: count ?? 0,
    };
  }

  // ---------------------------------------------------------------------------
  // Delete conversation
  // ---------------------------------------------------------------------------
  async deleteConversation(
    conversationId: string,
    userId: string
  ): Promise<boolean> {
    const { error } = await this.supabase
      .from('ai_conversations')
      .delete()
      .eq('id', conversationId)
      .eq('user_id', userId);

    return !error;
  }

  // ---------------------------------------------------------------------------
  // Deactivate stale conversations
  // ---------------------------------------------------------------------------
  async deactivateStaleConversations(): Promise<number> {
    const timeoutMinutes = this.config.conversation.inactivityTimeoutMinutes;
    const cutoff = new Date(Date.now() - timeoutMinutes * 60 * 1000).toISOString();

    const { data } = await this.supabase
      .from('ai_conversations')
      .update({ is_active: false })
      .eq('is_active', true)
      .lt('last_message_at', cutoff)
      .select('id');

    return data?.length ?? 0;
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------
  private async getMessageCount(conversationId: string): Promise<number> {
    const { count } = await this.supabase
      .from('ai_messages')
      .select('*', { count: 'exact', head: true })
      .eq('conversation_id', conversationId);

    return count ?? 0;
  }

  private async appendSafetyFlag(
    conversationId: string,
    flag: string
  ): Promise<string[]> {
    const { data } = await this.supabase
      .from('ai_conversations')
      .select('safety_flags')
      .eq('id', conversationId)
      .single();

    const existing = data?.safety_flags ?? [];
    if (!existing.includes(flag)) {
      existing.push(flag);
    }
    return existing;
  }
}

// =============================================================================
// Helpers
// =============================================================================

function extractKeyTopics(messages: Message[]): string[] {
  const topicPatterns: Record<string, RegExp> = {
    depression: /\b(depress(ion|ed)|sad|low\s+mood)\b/i,
    anxiety: /\b(anxi(ety|ous)|worr(y|ied)|panic|nervous)\b/i,
    sleep: /\b(sleep|insomnia|tired|fatigue)\b/i,
    stress: /\b(stress|overwhelm|burnout)\b/i,
    trauma: /\b(trauma|ptsd|flashback|abuse)\b/i,
    relationships: /\b(relationship|partner|lonely|isolated)\b/i,
    coping: /\b(cop(e|ing)|manag(e|ing)|handl(e|ing))\b/i,
  };

  const counts: Record<string, number> = {};
  const text = messages.map((m) => m.content).join(' ');

  for (const [topic, pattern] of Object.entries(topicPatterns)) {
    const matches = text.match(new RegExp(pattern, 'gi'));
    if (matches) counts[topic] = matches.length;
  }

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([topic]) => topic);
}
