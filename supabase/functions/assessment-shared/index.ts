/**
 * EDGE FUNCTION: assessment-shared
 *
 * GET /functions/v1/assessment/shared/:token
 *
 * Provider views shared assessment data (no auth required, token is the auth)
 * One-time use only - token is marked as used after first retrieval
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { handleCorsPreflightRequest, createCorsResponse } from '../_shared/cors.ts';
import {
  createErrorResponse,
  handleUnexpectedError,
  logError,
  ERROR_CODES,
} from '../_shared/errors.ts';
import { decrypt, isValidEncryptionKey } from '../_shared/encryption.ts';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return handleCorsPreflightRequest();
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return createErrorResponse(
      ERROR_CODES.VALIDATION_ERROR,
      'Method not allowed. Use GET.'
    );
  }

  try {
    // Initialize Supabase client (service role to access share_tokens)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const encryptionKey = Deno.env.get('SHARE_ENCRYPTION_KEY')!;

    // Validate encryption key
    if (!isValidEncryptionKey(encryptionKey)) {
      logError('assessment-shared', new Error('Invalid encryption key configured'), {});
      return createErrorResponse(
        ERROR_CODES.INTERNAL_ERROR,
        'Server configuration error'
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Extract token from URL
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const token = pathParts[pathParts.length - 1];

    if (!token) {
      return createErrorResponse(
        ERROR_CODES.VALIDATION_ERROR,
        'Share token is required'
      );
    }

    // Fetch share token record
    const { data: shareToken, error: fetchError } = await supabase
      .from('share_tokens')
      .select('encrypted_data, expires_at, used_at')
      .eq('token', token)
      .single();

    if (fetchError || !shareToken) {
      return createErrorResponse(ERROR_CODES.SHARE_TOKEN_NOT_FOUND);
    }

    // Check if expired
    const expiresAt = new Date(shareToken.expires_at);
    if (expiresAt < new Date()) {
      return createErrorResponse(
        ERROR_CODES.SHARE_TOKEN_NOT_FOUND,
        'This share link has expired'
      );
    }

    // Check if already used (one-time use)
    if (shareToken.used_at) {
      return createErrorResponse(
        ERROR_CODES.SHARE_TOKEN_NOT_FOUND,
        'This share link has already been used'
      );
    }

    // Decrypt data
    let decryptedData;
    try {
      decryptedData = await decrypt(shareToken.encrypted_data, encryptionKey);
    } catch (decryptError) {
      logError('assessment-shared', decryptError, { action: 'decryption_failed' });
      return createErrorResponse(
        ERROR_CODES.ENCRYPTION_ERROR,
        'Failed to decrypt share data'
      );
    }

    // Mark token as used
    const { error: updateError } = await supabase
      .from('share_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('token', token);

    if (updateError) {
      logError('assessment-shared', updateError, { action: 'mark_used_failed' });
      // Non-fatal - continue
    }

    // Log access (anonymously)
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      function: 'assessment-shared',
      action: 'share_link_accessed',
      assessment_count: (decryptedData as any).assessments?.length || 0,
      status: 200,
    }));

    return createCorsResponse(JSON.stringify(decryptedData), { status: 200 });

  } catch (error) {
    return handleUnexpectedError('assessment-shared', error);
  }
});
