import { supabase } from '@/lib/supabaseClient';

export interface OnboardingStatus {
    completed: boolean;
    wellnessFocus: string[] | null;
}

export const onboardingService = {
    /**
     * Check whether the user has completed onboarding and retrieve their wellness focus areas.
     */
    getOnboardingStatus: async (userId: string): Promise<OnboardingStatus> => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('onboarding_completed, wellness_focus')
                .eq('id', userId)
                .single();

            if (error || !data) {
                console.warn('[onboardingService] Failed to read onboarding status, failing open:', error?.message);
                return { completed: true, wellnessFocus: null };
            }

            return {
                completed: data.onboarding_completed ?? false,
                wellnessFocus: data.wellness_focus as string[] | null,
            };
        } catch (err) {
            console.warn('[onboardingService] Exception reading onboarding status, failing open:', err);
            return { completed: true, wellnessFocus: null };
        }
    },

    /**
     * Mark onboarding as complete and save the user's wellness focus selections.
     */
    completeOnboarding: async (userId: string, wellnessFocus: string[]): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    onboarding_completed: true,
                    wellness_focus: wellnessFocus,
                })
                .eq('id', userId);

            return !error;
        } catch {
            return false;
        }
    },

    /**
     * Save wellness focus selections without marking onboarding complete.
     */
    saveWellnessFocus: async (userId: string, wellnessFocus: string[]): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ wellness_focus: wellnessFocus })
                .eq('id', userId);

            return !error;
        } catch {
            return false;
        }
    },
};
