/**
 * POST /api/navigator/save-results
 *
 * Saves navigator results for an authenticated user.
 * Results are encrypted (AES-256-GCM) before storage.
 * Requires a valid Supabase Auth token.
 */

import { createClient } from '@supabase/supabase-js';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Encryption key — must be 32 bytes for AES-256
// In production, this comes from environment variables
const ENCRYPTION_KEY = process.env.NAVIGATOR_ENCRYPTION_KEY ?? '';

function getEncryptionKey(): Buffer {
  if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length < 32) {
    throw new Error('NAVIGATOR_ENCRYPTION_KEY must be set (32+ char hex string)');
  }
  return Buffer.from(ENCRYPTION_KEY.slice(0, 64), 'hex');
}

export function encryptResults(plaintext: string): string {
  const key = getEncryptionKey();
  const iv = randomBytes(12); // 96-bit IV for GCM
  const cipher = createCipheriv('aes-256-gcm', key, iv);

  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  const authTag = cipher.getAuthTag();

  // Format: iv:authTag:ciphertext (all base64)
  return `${iv.toString('base64')}:${authTag.toString('base64')}:${encrypted}`;
}

export function decryptResults(encryptedStr: string): string {
  const key = getEncryptionKey();
  const [ivB64, authTagB64, ciphertext] = encryptedStr.split(':');

  const iv = Buffer.from(ivB64, 'base64');
  const authTag = Buffer.from(authTagB64, 'base64');
  const decipher = createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(ciphertext, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/**
 * Extract and verify the user from the Authorization header.
 */
async function authenticateUser(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.slice(7);
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) return null;
  return data.user;
}

export async function POST(request: Request): Promise<Response> {
  try {
    // Authenticate
    const user = await authenticateUser(request);
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const body = await request.json();

    // Validate payload
    if (!body.results || typeof body.results !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid results payload' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Idempotency check — prevent duplicate saves on retry/double-click
    const idempotencyKey = typeof body.idempotency_key === 'string'
      ? body.idempotency_key.slice(0, 128)
      : null;

    if (idempotencyKey) {
      const { data: existing } = await supabase
        .from('navigator_saved_results')
        .select('id, created_at')
        .eq('user_id', user.id)
        .eq('idempotency_key', idempotencyKey)
        .maybeSingle();

      if (existing) {
        return new Response(
          JSON.stringify({ id: existing.id, created_at: existing.created_at }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Encrypt the results before storage
    const plaintext = JSON.stringify(body.results);

    // Size limit: 1MB before encryption
    if (plaintext.length > 1_000_000) {
      return new Response(
        JSON.stringify({ error: 'Results payload too large' }),
        {
          status: 413,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const encrypted = encryptResults(plaintext);

    // Insert into database
    const { data, error } = await supabase
      .from('navigator_saved_results')
      .insert({
        user_id: user.id,
        encrypted_results: encrypted,
        ...(idempotencyKey ? { idempotency_key: idempotencyKey } : {}),
      })
      .select('id, created_at')
      .single();

    if (error) {
      console.error('[Navigator Save] Insert error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save results' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        id: data.id,
        created_at: data.created_at,
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('[Navigator Save] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
