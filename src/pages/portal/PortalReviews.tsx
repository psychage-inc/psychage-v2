import React from 'react';
import SEO from '@/components/SEO';
import { useMyProvider } from '@/hooks/useProviderPortal';
import { hasAccess } from '@/lib/provider-tier';
import type { ProviderTier } from '@/lib/provider-tier';
import { Lock, ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const PortalReviews: React.FC = () => {
  const { data: provider } = useMyProvider();
  const tier = (provider?.tier as ProviderTier) || 'free';

  if (!hasAccess(tier, 'pro')) {
    return (
      <>
        <SEO title="Reviews | Provider Portal" />
        <div className="space-y-6">
          <h1 className="font-display font-bold text-2xl text-text-primary">Reviews</h1>
          <div className="bg-surface rounded-2xl p-8 border border-border text-center">
            <Lock size={32} className="mx-auto text-text-tertiary mb-3" />
            <h2 className="font-display font-semibold text-lg text-text-primary mb-1">Unlock Reviews</h2>
            <p className="text-text-secondary text-sm mb-4">
              Upgrade to Pro to view patient feedback and respond to reviews.
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
      <SEO title="Reviews | Provider Portal" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-2xl text-text-primary">Reviews</h1>
          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <MessageSquare size={14} />
            <span>Reviews system coming soon</span>
          </div>
        </div>
        <div className="bg-surface rounded-2xl p-8 border border-border text-center">
          <p className="text-text-secondary">Patient reviews will appear here once the review system is live.</p>
        </div>
      </div>
    </>
  );
};

export default PortalReviews;
