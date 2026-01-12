import { supabase } from '../lib/supabaseClient';

export interface WaitlistEntry {
    id?: string;
    email: string;
    feature: 'spark' | 'community' | 'other';
    created_at?: string;
}

export const waitlistService = {
    /**
     * Add an email to the waitlist for a specific feature
     */
    join: async (email: string, feature: WaitlistEntry['feature']): Promise<{ success: boolean; error?: string }> => {
        try {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return { success: false, error: 'Please enter a valid email address' };
            }

            // Try to insert into Supabase
            const { error } = await supabase
                .from('waitlist')
                .insert({
                    email: email.toLowerCase().trim(),
                    feature
                });

            if (error) {
                // Handle unique constraint violation (already on waitlist)
                if (error.code === '23505') {
                    return { success: true }; // Already on waitlist, but that's okay
                }
                throw error;
            }

            return { success: true };
        } catch (error) {
            console.error('Failed to join waitlist:', error);

            // Fallback: Store in localStorage if Supabase fails
            try {
                const existingWaitlist = JSON.parse(localStorage.getItem('psychage_waitlist') || '[]');
                const alreadyExists = existingWaitlist.some(
                    (entry: WaitlistEntry) => entry.email === email.toLowerCase() && entry.feature === feature
                );

                if (!alreadyExists) {
                    existingWaitlist.push({
                        email: email.toLowerCase().trim(),
                        feature,
                        created_at: new Date().toISOString()
                    });
                    localStorage.setItem('psychage_waitlist', JSON.stringify(existingWaitlist));
                }

                return { success: true };
            } catch {
                return { success: false, error: 'Failed to join waitlist. Please try again.' };
            }
        }
    },

    /**
     * Check if an email is already on the waitlist for a feature
     */
    isOnWaitlist: async (email: string, feature: WaitlistEntry['feature']): Promise<boolean> => {
        try {
            const { data, error } = await supabase
                .from('waitlist')
                .select('id')
                .eq('email', email.toLowerCase().trim())
                .eq('feature', feature)
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            return !!data;
        } catch {
            // Fallback: Check localStorage
            try {
                const existingWaitlist = JSON.parse(localStorage.getItem('psychage_waitlist') || '[]');
                return existingWaitlist.some(
                    (entry: WaitlistEntry) => entry.email === email.toLowerCase() && entry.feature === feature
                );
            } catch {
                return false;
            }
        }
    },

    /**
     * Get all waitlist entries (admin only)
     */
    getAll: async (feature?: WaitlistEntry['feature']): Promise<WaitlistEntry[]> => {
        try {
            let query = supabase.from('waitlist').select('*').order('created_at', { ascending: false });

            if (feature) {
                query = query.eq('feature', feature);
            }

            const { data, error } = await query;

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Failed to fetch waitlist:', error);
            return [];
        }
    }
};

export default waitlistService;
