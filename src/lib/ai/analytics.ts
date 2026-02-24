// =============================================================================
// Psychage AI Help — Analytics (Aggregate Only, No PII)
// =============================================================================

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AnalyticsEvent, AnalyticsEventType } from './types';

// =============================================================================
// Analytics Tracker
// =============================================================================

export class AnalyticsTracker {
  private supabase: SupabaseClient;
  private queue: AnalyticsEvent[] = [];
  private flushTimer: ReturnType<typeof setTimeout> | null = null;
  private flushInterval = 5000; // Flush every 5 seconds
  private maxQueueSize = 20;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  // ---------------------------------------------------------------------------
  // Track an event (batched for efficiency)
  // ---------------------------------------------------------------------------
  track(event: AnalyticsEvent): void {
    this.queue.push(event);

    if (this.queue.length >= this.maxQueueSize) {
      this.flush();
    } else if (!this.flushTimer) {
      this.flushTimer = setTimeout(() => this.flush(), this.flushInterval);
    }
  }

  // ---------------------------------------------------------------------------
  // Convenience methods for common events
  // ---------------------------------------------------------------------------

  trackConversationStarted(sessionHash: string, language?: string): void {
    this.track({
      event_type: 'conversation_started',
      session_hash: sessionHash,
      language,
    });
  }

  trackMessageSent(
    sessionHash: string,
    intent?: string,
    responseTimeMs?: number,
    articlesCitedCount?: number,
    language?: string
  ): void {
    this.track({
      event_type: 'message_sent',
      session_hash: sessionHash,
      intent: intent as AnalyticsEvent['intent'],
      response_time_ms: responseTimeMs,
      articles_cited_count: articlesCitedCount,
      language,
    });
  }

  trackCrisisDetected(sessionHash: string, language?: string): void {
    this.track({
      event_type: 'crisis_detected',
      session_hash: sessionHash,
      language,
    });
  }

  trackArticleLinked(
    sessionHash: string,
    count: number,
    language?: string
  ): void {
    this.track({
      event_type: 'article_linked',
      session_hash: sessionHash,
      articles_cited_count: count,
      language,
    });
  }

  trackProviderSuggested(sessionHash: string, language?: string): void {
    this.track({
      event_type: 'provider_suggested',
      session_hash: sessionHash,
      language,
    });
  }

  trackToolRouted(
    sessionHash: string,
    intent: string,
    language?: string
  ): void {
    this.track({
      event_type: 'tool_routed',
      session_hash: sessionHash,
      intent: intent as AnalyticsEvent['intent'],
      language,
    });
  }

  trackFeedback(
    sessionHash: string,
    helpful: boolean,
    language?: string
  ): void {
    this.track({
      event_type: 'feedback_received',
      session_hash: sessionHash,
      feedback_helpful: helpful,
      language,
    });
  }

  // ---------------------------------------------------------------------------
  // Flush queued events to database
  // ---------------------------------------------------------------------------
  async flush(): Promise<void> {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }

    if (this.queue.length === 0) return;

    const events = [...this.queue];
    this.queue = [];

    try {
      const { error } = await this.supabase
        .from('ai_analytics')
        .insert(events);

      if (error) {
        console.error('Analytics flush error:', error);
        // Don't re-queue on failure — analytics are non-critical
      }
    } catch (err) {
      console.error('Analytics flush exception:', err);
    }
  }

  // ---------------------------------------------------------------------------
  // Clean up (call on shutdown)
  // ---------------------------------------------------------------------------
  async dispose(): Promise<void> {
    await this.flush();
  }
}

// =============================================================================
// Session Hash Generator (anonymized, non-linkable)
// =============================================================================

export async function generateSessionHash(sessionId: string): Promise<string> {
  // Use Web Crypto API for consistent, non-reversible hashing
  const encoder = new TextEncoder();
  const data = encoder.encode(`psychage_analytics_${sessionId}_${getDateKey()}`);

  if (typeof globalThis.crypto?.subtle !== 'undefined') {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Fallback: simple non-crypto hash for environments without SubtleCrypto
  let hash = 0;
  const str = `psychage_analytics_${sessionId}_${getDateKey()}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

// Rotate hash daily so sessions can't be tracked across days
function getDateKey(): string {
  return new Date().toISOString().slice(0, 10);
}
