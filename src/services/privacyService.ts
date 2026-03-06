/**
 * Privacy Service — GDPR data subject rights
 *
 * Handles data export requests, account deletion with 30-day grace period,
 * and DSAR (Data Subject Access Request) management.
 */

import { supabase } from '../lib/supabaseClient';

export type DSARRequestType = 'export' | 'deletion' | 'rectification' | 'restriction';
export type DSARStatus = 'pending' | 'processing' | 'completed' | 'rejected' | 'cancelled';

export interface DSARRequest {
    id: string;
    user_id: string;
    request_type: DSARRequestType;
    status: DSARStatus;
    requested_at: string;
    completed_at: string | null;
    expires_at: string | null;
    download_url: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

export interface PrivacySettings {
    cookie_consent: {
        essential: boolean;
        analytics: boolean;
        marketing: boolean;
    };
    deletion_scheduled_at: string | null;
    deleted_at: string | null;
}

export const privacyService = {
    /**
     * Request a full data export (GDPR Article 20 — Data Portability).
     * Creates a DSAR record and triggers the data-export Edge Function.
     */
    requestDataExport: async (): Promise<DSARRequest | null> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return null;

            // Create DSAR record
            const { data: dsar, error: dsarError } = await supabase
                .from('dsar_requests')
                .insert({
                    user_id: user.id,
                    request_type: 'export',
                    status: 'processing',
                    requested_at: new Date().toISOString(),
                })
                .select()
                .single();

            if (dsarError) {
                console.error('Error creating export DSAR:', dsarError);
                return null;
            }

            // Invoke Edge Function for data aggregation
            const { data: exportData, error: fnError } = await supabase.functions.invoke('data-export', {
                body: { dsar_id: dsar.id },
            });

            if (fnError) {
                console.error('Error invoking data-export function:', fnError);
                // DSAR record still exists — admin can process manually
                return dsar as DSARRequest;
            }

            // If the Edge Function returned a download URL, update the DSAR
            if (exportData?.download_url) {
                await supabase
                    .from('dsar_requests')
                    .update({
                        status: 'completed',
                        completed_at: new Date().toISOString(),
                        download_url: exportData.download_url,
                    })
                    .eq('id', dsar.id);
            }

            return dsar as DSARRequest;
        } catch (error) {
            console.error('Failed to request data export:', error);
            return null;
        }
    },

    /**
     * Request account deletion with 30-day grace period.
     * Sets soft-delete flags on the profile and creates a DSAR record.
     */
    requestAccountDeletion: async (): Promise<{ success: boolean; scheduledAt: string | null }> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return { success: false, scheduledAt: null };

            const deletionDate = new Date();
            deletionDate.setDate(deletionDate.getDate() + 30);
            const scheduledAt = deletionDate.toISOString();

            // Soft-delete the profile
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    deleted_at: new Date().toISOString(),
                    deletion_scheduled_at: scheduledAt,
                })
                .eq('id', user.id);

            if (profileError) {
                console.error('Error soft-deleting profile:', profileError);
                return { success: false, scheduledAt: null };
            }

            // Create DSAR record
            const { error: dsarError } = await supabase
                .from('dsar_requests')
                .insert({
                    user_id: user.id,
                    request_type: 'deletion',
                    status: 'pending',
                    requested_at: new Date().toISOString(),
                    expires_at: scheduledAt,
                    notes: '30-day grace period. User can cancel by logging in.',
                });

            if (dsarError) {
                console.error('Error creating deletion DSAR:', dsarError);
            }

            return { success: true, scheduledAt };
        } catch (error) {
            console.error('Failed to request account deletion:', error);
            return { success: false, scheduledAt: null };
        }
    },

    /**
     * Cancel a pending account deletion (within the 30-day grace period).
     */
    cancelDeletion: async (): Promise<boolean> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return false;

            // Clear soft-delete flags
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    deleted_at: null,
                    deletion_scheduled_at: null,
                })
                .eq('id', user.id);

            if (profileError) {
                console.error('Error cancelling deletion:', profileError);
                return false;
            }

            // Cancel the DSAR request
            const { error: dsarError } = await supabase
                .from('dsar_requests')
                .update({
                    status: 'cancelled',
                    notes: 'Cancelled by user within grace period.',
                })
                .eq('user_id', user.id)
                .eq('request_type', 'deletion')
                .eq('status', 'pending');

            if (dsarError) {
                console.error('Error cancelling deletion DSAR:', dsarError);
            }

            return true;
        } catch (error) {
            console.error('Failed to cancel deletion:', error);
            return false;
        }
    },

    /**
     * Get all DSAR request history for the current user.
     */
    getDSARHistory: async (): Promise<DSARRequest[]> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return [];

            const { data, error } = await supabase
                .from('dsar_requests')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching DSAR history:', error);
                return [];
            }

            return (data || []) as DSARRequest[];
        } catch (error) {
            console.error('Failed to fetch DSAR history:', error);
            return [];
        }
    },

    /**
     * Get privacy settings from the user's profile.
     */
    getPrivacySettings: async (): Promise<PrivacySettings | null> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return null;

            const { data, error } = await supabase
                .from('profiles')
                .select('cookie_consent, deletion_scheduled_at, deleted_at')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error fetching privacy settings:', error);
                return null;
            }

            return {
                cookie_consent: data.cookie_consent ?? { essential: true, analytics: false, marketing: false },
                deletion_scheduled_at: data.deletion_scheduled_at,
                deleted_at: data.deleted_at,
            };
        } catch (error) {
            console.error('Failed to fetch privacy settings:', error);
            return null;
        }
    },

    /**
     * Update cookie consent preferences on the profile.
     */
    updateCookieConsent: async (consent: { essential: boolean; analytics: boolean; marketing: boolean }): Promise<boolean> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return false;

            const { error } = await supabase
                .from('profiles')
                .update({ cookie_consent: consent })
                .eq('id', user.id);

            if (error) {
                console.error('Error updating cookie consent:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Failed to update cookie consent:', error);
            return false;
        }
    },
};
