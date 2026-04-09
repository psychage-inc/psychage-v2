// Shared date formatter for article cards.
// Returns null when the input is undefined or unparseable so callers can
// gate rendering of the date row.
export function formatDate(dateStr: string | undefined): string | null {
    if (!dateStr) return null;
    try {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    } catch {
        return null;
    }
}
