import { Provider } from '../types/models';
import { supabase } from '../lib/supabaseClient';
import { useMemo } from 'react';
import { ProviderProfile } from '../lib/api';
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
        if (error) {
            console.error('Failed to fetch providers from Supabase, using fallback:', error);
            // Return filtered mock data as fallback
            return filterMockProviders(mockProviders, params);
        }
        if (!data || data.length === 0) {
            // If no data from DB, use mock data
            return filterMockProviders(mockProviders, params);
        }
        return data.map(mapToProvider);
    },

    getById: async (id: number | string): Promise<Provider | undefined> => {
        try {
            const { data, error } = await supabase
                .from('providers')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    // Not found in DB, try mock data
                    return mockProviders.find(p => p.id === Number(id) || p.id === id);
                }
                throw error;
            }
            return mapToProvider(data);
        } catch (error) {
            console.error('Failed to fetch provider from Supabase, using fallback:', error);
            // Fallback to mock data
            return mockProviders.find(p => p.id === Number(id) || p.id === id);
        }
    },

    getLocations: async (): Promise<string[]> => {
        try {
            // Fetch all states for now (optimization: create RPC for distinct)
            const { data, error } = await supabase.from('providers').select('practice_state');
            if (error) throw error;

            const states = new Set((data as { practice_state: string }[]).map(p => p.practice_state).filter(Boolean));
            if (states.size === 0) {
                // Fallback to mock data locations
                const mockLocations = new Set(mockProviders.map(p => p.location.split(',')[1]?.trim()).filter(Boolean));
                return Array.from(mockLocations).sort();
            }
            return Array.from(states).sort();
        } catch (error) {
            console.error('Failed to fetch locations, using fallback:', error);
            // Fallback to mock data locations
            const mockLocations = new Set(mockProviders.map(p => p.location.split(',')[1]?.trim()).filter(Boolean));
            return Array.from(mockLocations).sort();
        }
    },

    getSpecializations: async (): Promise<string[]> => {
        try {
            // Need to unnest array, but for now let's just fetch all and process in JS
            const { data, error } = await supabase.from('providers').select('specialties');
            if (error) throw error;

            const specialties = new Set<string>();
            (data as { specialties: string[] }[]).forEach(p => {
                if (Array.isArray(p.specialties)) {
                    p.specialties.forEach((s: string) => specialties.add(s));
                }
            });
            if (specialties.size === 0) {
                // Fallback to mock data
                mockProviders.forEach(p => p.specialties.forEach(s => specialties.add(s)));
            }
            return Array.from(specialties).sort();
        } catch (error) {
            console.error('Failed to fetch specializations, using fallback:', error);
            // Fallback to mock data
            const specialties = new Set<string>();
            mockProviders.forEach(p => p.specialties.forEach(s => specialties.add(s)));
            return Array.from(specialties).sort();
        }
    },

    getInsuranceProviders: async (): Promise<string[]> => {
        try {
            const { data, error } = await supabase.from('providers').select('insurance');
            if (error) throw error;

            const insurance = new Set<string>();
            (data as { insurance: string[] }[]).forEach(p => {
                if (Array.isArray(p.insurance)) {
                    p.insurance.forEach((i: string) => insurance.add(i));
                }
            });
            if (insurance.size === 0) {
                // Fallback to mock data
                mockProviders.forEach(p => p.insurance.forEach(i => insurance.add(i)));
            }
            return Array.from(insurance).sort();
        } catch (error) {
            console.error('Failed to fetch insurance, using fallback:', error);
            // Fallback to mock data
            const insurance = new Set<string>();
            mockProviders.forEach(p => p.insurance.forEach(i => insurance.add(i)));
            return Array.from(insurance).sort();
        }
    },

    updateProfile: async (data: Partial<ProviderProfile>): Promise<void> => {
        // In real app, we'd use providerId to secure the update
        // For Supabase, RLS handles security (user can only update their own profile)
        const { error } = await supabase.from('providers').update(data).select().single(); // Assuming logged in user
        if (error) throw error;
    },

    updateAvailability: async (_data: unknown): Promise<void> => {
        // Placeholder
    },

    verifyProvider: async (): Promise<void> => {
        // Admin only
    },

    toggleFavorite: async (_providerId: number | string): Promise<{ favorited: boolean }> => {
        // Placeholder
        return { favorited: true };
    },

    getFavorites: async (): Promise<Provider[]> => {
        return [];
    },

    submitReview: async (_providerId: number | string, _data: { rating: number; comment: string }): Promise<void> => {
        // Placeholder
    },

    getActivity: async (_providerId: string): Promise<Record<string, unknown>[]> => {
        // Placeholder
        return [];
    },

    trackView: async (_providerId: number | string): Promise<void> => {
        // Placeholder
    },

    // Admin methods
    getAdminProviders: async (status: string): Promise<Provider[]> => {
        try {
            const { data, error } = await supabase
                .from('providers')
                .select('*')
                .eq('verification_status', status);

            if (error) throw error;
            if (!data) return [];
            return data.map(mapToProvider);
        } catch (error) {
            console.error('Failed to fetch admin providers', error);
            // Fallback to filtering mockProviders
            // Infer status for mock providers since they don't have it natively yet
            return mockProviders.filter(p => {
                const pStatus = p.verified ? 'active' : 'pending';
                return pStatus === status;
            }).map(p => ({ ...p, status: p.verified ? 'active' : 'pending' }));
        }
    },

    updateProviderStatus: async (id: number | string, status: string): Promise<void> => {
        const { error } = await supabase
            .from('providers')
            .update({ verification_status: status })
            .eq('id', id);

        if (error) throw error;
    }
};

interface DBProvider {
    id: number | string;
    full_name: string;
    role?: string; // or specific enum
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
        const start = params.page ? (params.page - 1) * params.limit : 0;
        filtered = filtered.slice(start, start + params.limit);
    }

    return filtered;
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
        isVideoVisit: true, // Default
        status: data.verification_status,
        email: 'provider@example.com' // Mock email as it's not in public profile
    };
}

// Hook wrapper for React components
export function useProviderService() {
    return useMemo(() => providerService, []);
}
