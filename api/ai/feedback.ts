/**
 * MindMate 2.0 - Feedback API
 * POST /api/ai/feedback
 *
 * Collect user feedback on AI responses (thumbs up/down)
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { getRequiredEnv } from '../../src/lib/ai/config';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId, messageId, feedback } = req.body as {
      sessionId: string;
      messageId: string;
      feedback: 'positive' | 'negative';
    };

    if (!sessionId || !messageId || !feedback) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (feedback !== 'positive' && feedback !== 'negative') {
      return res.status(400).json({ error: 'Invalid feedback value' });
    }

    // Initialize Supabase admin client (auth + insert)
    const supabase = createClient(
      getRequiredEnv('VITE_SUPABASE_URL'),
      getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')
    );

    // Auth gate — require a valid Supabase JWT
    const authHeader = req.headers.authorization;
    const token = typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : null;

    if (!token) {
      return res.status(401).json({ error: 'Authentication required', code: 'NO_TOKEN' });
    }

    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData?.user) {
      return res.status(401).json({ error: 'Invalid or expired session', code: 'INVALID_TOKEN' });
    }

    // Log feedback event (anonymized)
    const { error } = await supabase
      .from('mindmate_events')
      .insert({
        session_id: sessionId,
        event_type: `feedback_${feedback}`,
        rag_used: true, // We don't know this from the request, but assume true
        web_search_used: false,
      });

    if (error) {
      console.error('Error logging feedback:', error);
      return res.status(500).json({ error: 'Failed to log feedback' });
    }

    return res.status(200).json({
      success: true,
    });

  } catch (error) {
    console.error('Feedback API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
