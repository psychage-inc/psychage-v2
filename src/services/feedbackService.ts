import { supabase } from '@/lib/supabaseClient';

const LOCAL_QUEUE_KEY = 'psychage_feedback_queue';

interface FeedbackPayload {
  content_type: 'article' | 'tool-result';
  content_id: string;
  helpful: boolean;
  comment?: string;
}

export async function submitFeedback(payload: FeedbackPayload): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('content_feedback').insert({
      content_type: payload.content_type,
      content_id: payload.content_id,
      helpful: payload.helpful,
      comment: payload.comment || null,
      user_id: user?.id || null,
    });

    if (error) throw error;
  } catch {
    // Fallback: queue in localStorage for anonymous or failed submissions
    const queue: FeedbackPayload[] = JSON.parse(
      localStorage.getItem(LOCAL_QUEUE_KEY) || '[]'
    );
    queue.push(payload);
    localStorage.setItem(LOCAL_QUEUE_KEY, JSON.stringify(queue));
  }
}
