/**
 * Provider Service - Refactored to use Supabase directly
 *
 * Provider favorites, view tracking and admin status updates.
 */

import { Provider } from '../types/models';
import { supabase } from '../lib/supabaseClient';
import { throwOnError } from '../lib/supabaseError';

interface DBProvider {
    id: number | string;
    full_name: string;
    role?: string;
    profile_photo_url?: string;
    specialties?: string[];
    practice_city?: string;
    practice_state?: string;
    insurance?: string[];
    verification_status?: string;
    bio?: string;
    credentials?: string;
    languages_spoken?: string[];
    treatment_approaches?: string | string[];
    years_of_experience?: number;
    practice_name?: string;
}

function mapToProvider(data: DBProvider): Provider {
    return {
        id: data.id,
        name: data.full_name,
        role: data.role || 'Provider',
        image: data.profile_photo_url || '',
        specialties: data.specialties || [],
        location: `${data.practice_city || ''}, ${data.practice_state || ''}`.replace(/^, |, $/g, ''),
        insurance: data.insurance || [],
        verified: data.verification_status === 'verified',
        bio: data.bio || '',
        education: [data.credentials || ''],
        languages: data.languages_spoken || [],
        approach: typeof data.treatment_approaches === 'string' ? data.treatment_approaches : (data.treatment_approaches?.[0] || ''),
        yearsExperience: data.years_of_experience || 0,
        isVideoVisit: false,
        status: data.verification_status,
        email: ''
    };
}

export const providerService = {
    /**
     * Track provider profile view
     */
    trackView: async (providerId: number | string): Promise<void> => {
        try {
            // Increment view count in providers table
            const { error } = await supabase.rpc('increment_provider_views', {
                provider_id: providerId
            });

            if (error) {
                console.error('Error tracking provider view:', error);
                // Non-critical, don't throw
            }
        } catch (error) {
            console.error('Failed to track provider view:', error);
        }
    },

    /**
     * Toggle provider favorite
     */
    toggleFavorite: async (providerId: number | string): Promise<{ favorited: boolean }> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return { favorited: false };
            }

            // Check if favorite exists
            const { data: existing } = await supabase
                .from('provider_favorites')
                .select('id')
                .eq('user_id', user.id)
                .eq('provider_id', providerId)
                .maybeSingle();

            if (existing) {
                // Remove favorite
                const { error } = await supabase
                    .from('provider_favorites')
                    .delete()
                    .eq('id', existing.id);
                throwOnError(error, 'Remove favorite');
                return { favorited: false };
            } else {
                // Add favorite
                const { error } = await supabase
                    .from('provider_favorites')
                    .insert({
                        user_id: user.id,
                        provider_id: providerId,
                        created_at: new Date().toISOString(),
                    });
                throwOnError(error, 'Add favorite');
                return { favorited: true };
            }
        } catch (error) {
            // Re-throw so the caller can distinguish a real failure from a
            // legitimate "removed" result, instead of masking it as favorited:false.
            console.error('Failed to toggle favorite:', error);
            throw error;
        }
    },

    /**
     * Get user's favorite providers
     */
    getFavorites: async (): Promise<Provider[]> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return [];
            }

            const { data, error } = await supabase
                .from('provider_favorites')
                .select(`
                    provider_id,
                    providers (*)
                `)
                .eq('user_id', user.id);

            if (error || !data) {
                console.error('Error fetching favorites:', error);
                return [];
            }

            return data
                .map(fav => fav.providers as unknown as DBProvider)
                .filter(Boolean)
                .map(mapToProvider);
        } catch (error) {
            console.error('Failed to fetch favorites:', error);
            return [];
        }
    },

    /**
     * Get all providers for admin panel (includes pending/suspended)
     */
    getAdminProviders: async (filter?: string): Promise<Provider[]> => {
        try {
            let query = supabase
                .from('providers')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50);

            if (filter && filter !== 'all') {
                query = query.eq('status', filter);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching admin providers:', error);
                return [];
            }

            return (data || []).map(mapToProvider);
        } catch (error) {
            console.error('Failed to fetch admin providers:', error);
            return [];
        }
    },

    /**
     * Update provider status (admin only)
     */
    updateProviderStatus: async (id: string | number, status: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('providers')
                .update({ status, updated_at: new Date().toISOString() })
                .eq('id', id);

            if (error) {
                console.error('Error updating provider status:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Failed to update provider status:', error);
            return false;
        }
    },
};

// Hook wrapper for React components
export function useProviderService() {
    return providerService;
}
