// Clarity Journal — Date utilities
// Streak calculation, week boundaries, date formatting

/** Get today's date as YYYY-MM-DD */
export function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Get the Monday of the week containing the given date */
export function getWeekStart(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1; // Sunday = 6 days back
  d.setDate(d.getDate() - diff);
  return d.toISOString().slice(0, 10);
}

/** Get the Sunday of the week containing the given date */
export function getWeekEnd(dateStr: string): string {
  const start = getWeekStart(dateStr);
  const d = new Date(start + 'T12:00:00');
  d.setDate(d.getDate() + 6);
  return d.toISOString().slice(0, 10);
}

/**
 * Calculate streak of consecutive days from an array of date strings (YYYY-MM-DD).
 * Returns the current streak count (0 if no check-in today or yesterday).
 */
export function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const uniqueSorted = [...new Set(dates)].sort().reverse();
  const today = getToday();
  const yesterday = addDays(today, -1);

  // Streak only counts if most recent entry is today or yesterday
  if (uniqueSorted[0] !== today && uniqueSorted[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < uniqueSorted.length; i++) {
    const expected = addDays(uniqueSorted[i - 1], -1);
    if (uniqueSorted[i] === expected) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/** Add (or subtract) days from a YYYY-MM-DD string */
export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Format a YYYY-MM-DD date for display */
export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/** Format a date range "Mar 3 – Mar 9, 2026" */
export function formatDateRange(startStr: string, endStr: string): string {
  try {
    const start = new Date(startStr + 'T12:00:00');
    const end = new Date(endStr + 'T12:00:00');
    const startFormatted = start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const endFormatted = end.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startFormatted} – ${endFormatted}`;
  } catch {
    return `${startStr} – ${endStr}`;
  }
}

/** Check if a date string is today */
export function isToday(dateStr: string): boolean {
  return dateStr === getToday();
}

/** Check if a date is in the future */
export function isFuture(dateStr: string): boolean {
  return dateStr > getToday();
}

/** Generate ISO datetime string for now */
export function nowISO(): string {
  return new Date().toISOString();
}

/** Generate a simple UUID v4 */
export function generateId(): string {
  return crypto.randomUUID();
}
