import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';

export interface NewsletterSubscribeResponse {
    success: boolean;
    message?: string;
}

export const newsletterService = {
    subscribe: async (email: string): Promise<NewsletterSubscribeResponse> => {
        try {
            // Check if email already exists
            const { data: existing } = await supabase
                .from('newsletter_subscribers')
                .select('id')
                .eq('email', email.toLowerCase())
                .single();

            if (existing) {
                return { success: true, message: 'You are already subscribed!' };
            }

            // Insert new subscriber
            const { error } = await supabase
                .from('newsletter_subscribers')
                .insert({
                    email: email.toLowerCase(),
                    subscribed_at: new Date().toISOString(),
                    status: 'active'
                });

            if (error) throw error;

            return { success: true, message: 'Successfully subscribed!' };
        } catch (error) {
            console.error('Newsletter subscription failed:', error);
            throw error;
        }
    },

    unsubscribe: async (email: string): Promise<NewsletterSubscribeResponse> => {
        try {
            const { error } = await supabase
                .from('newsletter_subscribers')
                .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
                .eq('email', email.toLowerCase());

            if (error) throw error;

            return { success: true, message: 'Successfully unsubscribed.' };
        } catch (error) {
            console.error('Newsletter unsubscribe failed:', error);
            throw error;
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
