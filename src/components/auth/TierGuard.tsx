import React, { useState, useEffect } from 'react';
import { Sparkles, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';

type SubscriptionTier = 'free' | 'spark_plus';

interface TierGuardProps {
    /** Minimum tier required to access children */
    requiredTier: SubscriptionTier;
    children: React.ReactNode;
    /** Optional custom fallback. Defaults to an upgrade prompt card. */
    fallback?: React.ReactNode;
}

/**
 * TierGuard — subscription tier gating component.
 *
 * Checks `profiles.subscription_tier` and shows an upgrade prompt
 * if the user's tier is insufficient for the feature.
 */
const TierGuard: React.FC<TierGuardProps> = ({
    requiredTier,
    children,
    fallback,
}) => {
    const { user, isAuthenticated } = useAuth();
    const [userTier, setUserTier] = useState<SubscriptionTier>('free');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || !user) {
            setLoading(false);
            return;
        }

        const loadTier = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('subscription_tier')
                    .eq('id', user.id)
                    .single();

                if (!error && data?.subscription_tier) {
                    setUserTier(data.subscription_tier as SubscriptionTier);
                }
            } catch {
                // Default to free tier
            } finally {
                setLoading(false);
            }
        };

        loadTier();
    }, [isAuthenticated, user]);

    if (loading) return null;

    const tierRank: Record<SubscriptionTier, number> = {
        free: 0,
        spark_plus: 1,
    };

    const hasAccess = tierRank[userTier] >= tierRank[requiredTier];

    if (hasAccess) {
        return <>{children}</>;
    }

    if (fallback) {
        return <>{fallback}</>;
    }

    // Default upgrade prompt
    return (
        <div className="rounded-xl border border-amber-200/30 dark:border-amber-800/30 bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-amber-900/10 dark:to-orange-900/5 p-6">
            <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 shrink-0">
                    <Lock size={20} />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-text-primary text-sm mb-1">
                        Spark+ Feature
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4">
                        This feature is available with Spark+ membership. Upgrade to unlock
                        advanced analytics, personalized insights, and more.
                    </p>
                    <button
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm shadow-amber-500/20"
                    >
                        <Sparkles size={14} />
                        Upgrade to Spark+
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TierGuard;
