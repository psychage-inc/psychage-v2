// Shared "recently read" tracking for article cards.
// Persists the last 10 viewed article IDs in localStorage so the Learn page's
// "Continue Reading" rail stays in sync regardless of which surface (homepage,
// learn hub, category page) the user clicked from.

const RECENTLY_READ_KEY = 'psychage_recently_read';

export interface RecentlyReadEntry {
    id: string | number;
    timestamp: number;
}

export function getRecentlyReadIds(): RecentlyReadEntry[] {
    try {
        const stored = localStorage.getItem(RECENTLY_READ_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function saveRecentlyRead(articleId: string | number): void {
    try {
        const entries = getRecentlyReadIds().filter(e => String(e.id) !== String(articleId));
        entries.unshift({ id: articleId, timestamp: Date.now() });
        localStorage.setItem(RECENTLY_READ_KEY, JSON.stringify(entries.slice(0, 10)));
    } catch {
        // Storage full or unavailable
    }
}
