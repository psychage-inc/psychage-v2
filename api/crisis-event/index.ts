/**
 * CRISIS EVENT API ROUTE
 *
 * Logs anonymous crisis events to Supabase for impact tracking.
 * NEVER logs: raw text, IP addresses, user identity, specific keywords.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { CrisisTier } from '../../src/crisis/types/crisis.types';

interface CrisisEventRequest {
  tier: CrisisTier;
  country_code: string;
  detected_language: string;
  session_id: string; // Already hashed client-side
  throughline_resource_shown: boolean;
  emergency_modal_dismissed?: boolean;
  dismissal_path?: 'called_help' | 'safe_now';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const event: CrisisEventRequest = req.body;

    // Validate required fields
    if (!event.tier || !event.session_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert into Supabase crisis_events table
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const { error: dbError } = await supabase.from('crisis_events').insert({
        tier: event.tier,
        country_code: event.country_code,
        detected_language: event.detected_language,
        session_id: event.session_id,
        throughline_resource_shown: event.throughline_resource_shown,
        emergency_modal_dismissed: event.emergency_modal_dismissed,
        dismissal_path: event.dismissal_path,
        triggered_at: new Date().toISOString(),
      });

      if (dbError) {
        console.error('[Supabase Insert Error]', dbError);
        // Continue anyway - logging must never break crisis flow
      }
    } catch (dbError) {
      console.error('[Database Error]', dbError);
      // Continue anyway
    }

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error('[Crisis Event API Error]', error);

    // Silent failure — logging must never break crisis flow
    return res.status(201).json({ success: true });
  }
}
