/**
 * THROUGHLINE API PROXY
 *
 * Proxies requests to ThroughLine API, hiding API key from client.
 * Implements 24hr caching in Supabase to reduce API calls.
 *
 * Fallback: Returns static resources if ThroughLine is down.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { CrisisResource } from '../../src/crisis/types/crisis.types';
import { getFallbackResourcesByCountry } from '../../src/crisis/data/fallbackResources';

interface ThroughLineRequest {
  countryCode: string;
  topic?: string;
  language?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { countryCode, topic, language }: ThroughLineRequest = req.body;

    if (!countryCode) {
      return res.status(400).json({ error: 'Country code required' });
    }

    // TODO: Check Supabase cache first (24hr TTL)
    // const cached = await getCachedResources(countryCode);
    // if (cached) return res.status(200).json({ resources: cached, cached: true });

    // TODO: Call ThroughLine API when key is available
    // const apiKey = process.env.THROUGHLINE_API_KEY;
    // const apiUrl = process.env.THROUGHLINE_API_BASE_URL;
    // const response = await fetch(`${apiUrl}/resources`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${apiKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ country: countryCode, topic, language }),
    // });

    // For now, use fallback resources
    const resources = getFallbackResourcesByCountry(countryCode);

    return res.status(200).json({ resources, cached: false });
  } catch (error) {
    console.error('[ThroughLine API Error]', error);

    // Always fall back to static resources — never fail
    const { countryCode } = req.body;
    const resources = getFallbackResourcesByCountry(countryCode || 'INTL');
    return res.status(200).json({ resources, cached: false, fallback: true });
  }
}
