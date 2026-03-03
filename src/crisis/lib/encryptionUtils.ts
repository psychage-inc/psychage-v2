/**
 * ENCRYPTION UTILITIES
 *
 * AES-256-GCM encryption for safety plan storage.
 * User-derived keys — Psychage cannot read safety plan content.
 *
 * NEVER store encryption keys in Supabase.
 * Key derivation: user session token + constant salt → PBKDF2 → AES-256 key
 */

import type { SafetyPlanContent } from '../types/crisis.types';

const ENCRYPTION_ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;
const PBKDF2_ITERATIONS = 100000;

/**
 * Derive an encryption key from a user token + salt
 */
async function deriveKey(userToken: string, salt: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(userToken),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: ENCRYPTION_ALGORITHM, length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt safety plan content
 */
export async function encryptSafetyPlan(
  content: SafetyPlanContent,
  userToken: string
): Promise<{ encryptedContent: string; iv: string }> {
  const salt = import.meta.env.VITE_SAFETY_PLAN_ENCRYPTION_SALT || 'psychage-default-salt';
  const key = await deriveKey(userToken, salt);

  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(content));
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for GCM

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: ENCRYPTION_ALGORITHM, iv },
    key,
    data
  );

  // Convert to base64 for storage
  const encryptedArray = Array.from(new Uint8Array(encryptedBuffer));
  const encryptedContent = btoa(String.fromCharCode(...encryptedArray));
  const ivString = btoa(String.fromCharCode(...Array.from(iv)));

  return { encryptedContent, iv: ivString };
}

/**
 * Decrypt safety plan content
 */
export async function decryptSafetyPlan(
  encryptedContent: string,
  iv: string,
  userToken: string
): Promise<SafetyPlanContent> {
  const salt = import.meta.env.VITE_SAFETY_PLAN_ENCRYPTION_SALT || 'psychage-default-salt';
  const key = await deriveKey(userToken, salt);

  // Convert from base64
  const encryptedArray = Uint8Array.from(atob(encryptedContent), (c) => c.charCodeAt(0));
  const ivArray = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: ENCRYPTION_ALGORITHM, iv: ivArray },
    key,
    encryptedArray
  );

  const decoder = new TextDecoder();
  const jsonString = decoder.decode(decryptedBuffer);
  return JSON.parse(jsonString) as SafetyPlanContent;
}
