import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '../supabase/client';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setIsLoading(false);
        };

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event: any, session: any) => {
                setUser(session?.user ?? null);
                setIsLoading(false);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase.auth]);

    const signUp = async (email: string, password: string) => {
        return supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/clarity-score/auth/callback`
            }
        });
    };

    const signIn = async (email: string, password: string) => {
        return supabase.auth.signInWithPassword({ email, password });
    };

    const signInWithGoogle = async () => {
        return supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/clarity-score/auth/callback`,
            }
        });
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return {
        user,
        isLoading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
    };
}
