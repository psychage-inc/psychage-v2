import React from 'react';
import SEO from '@/components/SEO';
import { useMyProvider } from '@/hooks/useProviderPortal';
import { getTierLabel } from '@/lib/provider-tier';
import type { ProviderTier } from '@/lib/provider-tier';
import Badge from '@/components/ui/Badge';

const PortalSubscription: React.FC = () => {
  const { data: provider } = useMyProvider();
  const tier = (provider?.tier as ProviderTier) || 'free';

  return (
    <>
      <SEO title="Subscription | Provider Portal" />
      <div className="space-y-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-text-primary">Subscription</h1>
          <p className="text-text-secondary mt-1">
            Manage your plan and billing.
          </p>
        </div>

        {/* Current plan */}
        <div className="bg-surface rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display font-semibold text-lg text-text-primary">Current Plan</h2>
            <Badge variant={tier === 'elite' ? 'amber' : tier === 'pro' ? 'teal' : 'neutral'}>
              {getTierLabel(tier)}
            </Badge>
          </div>
          {tier === 'free' ? (
            <p className="text-sm text-text-secondary">
              You are on the Free plan. Upgrade to Pro or Elite to unlock analytics, reviews, and priority search placement.
            </p>
          ) : (
            <p className="text-sm text-text-secondary">
              Stripe billing integration coming soon. Your current tier is managed manually.
            </p>
          )}
        </div>

        {/* Pricing placeholder — full PricingTierCard will be added in Phase 2 */}
        <div className="bg-surface rounded-2xl p-8 border border-border text-center">
          <p className="text-text-secondary">Full pricing and Stripe checkout coming in Phase 2.</p>
        </div>
      </div>
    </>
  );
};

export default PortalSubscription;
