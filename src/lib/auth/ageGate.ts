// Signup age gate (counsel compliance item 5).
//
// Account creation is for adults only. The gate asks for a birth year and,
// for anyone under the cutoff, locks itself on this device for 24 hours.
// The lock lives in localStorage so it survives reloads and new tabs.

export const AGE_GATE_LOCK_KEY = 'psychage_age_gate_locked_until';

const ADULT_AGE = 18;
const LOCK_DURATION_MS = 24 * 60 * 60 * 1000;

export function isAdultByBirthYear(birthYear: number, now: Date): boolean {
    return now.getFullYear() - birthYear >= ADULT_AGE;
}

export function lockAgeGate(now: Date): void {
    localStorage.setItem(AGE_GATE_LOCK_KEY, String(now.getTime() + LOCK_DURATION_MS));
}

// An expired or malformed stored value counts as unlocked and is removed.
export function isAgeGateLocked(now: Date): boolean {
    const raw = localStorage.getItem(AGE_GATE_LOCK_KEY);
    if (raw === null) return false;

    const lockedUntil = /^\d+$/.test(raw) ? Number(raw) : NaN;
    if (Number.isFinite(lockedUntil) && lockedUntil > now.getTime()) return true;

    localStorage.removeItem(AGE_GATE_LOCK_KEY);
    return false;
}
