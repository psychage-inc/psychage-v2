import { Provider } from '../types/models';
import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';

// Fallback to mock data if API fails
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

export const providerService = {
    getAll: async (params?: ProviderSearchParams): Promise<Provider[]> => {
        try {
            let query = supabase.from('providers').select('*');

            if (params?.location) {
                // Assuming location is "City, State" or just State
                const state = params.location.includes(',') ? params.location.split(',')[1].trim() : params.location;
                query = query.eq('practice_state', state);
            }
            if (params?.verified) {
                query = query.eq('verification_status', 'verified');
            }
            if (params?.specialty) {
                query = query.contains('specialties', [params.specialty]);
            }
            if (params?.insurance) {
                query = query.contains('insurance', [params.insurance]);
            }
            if (params?.search) {
                query = query.or(`full_name.ilike.%${params.search}%,practice_name.ilike.%${params.search}%`);
            }

            if (params?.page && params?.limit) {
                const from = (params.page - 1) * params.limit;
                const to = from + params.limit - 1;
                query = query.range(from, to);
            } else if (params?.limit) {
                query = query.limit(params.limit);
            }

            const { data, error } = await query;
            if (error) throw error;
            return (data || []).map(mapToProvider);
        } catch (error) {
            console.error('Failed to fetch providers from Supabase, using mock data:', error);
            // Fallback logic
            let result = mockProviders as unknown as Provider[];
            if (params?.verified) {
                result = result.filter(p => p.verified);
            }
            if (params?.specialty) {
                result = result.filter(p => p.specialties.includes(params.specialty!));
            }
            if (params?.limit) {
                result = result.slice(0, params.limit);
            }
            return result;
        }
    },

    getById: async (id: number | string): Promise<Provider | undefined> => {
        try {
            const { data, error } = await supabase
                .from('providers')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return undefined; // Not found
                throw error;
            }
            return mapToProvider(data);
        } catch (error) {
            console.error('Failed to fetch provider from Supabase, using mock data:', error);
            return (mockProviders as unknown as Provider[]).find(p => p.id.toString() === id.toString());
        }
    },

    getLocations: async (): Promise<string[]> => {
        try {
            // Fetch all states for now (optimization: create RPC for distinct)
            const { data, error } = await supabase.from('providers').select('practice_state');
            if (error) throw error;

            const states = new Set(data.map((p: any) => p.practice_state).filter(Boolean));
            return Array.from(states).sort();
        } catch (error) {
            console.error('Failed to fetch locations:', error);
            return [];
        }
    },

    getSpecializations: async (): Promise<string[]> => {
        try {
            // Need to unnest array, but for now let's just fetch all and process in JS
            const { data, error } = await supabase.from('providers').select('specialties');
            if (error) throw error;

            const specialties = new Set<string>();
            data.forEach((p: any) => {
                if (Array.isArray(p.specialties)) {
                    p.specialties.forEach((s: string) => specialties.add(s));
                }
            });
            return Array.from(specialties).sort();
        } catch (error) {
            console.error('Failed to fetch specializations:', error);
            return [];
        }
    },

    getInsuranceProviders: async (): Promise<string[]> => {
        try {
            const { data, error } = await supabase.from('providers').select('insurance');
            if (error) throw error;

            const insurance = new Set<string>();
            data.forEach((p: any) => {
                if (Array.isArray(p.insurance)) {
                    p.insurance.forEach((i: string) => insurance.add(i));
                }
            });
            return Array.from(insurance).sort();
        } catch (error) {
            console.error('Failed to fetch insurance:', error);
            return [];
        }
    },

    toggleFavorite: async (providerId: number | string): Promise<{ favorited: boolean }> => {
        // Placeholder
        return { favorited: true };
    },

    getFavorites: async (): Promise<Provider[]> => {
        return [];
    },

    submitReview: async (providerId: number | string, data: { rating: number; comment: string }): Promise<void> => {
        // Placeholder
    },

    trackView: async (providerId: number | string): Promise<void> => {
        // Placeholder
    }
};

function mapToProvider(data: any): Provider {
    return {
        id: data.id,
        name: data.full_name,
        role: data.role || 'Provider',
        image: data.profile_photo_url,
        rating: Number(data.rating || 0),
        reviews: data.reviews_count || 0,
        specialties: data.specialties || [],
        location: `${data.practice_city}, ${data.practice_state}`,
        availability: data.is_accepting_patients ? 'Available' : 'Full',
        insurance: data.insurance || [],
        verified: data.verification_status === 'verified',
        bio: data.bio || '',
        education: [data.credentials || ''],
        languages: data.languages_spoken || [],
        approach: typeof data.treatment_approaches === 'string' ? data.treatment_approaches : (data.treatment_approaches?.[0] || ''),
        yearsExperience: data.years_of_experience || 0,
        reviewsList: [], // Mocking for now
        isVideoVisit: true // Default
    };
}

// Hook wrapper for React components
export function useProviderService() {
    return useMemo(() => providerService, []);
}
