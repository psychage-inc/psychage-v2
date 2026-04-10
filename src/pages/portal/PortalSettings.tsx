import React from 'react';
import SEO from '@/components/SEO';

const PortalSettings: React.FC = () => {
  return (
    <>
      <SEO title="Settings | Provider Portal" />
      <div className="space-y-6">
        <h1 className="font-display font-bold text-2xl text-text-primary">Settings</h1>
        <div className="bg-surface rounded-2xl p-8 border border-border text-center">
          <p className="text-text-secondary">Provider settings coming soon.</p>
        </div>
      </div>
    </>
  );
};

export default PortalSettings;
