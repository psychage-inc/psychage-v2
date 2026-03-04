// =============================================================================
// GET /api/ai/conversations — List user's past conversations (authenticated)
// DELETE /api/ai/conversations/[id] — Delete a conversation (authenticated)
// GET /api/ai/conversations/[id] — Load a specific conversation (authenticated)
// =============================================================================

import { createClient } from '@supabase/supabase-js';
import type { Conversation, ConversationWithMessages } from '@/lib/ai/types';
import { getAIConfig, getRequiredEnv } from '@/lib/ai/config';
import { ConversationManager } from '@/lib/ai/context';

// =============================================================================
// List Conversations
// =============================================================================

export async function handleListConversations(
  userId: string,
  page: number = 1,
  limit: number = 20
): Promise<{ conversations: Conversation[]; total: number }> {
  const supabase = createClient(
    getRequiredEnv('SUPABASE_URL'),
    getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')
  );

  const config = getAIConfig();
  const manager = new ConversationManager(supabase, config);

  return manager.listUserConversations(userId, page, limit);
}

// =============================================================================
// Get Single Conversation
// =============================================================================

export async function handleGetConversation(
  conversationId: string,
  userId: string
): Promise<ConversationWithMessages | null> {
  const supabase = createClient(
    getRequiredEnv('SUPABASE_URL'),
    getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')
  );

  const config = getAIConfig();
  const manager = new ConversationManager(supabase, config);

  const conversation = await manager.loadConversation(conversationId);

  // Verify ownership
  if (!conversation || conversation.user_id !== userId) {
    return null;
  }

  return conversation;
}

// =============================================================================
// Delete Conversation
// =============================================================================

export async function handleDeleteConversation(
  conversationId: string,
  userId: string
): Promise<{ success: boolean }> {
  const supabase = createClient(
    getRequiredEnv('SUPABASE_URL'),
    getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')
  );

  const config = getAIConfig();
  const manager = new ConversationManager(supabase, config);

  const deleted = await manager.deleteConversation(conversationId, userId);

  return { success: deleted };
}
