/**
 * GEO-DETECT API ROUTE (Vercel Edge Function)
 *
 * Resolves IP → country code using Vercel's geo headers.
 * NEVER logs IP addresses — only country code.
 *
 * Fallback chain:
 * 1. Vercel x-vercel-ip-country header
 * 2. Cloudflare cf-ipcountry header
 * 3. x-forwarded-for → GeoIP lookup
 * 4. Return 'INTL' if all fail
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface GeoDetectResponse {
  countryCode: string;
  countryName: string;
  region: string;
  confidence: 'high' | 'low';
}

// ISO 3166-1 alpha-2 to country name mapping (subset)
const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  GB: 'United Kingdom',
  CA: 'Canada',
  AU: 'Australia',
  DE: 'Germany',
  FR: 'France',
  ES: 'Spain',
  IT: 'Italy',
  IN: 'India',
  BD: 'Bangladesh',
  BR: 'Brazil',
  MX: 'Mexico',
  JP: 'Japan',
  KR: 'South Korea',
  CN: 'China',
  INTL: 'International',
  // TODO: Expand to full list
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Try Vercel geo header first (most accurate)
    let countryCode = req.headers['x-vercel-ip-country'] as string;
    let confidence: 'high' | 'low' = 'high';

    // Fallback to Cloudflare header
    if (!countryCode) {
      countryCode = req.headers['cf-ipcountry'] as string;
      confidence = 'high';
    }

    // If still no result, default to INTL
    if (!countryCode || countryCode === 'XX' || countryCode === 'T1') {
      countryCode = 'INTL';
      confidence = 'low';
    }

    const countryName = COUNTRY_NAMES[countryCode] || countryCode;
    const region = req.headers['x-vercel-ip-country-region'] as string || '';

    const response: GeoDetectResponse = {
      countryCode,
      countryName,
      region,
      confidence,
    };

    // Cache response for 5 minutes
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    return res.status(200).json(response);
  } catch (error) {
    console.error('[Geo Detect Error]', error);

    // Never fail — return INTL fallback
    return res.status(200).json({
      countryCode: 'INTL',
      countryName: 'International',
      region: '',
      confidence: 'low',
    });
  }
}

export const config = {
  runtime: 'edge', // Use Vercel Edge for low latency
};
