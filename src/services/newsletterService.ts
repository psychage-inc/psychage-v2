import { api } from '../lib/api';
import { useMemo } from 'react';

export interface NewsletterSubscribeResponse {
    success: boolean;
    message?: string;
}

export const newsletterService = {
    subscribe: async (email: string): Promise<NewsletterSubscribeResponse> => {
        try {
            const response = await api.post<NewsletterSubscribeResponse>('/api/newsletter/subscribe', { email });
            return response.data || { success: true };
        } catch (error) {
            console.error('Newsletter subscription failed:', error);
            throw error;
        }
    }
};

export function useNewsletterService() {
    return useMemo(() => newsletterService, []);
}
