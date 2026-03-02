/**
 * EDGE FUNCTION: health
 *
 * GET /functions/v1/health
 *
 * Health check endpoint (no authentication required)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { handleCorsPreflightRequest, createCorsResponse } from '../_shared/cors.ts';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return handleCorsPreflightRequest();
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return createCorsResponse(
      JSON.stringify({ error: 'Method not allowed. Use GET.' }),
      { status: 405 }
    );
  }

  return createCorsResponse(
    JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'clarity-score-backend',
      version: '1.0.0',
    }),
    { status: 200 }
  );
});
