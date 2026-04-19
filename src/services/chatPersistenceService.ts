/**
 * Chat Persistence Service — Supabase persistence for MindMate AI conversations
 *
 * Stores conversation history in ai_conversations / ai_messages tables
 * when the user is authenticated and has consented to AI chat history storage.
 */

import { supabase } from '../lib/supabaseClient';

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    created_at: string;
}

export interface ChatConversation {
    id: string;
    session_id: string;
    user_id: string;
    message_count: number;
    last_message_at: string;
    is_active: boolean;
    created_at: string;
}

export const chatPersistenceService = {
    /**
     * Get or create a conversation for the given session ID.
     */
    getOrCreateConversation: async (
        sessionId: string,
        userId: string
    ): Promise<ChatConversation | null> => {
        try {
            // Try to find existing conversation
            const { data: existing, error: findError } = await supabase
                .from('ai_conversations')
                .select('*')
                .eq('session_id', sessionId)
                .eq('user_id', userId)
                .eq('is_active', true)
                .maybeSingle();

            if (findError) {
                console.error('Error finding conversation:', findError);
                return null;
            }

            if (existing) return existing as ChatConversation;

            // Create new conversation
            const { data: created, error: createError } = await supabase
                .from('ai_conversations')
                .insert({
                    session_id: sessionId,
                    user_id: userId,
                    language: 'en',
                    message_count: 0,
                })
                .select()
                .single();

            if (createError) {
                console.error('Error creating conversation:', createError);
                return null;
            }

            return created as ChatConversation;
        } catch (error) {
            console.error('Failed to get/create conversation:', error);
            return null;
        }
    },

    /**
     * Save a message to the conversation.
     */
    saveMessage: async (
        conversationId: string,
        role: 'user' | 'assistant',
        content: string
    ): Promise<ChatMessage | null> => {
        try {
            const { data, error } = await supabase
                .from('ai_messages')
                .insert({
                    conversation_id: conversationId,
                    role,
                    content,
                })
                .select('id, role, content, created_at')
                .single();

            if (error) {
                console.error('Error saving message:', error);
                return null;
            }

            // Update conversation metadata
            const { error: updateErr } = await supabase
                .from('ai_conversations')
                .update({
                    last_message_at: new Date().toISOString(),
                })
                .eq('id', conversationId);
            if (updateErr) console.error('Failed to update conversation timestamp:', updateErr);

            // Increment message count directly (no RPC needed)
            try {
                const { data: conv } = await supabase
                    .from('ai_conversations')
                    .select('message_count')
                    .eq('id', conversationId)
                    .single();
                if (conv) {
                    await supabase
                        .from('ai_conversations')
                        .update({ message_count: (conv.message_count || 0) + 1 })
                        .eq('id', conversationId);
                }
            } catch {
                // Non-critical — message was already saved
            }

            return data as ChatMessage;
        } catch (error) {
            console.error('Failed to save message:', error);
            return null;
        }
    },

    /**
     * Load all messages for a conversation.
     */
    loadConversation: async (conversationId: string): Promise<ChatMessage[]> => {
        try {
            const { data, error } = await supabase
                .from('ai_messages')
                .select('id, role, content, created_at')
                .eq('conversation_id', conversationId)
                .order('created_at', { ascending: true });

            if (error) {
                console.error('Error loading conversation:', error);
                return [];
            }

            return (data || []) as ChatMessage[];
        } catch (error) {
            console.error('Failed to load conversation:', error);
            return [];
        }
    },

    /**
     * List all conversations for a user.
     */
    listConversations: async (userId: string, limit = 20): Promise<ChatConversation[]> => {
        try {
            const { data, error } = await supabase
                .from('ai_conversations')
                .select('*')
                .eq('user_id', userId)
                .eq('is_active', true)
                .order('last_message_at', { ascending: false })
                .limit(limit);

            if (error) {
                console.error('Error listing conversations:', error);
                return [];
            }

            return (data || []) as ChatConversation[];
        } catch (error) {
            console.error('Failed to list conversations:', error);
            return [];
        }
    },

    /**
     * Delete (deactivate) a conversation and its messages.
     */
    deleteConversation: async (conversationId: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('ai_conversations')
                .update({ is_active: false })
                .eq('id', conversationId);

            if (error) {
                console.error('Error deleting conversation:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Failed to delete conversation:', error);
            return false;
        }
    },
};
