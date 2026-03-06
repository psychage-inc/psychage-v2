/**
 * Utility for safely highlighting search query matches in text.
 * Escapes regex special characters to prevent injection.
 * WCAG 2.4.7: Ensures accessible highlighting with semantic markup.
 */

/**
 * Escapes special regex characters in a string to prevent regex injection
 * @param str String to escape
 * @returns Escaped string safe for use in RegExp constructor
 */
export function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Splits text into segments, marking matches for highlighting.
 * Case-insensitive matching, preserves original casing.
 * @param text Text to search within
 * @param query Search query
 * @returns Array of segments with match flag
 */
export function getHighlightSegments(
    text: string,
    query: string
): Array<{ text: string; isMatch: boolean }> {
    // Don't highlight for short queries (avoid UI noise)
    if (!query || query.trim().length < 2) {
        return [{ text, isMatch: false }];
    }

    const escapedQuery = escapeRegex(query.trim());
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const parts = text.split(regex);

    return parts
        .filter(part => part.length > 0)
        .map(part => ({
            text: part,
            isMatch: regex.test(part)
        }));
}
