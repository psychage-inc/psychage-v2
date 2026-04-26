import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';

export interface NewsletterSubscribeResponse {
    success: boolean;
    message?: string;
}

/**
 * AUTH-032: when an authenticated user subscribes, identity is keyed on
 * user_id (the auth.users row). Email is recorded as a contact attribute
 * but uniqueness is per-user, not per-email — Apple Private Relay rotates
 * relay addresses so the same user can re-subscribe with a different
 * email after a revoke/re-grant. Anonymous subscribers fall back to
 * email-based dedup.
 */
export const newsletterService = {
    subscribe: async (email: string): Promise<NewsletterSubscribeResponse> => {
        try {
            const normalized = email.toLowerCase().trim();
            const { data: { user } } = await supabase.auth.getUser();
            const userId = user?.id ?? null;

            if (userId) {
                // Authenticated path — dedup on user_id.
                const { data: existing } = await supabase
                    .from('newsletter_subscribers')
                    .select('id, status')
                    .eq('user_id', userId)
                    .maybeSingle();

                if (existing) {
                    // Re-activate if previously unsubscribed; otherwise idempotent success.
                    if ((existing as { status?: string }).status !== 'active') {
                        await supabase
                            .from('newsletter_subscribers')
                            .update({
                                status: 'active',
                                email: normalized,
                                subscribed_at: new Date().toISOString(),
                                unsubscribed_at: null,
                            })
                            .eq('id', (existing as { id: string }).id);
                        return { success: true, message: 'Welcome back!' };
                    }
                    return { success: true, message: 'You are already subscribed!' };
                }

                const { error } = await supabase
                    .from('newsletter_subscribers')
                    .insert({
                        email: normalized,
                        user_id: userId,
                        subscribed_at: new Date().toISOString(),
                        status: 'active',
                    });

                if (error) {
                    if (error.code === '23505') {
                        // Race: subscription was created between the SELECT
                        // and INSERT. Treat as success.
                        return { success: true, message: 'You are already subscribed!' };
                    }
                    console.error('Newsletter subscription failed:', error);
                    return { success: false, message: 'Subscription failed. Please try again later.' };
                }

                return { success: true, message: 'Successfully subscribed!' };
            }

            // Anonymous path — dedup on email.
            const { data: existing } = await supabase
                .from('newsletter_subscribers')
                .select('id')
                .is('user_id', null)
                .eq('email', normalized)
                .maybeSingle();

            if (existing) {
                return { success: true, message: 'You are already subscribed!' };
            }

            const { error } = await supabase
                .from('newsletter_subscribers')
                .insert({
                    email: normalized,
                    subscribed_at: new Date().toISOString(),
                    status: 'active',
                });

            if (error) {
                if (error.code === '23505') {
                    return { success: true, message: 'You are already subscribed!' };
                }
                console.error('Newsletter subscription failed:', error);
                return { success: false, message: 'Subscription failed. Please try again later.' };
            }

            return { success: true, message: 'Successfully subscribed!' };
        } catch (error) {
            console.error('Newsletter subscription failed:', error);
            return { success: false, message: 'Subscription failed. Please try again later.' };
        }
    },

    unsubscribe: async (email: string): Promise<NewsletterSubscribeResponse> => {
        try {
            const { error } = await supabase
                .from('newsletter_subscribers')
                .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
                .eq('email', email.toLowerCase());

            if (error) {
                console.error('Newsletter unsubscribe failed:', error);
                return { success: false, message: 'Unsubscribe failed. Please try again later.' };
            }

            return { success: true, message: 'Successfully unsubscribed.' };
        } catch (error) {
            console.error('Newsletter unsubscribe failed:', error);
            return { success: false, message: 'Unsubscribe failed. Please try again later.' };
        }
    },

    checkSubscription: async (email: string): Promise<boolean> => {
        try {
            const { data, error } = await supabase
                .from('newsletter_subscribers')
                .select('status')
                .eq('email', email.toLowerCase())
                .single();

            if (error || !data) return false;
            return data.status === 'active';
        } catch {
            return false;
        }
    }
};

export function useNewsletterService() {
    return useMemo(() => newsletterService, []);
}
