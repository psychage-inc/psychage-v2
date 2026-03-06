import React from 'react';
import SEO from '@/components/SEO';
import MeshGradient from '@/components/ui/MeshGradient';
import OnboardingFlow from './onboarding/OnboardingFlow';

const AdminOnboarding: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <SEO title="Admin Onboarding | Psychage" />
      <MeshGradient className="opacity-40" />
      <div className="relative z-10">
        <OnboardingFlow />
      </div>
    </div>
  );
};

export default AdminOnboarding;
