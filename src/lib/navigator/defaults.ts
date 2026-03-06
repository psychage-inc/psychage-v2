import { UserDuration, UserFrequency } from './types';

/**
 * Default values for symptom details when user skips or applies defaults.
 * These represent moderate/typical values to avoid skewing results.
 */
export const SYMPTOM_DEFAULTS = {
    severity: 5, // Moderate on 1-10 scale
    duration: '2_to_4_weeks' as UserDuration, // Weeks timeframe
    frequency: 'sometimes' as UserFrequency // Moderate frequency
} as const;

/**
 * Threshold for showing enhanced UX (progress bar, review panel, skip options).
 */
export const SYMPTOM_DETAIL_UX_THRESHOLD = 8;
