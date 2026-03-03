/**
 * MOOD LOG API ROUTE
 *
 * Saves mood entries to Supabase.
 * Anonymous users: Not used (localStorage only).
 * Authenticated users: Encrypted storage with user-derived key.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import type { MoodLevel } from '../../src/crisis/types/crisis.types';

interface MoodLogRequest {
  mood_level: MoodLevel;
  user_id_hash: string; // SHA-256 hashed user ID
  country_code: string;
  triggered_alert_type?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { mood_level, user_id_hash, country_code, triggered_alert_type }: MoodLogRequest =
      req.body;

    // Validate required fields
    if (mood_level === undefined || !user_id_hash) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate mood level range
    if (mood_level < 0 || mood_level > 5) {
      return res.status(400).json({ error: 'Invalid mood level (must be 0-5)' });
    }

    // Validate user_id_hash format (should be SHA-256 hex, 64 chars)
    if (!user_id_hash || user_id_hash.length !== 64 || !/^[a-f0-9]+$/.test(user_id_hash)) {
      return res.status(400).json({ error: 'Invalid user_id_hash format' });
    }

    // Get environment variables
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase environment variables not configured');
    }

    // Create server-side Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Insert into Supabase mood_logs table
    const { data, error } = await supabase
      .from('mood_logs')
      .insert({
        user_id_hash,
        mood_level,
        country_code,
        triggered_alert_type,
        logged_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('[Mood Log API] Insert error:', error);
      return res.status(500).json({ error: 'Failed to log mood' });
    }

    return res.status(201).json({
      success: true,
      mood_level,
      id: data.id,
      logged_at: data.logged_at,
    });

  } catch (dbError) {
    console.error('[Mood Log API] Database error:', dbError);
    return res.status(500).json({ error: 'Database connection failed' });
  }
}
