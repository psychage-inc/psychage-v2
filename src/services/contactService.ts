import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';

export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactSubmitResponse {
    success: boolean;
    message?: string;
    error?: string;
}

export const contactService = {
    /**
     * Submit a contact form to the database
     * Falls back to localStorage queue if database is unavailable
     */
    submit: async (data: ContactFormData): Promise<ContactSubmitResponse> => {
        try {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                return { success: false, error: 'Please enter a valid email address' };
            }

            // Validate required fields
            if (!data.firstName.trim() || !data.lastName.trim() || !data.message.trim()) {
                return { success: false, error: 'Please fill in all required fields' };
            }

            // Try to submit to Supabase
            const { error } = await supabase
                .from('contact_submissions')
                .insert({
                    first_name: data.firstName.trim(),
                    last_name: data.lastName.trim(),
                    email: data.email.toLowerCase().trim(),
                    subject: data.subject,
                    message: data.message.trim(),
                    status: 'pending',
                    created_at: new Date().toISOString()
                });

            if (error) {
                // If table doesn't exist or other DB error, queue locally
                console.error('Contact submission database error:', error);
                return await contactService.queueLocally(data);
            }

            return {
                success: true,
                message: 'Thank you for reaching out! Our team will get back to you within 24 hours.'
            };
        } catch (error) {
            console.error('Contact submission failed:', error);
            // Fallback to local queue
            return await contactService.queueLocally(data);
        }
    },

    /**
     * Queue contact submission locally when database is unavailable
     */
    queueLocally: async (data: ContactFormData): Promise<ContactSubmitResponse> => {
        try {
            const queueKey = 'psychage_contact_queue';
            const existingQueue = JSON.parse(localStorage.getItem(queueKey) || '[]');

            existingQueue.push({
                ...data,
                id: `local_${Date.now()}`,
                queuedAt: new Date().toISOString()
            });

            localStorage.setItem(queueKey, JSON.stringify(existingQueue));

            return {
                success: true,
                message: 'Your message has been saved and will be sent when connection is restored.'
            };
        } catch {
            return {
                success: false,
                error: 'Unable to save your message. Please try again or email us directly at support@psychage.com'
            };
        }
    },

    /**
     * Process any queued submissions (call on app init or reconnection)
     */
    processQueue: async (): Promise<void> => {
        try {
            const queueKey = 'psychage_contact_queue';
            const queue = JSON.parse(localStorage.getItem(queueKey) || '[]');

            if (queue.length === 0) return;

            const successfulIds: string[] = [];

            for (const item of queue) {
                const { error } = await supabase
                    .from('contact_submissions')
                    .insert({
                        first_name: item.firstName,
                        last_name: item.lastName,
                        email: item.email,
                        subject: item.subject,
                        message: item.message,
                        status: 'pending',
                        created_at: item.queuedAt
                    });

                if (!error) {
                    successfulIds.push(item.id);
                }
            }

            // Remove successful items from queue
            const remainingQueue = queue.filter(
                (item: { id: string }) => !successfulIds.includes(item.id)
            );
            localStorage.setItem(queueKey, JSON.stringify(remainingQueue));
        } catch (error) {
            console.error('Failed to process contact queue:', error);
        }
    }
};

export function useContactService() {
    return useMemo(() => contactService, []);
}
