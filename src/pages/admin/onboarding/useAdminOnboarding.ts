import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

export function useAdminOnboarding() {
  const { user } = useAuth();
  const [isCompleting, setIsCompleting] = useState(false);

  const checkOnboardingStatus = useCallback(async (): Promise<boolean> => {
    if (!user) return false;
    const { data } = await supabase
      .from('profiles')
      .select('onboarding_completed_at')
      .eq('id', user.id)
      .single();
    return !!data?.onboarding_completed_at;
  }, [user]);

  const completeOnboarding = useCallback(async (): Promise<boolean> => {
    if (!user) return false;
    setIsCompleting(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ onboarding_completed_at: new Date().toISOString() })
        .eq('id', user.id);
      return !error;
    } finally {
      setIsCompleting(false);
    }
  }, [user]);

  return { checkOnboardingStatus, completeOnboarding, isCompleting };
}
