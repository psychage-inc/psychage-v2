// =============================================================================
// Last-Updated Signal — relative/absolute formatting with staleness detection
// =============================================================================

interface LastUpdatedInput {
  status: string;
  updated_at: string;
  data_last_synced_at?: string | null;
}

interface LastUpdatedResult {
  /** Display text, e.g., "Profile updated March 2026" */
  text: string;
  /** ISO date for <time datetime="..."> */
  datetime: string;
  /** True if beyond threshold — renders amber warning */
  isStale: boolean;
}

/**
 * Formats a provider's last-updated signal with relative/absolute date and
 * a stale-data warning if beyond the status-appropriate threshold.
 *
 * Per Correction 3: 24-month threshold for seeded providers (NPPES data
 * changes slowly), 12-month for claimed/verified (expected to maintain).
 */
export function formatLastUpdated(provider: LastUpdatedInput): LastUpdatedResult {
  const isSeeded = provider.status === 'seeded';
  const dateStr = isSeeded
    ? (provider.data_last_synced_at ?? provider.updated_at)
    : provider.updated_at;
  const date = new Date(dateStr);
  const now = new Date();
  const msAgo = now.getTime() - date.getTime();
  const daysAgo = msAgo / (1000 * 60 * 60 * 24);
  const monthsAgo = daysAgo / 30;

  const prefix = isSeeded ? 'Data imported' : 'Profile updated';
  const staleThresholdMonths = isSeeded ? 24 : 12;
  const isStale = monthsAgo >= staleThresholdMonths;

  let text: string;
  if (isStale) {
    text = isSeeded
      ? 'Data imported over two years ago — information may not be current'
      : 'Profile last updated over a year ago — information may not be current';
  } else if (daysAgo < 1) {
    text = `${prefix} today`;
  } else if (daysAgo < 7) {
    const days = Math.floor(daysAgo);
    text = `${prefix} ${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (daysAgo < 30) {
    const weeks = Math.floor(daysAgo / 7);
    text = `${prefix} ${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else {
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    });
    text = `${prefix} ${formatter.format(date)}`;
  }

  return { text, datetime: date.toISOString(), isStale };
}
