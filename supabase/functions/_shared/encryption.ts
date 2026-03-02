/**
 * ENCRYPTION UTILITIES
 *
 * AES-256-GCM encryption/decryption for share link data
 */

/**
 * Encrypt data using AES-256-GCM
 *
 * @param data - Data to encrypt (will be JSON.stringified)
 * @param key - 32-byte encryption key (hex string)
 * @returns Base64-encoded encrypted data with IV prepended
 */
export async function encrypt(data: unknown, key: string): Promise<string> {
  // Convert hex key to bytes
  const keyBytes = hexToBytes(key);

  // Import key for AES-GCM
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  // Generate random IV (12 bytes for GCM)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Encrypt data
  const dataBytes = new TextEncoder().encode(JSON.stringify(data));
  const encryptedBytes = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    dataBytes
  );

  // Prepend IV to encrypted data
  const combined = new Uint8Array(iv.length + encryptedBytes.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encryptedBytes), iv.length);

  // Return as base64
  return bytesToBase64(combined);
}

/**
 * Decrypt data using AES-256-GCM
 *
 * @param encryptedData - Base64-encoded encrypted data (with IV prepended)
 * @param key - 32-byte encryption key (hex string)
 * @returns Decrypted and parsed data
 */
export async function decrypt<T = unknown>(
  encryptedData: string,
  key: string
): Promise<T> {
  try {
    // Convert hex key to bytes
    const keyBytes = hexToBytes(key);

    // Import key for AES-GCM
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );

    // Decode base64
    const combined = base64ToBytes(encryptedData);

    // Extract IV (first 12 bytes) and ciphertext
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);

    // Decrypt
    const decryptedBytes = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      ciphertext
    );

    // Parse JSON
    const decryptedText = new TextDecoder().decode(decryptedBytes);
    return JSON.parse(decryptedText) as T;
  } catch (error) {
    throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'unknown error'}`);
  }
}

/**
 * Generate a cryptographically secure random token
 *
 * @param length - Number of random bytes (default 32)
 * @returns Hex string token
 */
export function generateSecureToken(length = 32): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return bytesToHex(bytes);
}

/**
 * Hash a value using SHA-256 (for user ID hashing in logs)
 *
 * @param value - Value to hash
 * @returns Hex string hash
 */
export async function sha256Hash(value: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return bytesToHex(new Uint8Array(hashBuffer));
}

// ===== HELPER FUNCTIONS =====

/**
 * Convert hex string to Uint8Array
 */
function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error('Hex string must have even length');
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Convert Uint8Array to hex string
 */
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Convert Uint8Array to base64 string
 */
function bytesToBase64(bytes: Uint8Array): string {
  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte)
  ).join('');
  return btoa(binString);
}

/**
 * Convert base64 string to Uint8Array
 */
function base64ToBytes(base64: string): Uint8Array {
  const binString = atob(base64);
  return Uint8Array.from(binString, (char) => char.codePointAt(0)!);
}

/**
 * Validate encryption key format
 */
export function isValidEncryptionKey(key: string): boolean {
  // Must be 64 hex characters (32 bytes)
  return /^[0-9a-f]{64}$/i.test(key);
}
