import React from 'react';
import SEO from '@/components/SEO';
import { useMyProvider } from '@/hooks/useProviderPortal';
import { hasAccess } from '@/lib/provider-tier';
import type { ProviderTier } from '@/lib/provider-tier';
import { Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const PortalAnalytics: React.FC = () => {
  const { data: provider } = useMyProvider();
  const tier = (provider?.tier as ProviderTier) || 'free';

  if (!hasAccess(tier, 'pro')) {
    return (
      <>
        <SEO title="Analytics | Provider Portal" />
        <div className="space-y-6">
          <h1 className="font-display font-bold text-2xl text-text-primary">Analytics</h1>
          <div className="bg-surface rounded-2xl p-8 border border-border text-center">
            <Lock size={32} className="mx-auto text-text-tertiary mb-3" />
            <h2 className="font-display font-semibold text-lg text-text-primary mb-1">Unlock Analytics</h2>
            <p className="text-text-secondary text-sm mb-4">
              Upgrade to Pro to see detailed analytics about your profile performance.
            </p>
            <Link to="/portal/subscription">
              <Button size="sm">Upgrade to Pro <ArrowRight size={14} className="ml-1" /></Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Analytics | Provider Portal" />
      <div className="space-y-6">
        <h1 className="font-display font-bold text-2xl text-text-primary">Analytics</h1>
        <div className="bg-surface rounded-2xl p-8 border border-border text-center">
          <p className="text-text-secondary">Full analytics dashboard coming soon.</p>
        </div>
      </div>
    </>
  );
};

export default PortalAnalytics;
