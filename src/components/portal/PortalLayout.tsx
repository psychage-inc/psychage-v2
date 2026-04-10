import React from 'react';
import { Outlet } from 'react-router-dom';
import PortalNavSidebar from './PortalNavSidebar';
import { useMyProvider } from '@/hooks/useProviderPortal';
import type { ProviderTier } from '@/lib/provider-tier';

/**
 * Portal Layout — sidebar + content wrapper for /portal/* routes.
 * Follows the same grid pattern as the patient UserDashboard.
 */
const PortalLayout: React.FC = () => {
  const { data: provider } = useMyProvider();

  return (
    <div className="max-w-dashboard mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-8">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <PortalNavSidebar
            providerName={provider?.display_name}
            tier={(provider?.tier as ProviderTier) || 'free'}
          />
        </aside>

        {/* Main content */}
        <main className="min-w-0 pb-20 lg:pb-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
