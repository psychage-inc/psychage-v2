/**
 * CORS UTILITIES
 *
 * Standardized CORS headers for all Edge Functions
 */

/**
 * Get CORS headers for response
 *
 * @param allowedOrigin - Origin to allow (from env var)
 * @returns Headers object with CORS configuration
 */
export function getCorsHeaders(allowedOrigin?: string): HeadersInit {
  const origin = allowedOrigin || Deno.env.get('CORS_ORIGIN') || 'http://localhost:3000';

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-client-info, apikey',
    'Access-Control-Max-Age': '86400', // 24 hours
  };
}

/**
 * Handle CORS preflight request
 *
 * @returns Response for OPTIONS request
 */
export function handleCorsPreflightRequest(): Response {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

/**
 * Create a Response with CORS headers
 *
 * @param body - Response body
 * @param init - Response init options
 * @returns Response with CORS headers
 */
export function createCorsResponse(
  body: BodyInit | null,
  init?: ResponseInit
): Response {
  const headers = new Headers(init?.headers);

  // Add CORS headers
  const corsHeaders = getCorsHeaders();
  for (const [key, value] of Object.entries(corsHeaders)) {
    headers.set(key, value);
  }

  // Set default content type if not provided
  if (!headers.has('Content-Type') && body) {
    headers.set('Content-Type', 'application/json');
  }

  return new Response(body, {
    ...init,
    headers,
  });
}

/**
 * Check if origin is allowed
 *
 * @param origin - Origin header from request
 * @returns True if origin is allowed
 */
export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;

  const allowedOrigin = Deno.env.get('CORS_ORIGIN') || 'http://localhost:3000';
  const allowedOrigins = allowedOrigin.split(',').map(o => o.trim());

  // Also allow localhost variants in development
  const isDevelopment = allowedOrigins.some(o => o.includes('localhost'));
  if (isDevelopment) {
    allowedOrigins.push(
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173'
    );
  }

  return allowedOrigins.includes(origin);
}
