import { supabase } from '@/lib/supabaseClient';
import { throwOnError } from '@/lib/supabaseError';

interface FeedbackPayload {
  content_type: 'article' | 'tool-result';
  content_id: string;
  helpful: boolean;
  comment?: string;
}

export async function submitFeedback(payload: FeedbackPayload): Promise<void> {
  // Throw on failure so the widget can show a real error. Previously the error
  // was swallowed into a localStorage queue that nothing ever drained, so every
  // submission looked successful even when it was lost.
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from('content_feedback').insert({
    content_type: payload.content_type,
    content_id: payload.content_id,
    helpful: payload.helpful,
    comment: payload.comment || null,
    user_id: user?.id || null,
  });

  throwOnError(error, 'Submit feedback');
}
