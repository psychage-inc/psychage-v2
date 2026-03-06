/**
 * Maps an action string to a StatusBadge status key based on keywords.
 */
export function getActionBadgeStatus(action: string): string {
    const lower = (action || '').toLowerCase();
    if (lower.includes('approve') || lower.includes('active')) return 'active';
    if (lower.includes('reject') || lower.includes('suspend')) return 'rejected';
    if (lower.includes('report') || lower.includes('alert')) return 'pending';
    if (lower.includes('login') || lower.includes('register') || lower.includes('create')) return 'investigating';
    return 'inactive';
}

/**
 * Converts snake_case or raw action strings to human-readable Title Case.
 * e.g., "provider_approved" → "Provider Approved"
 */
export function humanizeAction(action: string): string {
    return action
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}
