/**
 * Consent Service — GDPR consent audit trail
 *
 * Manages user consent records with immutable logging.
 * Every consent action is logged with timestamp, version, and source.
 */

import { supabase } from '../lib/supabaseClient';

export type ConsentType =
    | 'terms_of_service'
    | 'privacy_policy'
    | 'data_processing'
    | 'newsletter'
    | 'analytics_cookies'
    | 'ai_chat_history'
    | 'clarity_score_tracking'
    | 'age_verification';

export interface ConsentRecord {
    id: string;
    user_id: string | null;
    consent_type: ConsentType;
    granted: boolean;
    version: string;
    granted_at: string;
    revoked_at: string | null;
    metadata: Record<string, unknown>;
}

const CONSENT_VERSION = 'v1.0';

export const consentService = {
    /**
     * Log a consent decision (grant or revoke).
     * Each call creates a new immutable record in the audit trail.
     */
    logConsent: async (
        type: ConsentType,
        granted: boolean,
        version: string = CONSENT_VERSION,
        metadata?: Record<string, unknown>
    ): Promise<ConsentRecord | null> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const record: Record<string, unknown> = {
                user_id: user?.id ?? null,
                consent_type: type,
                granted,
                version,
                granted_at: new Date().toISOString(),
                revoked_at: granted ? null : new Date().toISOString(),
                metadata: metadata ?? {},
            };

            const { data, error } = await supabase
                .from('consent_log')
                .insert(record)
                .select()
                .single();

            if (error) {
                console.error('Error logging consent:', error);
                return null;
            }

            return data as ConsentRecord;
        } catch (error) {
            console.error('Failed to log consent:', error);
            return null;
        }
    },

    /**
     * Log multiple consent decisions at once (e.g., during signup).
     */
    logBulkConsent: async (
        consents: Array<{ type: ConsentType; granted: boolean }>,
        version: string = CONSENT_VERSION
    ): Promise<boolean> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const records = consents.map(c => ({
                user_id: user?.id ?? null,
                consent_type: c.type,
                granted: c.granted,
                version,
                granted_at: new Date().toISOString(),
                revoked_at: c.granted ? null : new Date().toISOString(),
                metadata: {},
            }));

            const { error } = await supabase
                .from('consent_log')
                .insert(records);

            if (error) {
                console.error('Error logging bulk consent:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Failed to log bulk consent:', error);
            return false;
        }
    },

    /**
     * Get all consent records for the current user, ordered by most recent.
     */
    getConsents: async (userId?: string): Promise<ConsentRecord[]> => {
        try {
            let targetUserId = userId;
            if (!targetUserId) {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return [];
                targetUserId = user.id;
            }

            const { data, error } = await supabase
                .from('consent_log')
                .select('*')
                .eq('user_id', targetUserId)
                .order('granted_at', { ascending: false });

            if (error) {
                console.error('Error fetching consents:', error);
                return [];
            }

            return (data || []) as ConsentRecord[];
        } catch (error) {
            console.error('Failed to fetch consents:', error);
            return [];
        }
    },

    /**
     * Revoke a specific consent type. Inserts a new record with granted=false.
     */
    revokeConsent: async (type: ConsentType): Promise<boolean> => {
        const result = await consentService.logConsent(type, false);
        return result !== null;
    },

    /**
     * Check the current state of a specific consent type.
     * Returns the most recent record for the given type.
     */
    checkConsent: async (type: ConsentType, userId?: string): Promise<boolean> => {
        try {
            let targetUserId = userId;
            if (!targetUserId) {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return false;
                targetUserId = user.id;
            }

            const { data, error } = await supabase
                .from('consent_log')
                .select('granted')
                .eq('user_id', targetUserId)
                .eq('consent_type', type)
                .order('granted_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (error) {
                console.error('Error checking consent:', error);
                return false;
            }

            return data?.granted ?? false;
        } catch (error) {
            console.error('Failed to check consent:', error);
            return false;
        }
    },

    /**
     * Get the current state of all consent types for the user.
     * Returns a map of consent_type → granted (latest value).
     */
    getActiveConsents: async (userId?: string): Promise<Record<ConsentType, boolean>> => {
        const defaults: Record<ConsentType, boolean> = {
            terms_of_service: false,
            privacy_policy: false,
            data_processing: false,
            newsletter: false,
            analytics_cookies: false,
            ai_chat_history: false,
            clarity_score_tracking: false,
            age_verification: false,
        };

        try {
            const consents = await consentService.getConsents(userId);
            const seen = new Set<ConsentType>();

            for (const record of consents) {
                const type = record.consent_type as ConsentType;
                if (!seen.has(type)) {
                    defaults[type] = record.granted;
                    seen.add(type);
                }
            }

            return defaults;
        } catch {
            return defaults;
        }
    },
};
