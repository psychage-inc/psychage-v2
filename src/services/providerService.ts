/**
 * Provider Service - Refactored to use Supabase directly
 *
 * Manages provider directory with direct database queries and mock data fallback.
 */

import { Provider } from '../types/models';
import { supabase } from '../lib/supabaseClient';

// Fallback to mock data if DB query fails
import { providers as mockProviders } from '../data/providers';

export interface ProviderSearchParams {
    specialty?: string;
    insurance?: string;
    location?: string;
    verified?: boolean;
    videoVisit?: boolean;
    page?: number;
    limit?: number;
    search?: string;
}

interface DBProvider {
    id: number | string;
    full_name: string;
    role?: string;
    profile_photo_url?: string;
    rating?: number;
    reviews_count?: number;
    specialties?: string[];
    practice_city?: string;
    practice_state?: string;
    is_accepting_patients?: boolean;
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
        image: data.profile_photo_url,
        rating: Number(data.rating || 0),
        reviews: data.reviews_count || 0,
        specialties: data.specialties || [],
        location: `${data.practice_city || ''}, ${data.practice_state || ''}`.replace(/^, |, $/g, ''),
        availability: data.is_accepting_patients ? 'Available' : 'Full',
        insurance: data.insurance || [],
        verified: data.verification_status === 'verified',
        bio: data.bio || '',
        education: [data.credentials || ''],
        languages: data.languages_spoken || [],
        approach: typeof data.treatment_approaches === 'string' ? data.treatment_approaches : (data.treatment_approaches?.[0] || ''),
        yearsExperience: data.years_of_experience || 0,
        reviewsList: [],
        isVideoVisit: true,
        status: data.verification_status,
        email: 'provider@example.com'
    };
}

// Helper function to filter mock providers based on search params
function filterMockProviders(providers: Provider[], params?: ProviderSearchParams): Provider[] {
    let filtered = [...providers];

    if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchLower) ||
            p.specialties.some(s => s.toLowerCase().includes(searchLower))
        );
    }
    if (params?.specialty) {
        filtered = filtered.filter(p => p.specialties.includes(params.specialty!));
    }
    if (params?.insurance) {
        filtered = filtered.filter(p => p.insurance.includes(params.insurance!));
    }
    if (params?.location) {
        const locationLower = params.location.toLowerCase();
        filtered = filtered.filter(p => p.location.toLowerCase().includes(locationLower));
    }
    if (params?.verified) {
        filtered = filtered.filter(p => p.verified);
    }
    if (params?.limit) {
        const start = params?.page ? (params.page - 1) * params.limit : 0;
        filtered = filtered.slice(start, start + params.limit);
    }

    return filtered;
}

export const providerService = {
    /**
     * Get all providers with optional filtering
     */
    getAll: async (params?: ProviderSearchParams): Promise<Provider[]> => {
        try {
            let query = supabase
                .from('providers')
                .select('*');

            // Apply filters
            if (params?.location) {
                query = query.ilike('practice_state', `%${params.location}%`);
            }
            if (params?.specialty) {
                query = query.contains('specialties', [params.specialty]);
            }
            if (params?.insurance) {
                query = query.contains('insurance', [params.insurance]);
            }
            if (params?.verified) {
                query = query.eq('verification_status', 'verified');
            }
            if (params?.search) {
                query = query.or(`full_name.ilike.%${params.search}%,bio.ilike.%${params.search}%`);
            }

            // Apply pagination
            if (params?.limit) {
                const start = params.page ? (params.page - 1) * params.limit : 0;
                query = query.range(start, start + params.limit - 1);
            }

            // Order by rating and verification
            query = query.order('verification_status', { ascending: false })
                         .order('rating', { ascending: false });

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching providers from Supabase:', error);
                console.warn('Falling back to mock providers');
                return filterMockProviders(mockProviders, params);
            }

            if (!data || data.length === 0) {
                console.warn('No providers found in database, using mock data');
                return filterMockProviders(mockProviders, params);
            }

            return data.map(mapToProvider);
        } catch (error) {
            console.error('Failed to fetch providers, using fallback:', error);
            return filterMockProviders(mockProviders, params);
        }
    },

    /**
     * Get a single provider by ID
     */
    getById: async (id: number | string): Promise<Provider | undefined> => {
        try {
            const { data, error } = await supabase
                .from('providers')
                .select('*')
                .eq('id', id)
                .maybeSingle();

            if (error) {
                console.error('Error fetching provider:', error);
                return mockProviders.find(p => p.id === Number(id) || p.id === id);
            }

            if (!data) {
                return mockProviders.find(p => p.id === Number(id) || p.id === id);
            }

            return mapToProvider(data);
        } catch (error) {
            console.error('Failed to fetch provider, using fallback:', error);
            return mockProviders.find(p => p.id === Number(id) || p.id === id);
        }
    },

    /**
     * Get unique locations (states) from providers
     */
    getLocations: async (): Promise<string[]> => {
        try {
            const { data, error } = await supabase
                .from('providers')
                .select('practice_state')
                .not('practice_state', 'is', null);

            if (error || !data || data.length === 0) {
                console.warn('No locations from database, using mock data');
                const mockLocations = new Set(mockProviders.map(p => p.location.split(',')[1]?.trim()).filter(Boolean));
                return Array.from(mockLocations).sort();
            }

            const states = new Set(data.map(p => p.practice_state).filter(Boolean) as string[]);
            return Array.from(states).sort();
        } catch (error) {
            console.error('Failed to fetch locations, using fallback:', error);
            const mockLocations = new Set(mockProviders.map(p => p.location.split(',')[1]?.trim()).filter(Boolean));
            return Array.from(mockLocations).sort();
        }
    },

    /**
     * Get unique specializations from providers
     */
    getSpecializations: async (): Promise<string[]> => {
        try {
            const { data, error } = await supabase
                .from('providers')
                .select('specialties');

            if (error || !data || data.length === 0) {
                console.warn('No specializations from database, using mock data');
                const specialties = new Set<string>();
                mockProviders.forEach(p => p.specialties.forEach(s => specialties.add(s)));
                return Array.from(specialties).sort();
            }

            const specialties = new Set<string>();
            data.forEach(p => {
                if (p.specialties) {
                    p.specialties.forEach((s: string) => specialties.add(s));
                }
            });

            if (specialties.size === 0) {
                mockProviders.forEach(p => p.specialties.forEach(s => specialties.add(s)));
            }

            return Array.from(specialties).sort();
        } catch (error) {
            console.error('Failed to fetch specializations, using fallback:', error);
            const specialties = new Set<string>();
            mockProviders.forEach(p => p.specialties.forEach(s => specialties.add(s)));
            return Array.from(specialties).sort();
        }
    },

    /**
     * Get unique insurance providers
     */
    getInsuranceProviders: async (): Promise<string[]> => {
        try {
            const { data, error } = await supabase
                .from('providers')
                .select('insurance');

            if (error || !data || data.length === 0) {
                console.warn('No insurance data from database, using mock data');
                const insurance = new Set<string>();
                mockProviders.forEach(p => p.insurance.forEach(i => insurance.add(i)));
                return Array.from(insurance).sort();
            }

            const insurance = new Set<string>();
            data.forEach(p => {
                if (p.insurance) {
                    p.insurance.forEach((i: string) => insurance.add(i));
                }
            });

            if (insurance.size === 0) {
                mockProviders.forEach(p => p.insurance.forEach(i => insurance.add(i)));
            }

            return Array.from(insurance).sort();
        } catch (error) {
            console.error('Failed to fetch insurance, using fallback:', error);
            const insurance = new Set<string>();
            mockProviders.forEach(p => p.insurance.forEach(i => insurance.add(i)));
            return Array.from(insurance).sort();
        }
    },

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
                console.warn('User not authenticated');
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
                await supabase
                    .from('provider_favorites')
                    .delete()
                    .eq('id', existing.id);
                return { favorited: false };
            } else {
                // Add favorite
                await supabase
                    .from('provider_favorites')
                    .insert({
                        user_id: user.id,
                        provider_id: providerId,
                        created_at: new Date().toISOString(),
                    });
                return { favorited: true };
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
            return { favorited: false };
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
     * Submit a review for a provider
     */
    submitReview: async (providerId: number | string, data: { rating: number; comment: string }): Promise<{ success: boolean; error?: string }> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return { success: false, error: 'User not authenticated' };
            }

            const { error } = await supabase
                .from('provider_reviews')
                .insert({
                    provider_id: providerId,
                    user_id: user.id,
                    rating: data.rating,
                    comment: data.comment,
                    created_at: new Date().toISOString(),
                });

            if (error) {
                console.error('Error submitting review:', error);
                // Queue locally for later sync if DB unavailable
                const queueKey = 'psychage_review_queue';
                const existingQueue = JSON.parse(localStorage.getItem(queueKey) || '[]');
                existingQueue.push({
                    providerId,
                    ...data,
                    queuedAt: new Date().toISOString()
                });
                localStorage.setItem(queueKey, JSON.stringify(existingQueue));
                return { success: true, error: 'Review saved locally. Will sync when connection is restored.' };
            }

            return { success: true };
        } catch (error) {
            console.error('Failed to submit review:', error);
            return { success: false, error: 'Failed to submit review. Please try again.' };
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
                .order('created_at', { ascending: false });

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
