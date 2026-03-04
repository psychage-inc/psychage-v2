/**
 * RATE LIMITING
 *
 * Token bucket rate limiter using Supabase database for state persistence
 */

import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

export interface RateLimitConfig {
  maxTokens: number;      // Maximum tokens in bucket
  refillRate: number;     // Tokens added per refill period
  refillInterval: number; // Refill period in milliseconds
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

// Predefined rate limit configurations
export const RATE_LIMITS = {
  // User assessment starts: 10 per day
  ASSESSMENT_START_USER: {
    maxTokens: 10,
    refillRate: 10,
    refillInterval: 24 * 60 * 60 * 1000, // 24 hours
  },
  // Anonymous assessments: 3 per hour per IP
  ASSESSMENT_START_ANON: {
    maxTokens: 3,
    refillRate: 3,
    refillInterval: 60 * 60 * 1000, // 1 hour
  },
  // Share link creation: 5 per hour
  SHARE_CREATE: {
    maxTokens: 5,
    refillRate: 5,
    refillInterval: 60 * 60 * 1000, // 1 hour
  },
} as const;

/**
 * Check and consume a rate limit token
 *
 * @param supabase - Supabase client (must have service role for rate_limits table access)
 * @param key - Unique key for this rate limit (e.g., 'user:{uid}:assessment_start')
 * @param config - Rate limit configuration
 * @returns Rate limit result indicating if request is allowed
 */
export async function checkRateLimit(
  supabase: SupabaseClient,
  key: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const now = Date.now();

  // Get current state from database
  const { data: existing, error: fetchError } = await supabase
    .from('rate_limits')
    .select('tokens, last_refill')
    .eq('key', key)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    // PGRST116 = not found (expected for new keys)
    console.error('Rate limit fetch error:', fetchError);
    // Fail open - allow request on database error
    return {
      allowed: true,
      remaining: config.maxTokens - 1,
      resetAt: new Date(now + config.refillInterval),
    };
  }

  let tokens = config.maxTokens;
  let lastRefill = now;

  if (existing) {
    // Calculate tokens to add since last refill
    const lastRefillTime = new Date(existing.last_refill).getTime();
    const timeSinceRefill = now - lastRefillTime;
    const intervalsElapsed = Math.floor(timeSinceRefill / config.refillInterval);

    if (intervalsElapsed > 0) {
      // Refill tokens
      tokens = Math.min(
        config.maxTokens,
        existing.tokens + (intervalsElapsed * config.refillRate)
      );
      lastRefill = lastRefillTime + (intervalsElapsed * config.refillInterval);
    } else {
      // No refill yet
      tokens = existing.tokens;
      lastRefill = lastRefillTime;
    }
  }

  // Check if request is allowed
  const allowed = tokens > 0;

  if (allowed) {
    // Consume a token
    tokens -= 1;
  }

  // Update database
  const { error: upsertError } = await supabase
    .from('rate_limits')
    .upsert({
      key,
      tokens,
      last_refill: new Date(lastRefill).toISOString(),
    }, {
      onConflict: 'key',
    });

  if (upsertError) {
    console.error('Rate limit upsert error:', upsertError);
  }

  // Calculate next reset time
  const resetAt = new Date(lastRefill + config.refillInterval);

  return {
    allowed,
    remaining: tokens,
    resetAt,
  };
}

/**
 * Get current rate limit status without consuming a token
 */
export async function getRateLimitStatus(
  supabase: SupabaseClient,
  key: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const now = Date.now();

  const { data: existing, error } = await supabase
    .from('rate_limits')
    .select('tokens, last_refill')
    .eq('key', key)
    .single();

  if (error || !existing) {
    // No record = full tokens available
    return {
      allowed: true,
      remaining: config.maxTokens,
      resetAt: new Date(now + config.refillInterval),
    };
  }

  // Calculate current tokens (with refill)
  const lastRefillTime = new Date(existing.last_refill).getTime();
  const timeSinceRefill = now - lastRefillTime;
  const intervalsElapsed = Math.floor(timeSinceRefill / config.refillInterval);

  let tokens = existing.tokens;
  let lastRefill = lastRefillTime;

  if (intervalsElapsed > 0) {
    tokens = Math.min(
      config.maxTokens,
      existing.tokens + (intervalsElapsed * config.refillRate)
    );
    lastRefill = lastRefillTime + (intervalsElapsed * config.refillInterval);
  }

  const resetAt = new Date(lastRefill + config.refillInterval);

  return {
    allowed: tokens > 0,
    remaining: tokens,
    resetAt,
  };
}

/**
 * Reset rate limit for a key (admin function)
 */
export async function resetRateLimit(
  supabase: SupabaseClient,
  key: string
): Promise<void> {
  await supabase
    .from('rate_limits')
    .delete()
    .eq('key', key);
}

/**
 * Clean up old rate limit entries (run via cron)
 */
export async function cleanupOldRateLimits(
  supabase: SupabaseClient,
  olderThanDays = 7
): Promise<number> {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - olderThanDays);

  const { count, error } = await supabase
    .from('rate_limits')
    .delete({ count: 'exact' })
    .lt('last_refill', cutoff.toISOString());

  if (error) {
    console.error('Rate limit cleanup error:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Generate rate limit key for user
 */
export function getUserRateLimitKey(userId: string, action: string): string {
  return `user:${userId}:${action}`;
}

/**
 * Generate rate limit key for IP address (anonymous users)
 */
export function getIPRateLimitKey(ip: string, action: string): string {
  return `ip:${ip}:${action}`;
}
