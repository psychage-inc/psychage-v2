import { supabase } from '@/lib/supabaseClient';

// =============================================================================
// Provider Analytics Event Tracking
// visitor_id is a hashed session token — NEVER a user_id or auth.uid()
// =============================================================================

type EventType =
  | 'profile_view'
  | 'search_impression'
  | 'phone_click'
  | 'email_click'
  | 'website_click'
  | 'favorite_add'
  | 'favorite_remove'
  | 'share';

type EventSource =
  | 'search'
  | 'direct'
  | 'article_referral'
  | 'navigator_referral'
  | 'external';

let _visitorId: string | null = null;

/** Generate a stable visitor ID for this browser session (hashed, anonymous) */
function getVisitorId(): string {
  if (_visitorId) return _visitorId;

  // Check sessionStorage first
  const stored = sessionStorage.getItem('psy_visitor_id');
  if (stored) {
    _visitorId = stored;
    return stored;
  }

  // Generate new anonymous session ID
  const id = crypto.randomUUID();
  sessionStorage.setItem('psy_visitor_id', id);
  _visitorId = id;
  return id;
}

// Batch queue for debounced inserts
const eventQueue: Array<{
  provider_id: string;
  event_type: EventType;
  source?: EventSource;
  metadata?: Record<string, unknown>;
}> = [];

let flushTimeout: ReturnType<typeof setTimeout> | null = null;
let consecutiveFailures = 0;
const BASE_FLUSH_INTERVAL = 2000;
const MAX_FLUSH_INTERVAL = 300_000; // 5 minutes

function getFlushInterval(): number {
  if (consecutiveFailures === 0) return BASE_FLUSH_INTERVAL;
  return Math.min(BASE_FLUSH_INTERVAL * Math.pow(2, consecutiveFailures), MAX_FLUSH_INTERVAL);
}

async function flushEvents() {
  if (eventQueue.length === 0) return;

  const batchSize = eventQueue.length;
  const visitorId = getVisitorId();

  // Copy the batch — do NOT splice yet
  const rows = eventQueue.slice(0, batchSize).map(e => ({
    provider_id: e.provider_id,
    event_type: e.event_type,
    source: e.source || null,
    visitor_id: visitorId,
    metadata: e.metadata || {},
  }));

  const { error } = await supabase.from('provider_analytics_events').insert(rows);

  if (error) {
    consecutiveFailures++;
    console.warn(
      `[ProviderAnalytics] Flush failed (attempt ${consecutiveFailures}, ${batchSize} events kept in queue):`,
      error.message
    );
    // Events remain in queue for next flush — schedule with backoff
    if (flushTimeout) clearTimeout(flushTimeout);
    flushTimeout = setTimeout(flushEvents, getFlushInterval());
  } else {
    // Success — remove the inserted events from the queue
    eventQueue.splice(0, batchSize);
    consecutiveFailures = 0;
  }
}

/**
 * Track a provider analytics event.
 * Events are batched and flushed every 2 seconds to reduce DB writes.
 */
export function trackProviderEvent(
  providerId: string,
  eventType: EventType,
  source?: EventSource,
  metadata?: Record<string, unknown>
) {
  eventQueue.push({ provider_id: providerId, event_type: eventType, source, metadata });

  if (flushTimeout) clearTimeout(flushTimeout);
  flushTimeout = setTimeout(flushEvents, getFlushInterval());
}

/**
 * Track a profile view (convenience wrapper).
 * Deduplicates: only fires once per provider per session.
 */
const viewedProviders = new Set<string>();

export function trackProfileView(providerId: string, source?: EventSource) {
  if (viewedProviders.has(providerId)) return;
  viewedProviders.add(providerId);
  trackProviderEvent(providerId, 'profile_view', source || 'direct');
}

/** Track a contact click (phone, email, website) */
export function trackContactClick(
  providerId: string,
  type: 'phone_click' | 'email_click' | 'website_click'
) {
  trackProviderEvent(providerId, type, 'direct');
}

// Flush remaining events when page unloads
// Uses fetch with keepalive instead of sendBeacon so the Supabase
// apikey header is included (sendBeacon doesn't support custom headers).
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (eventQueue.length === 0) return;

    const visitorId = getVisitorId();
    const rows = eventQueue.map(e => ({
      provider_id: e.provider_id,
      event_type: e.event_type,
      source: e.source || null,
      visitor_id: visitorId,
      metadata: e.metadata || {},
    }));

    const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/provider_analytics_events`;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(rows),
      keepalive: true,
    }).catch(() => {
      // Best-effort on page unload — nothing more we can do
    });
  });
}
