// =============================================================================
// POST /api/ai/feedback — Thumbs up/down on a message
// =============================================================================

import { createClient } from '@supabase/supabase-js';
import type { FeedbackRequest } from '@/lib/ai/types';
import { getRequiredEnv } from '@/lib/ai/config';
import { AnalyticsTracker, generateSessionHash } from '@/lib/ai/analytics';

export async function handleFeedbackRequest(
  request: FeedbackRequest,
  sessionId: string
): Promise<{ success: boolean }> {
  const supabase = createClient(
    getRequiredEnv('SUPABASE_URL'),
    getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')
  );

  // Verify the message exists and belongs to this session's conversation
  const { data: message, error: msgError } = await supabase
    .from('ai_messages')
    .select('id, conversation_id')
    .eq('id', request.messageId)
    .single();

  if (msgError || !message) {
    throw new Error('Message not found');
  }

  // Verify conversation belongs to this session
  const { data: conversation, error: convError } = await supabase
    .from('ai_conversations')
    .select('session_id')
    .eq('id', message.conversation_id)
    .single();

  if (convError || !conversation || conversation.session_id !== sessionId) {
    throw new Error('Unauthorized');
  }

  // Track analytics (no PII — just the feedback signal)
  const analytics = new AnalyticsTracker(supabase);
  const sessionHash = await generateSessionHash(sessionId);
  analytics.trackFeedback(sessionHash, request.helpful);
  await analytics.flush();

  return { success: true };
}
