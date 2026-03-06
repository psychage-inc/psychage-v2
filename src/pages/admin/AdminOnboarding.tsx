import React from 'react';
import SEO from '@/components/SEO';
import OnboardingFlow from './onboarding/OnboardingFlow';

const AdminOnboarding: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <SEO title="Admin Onboarding | Psychage" />
            <div className="relative z-10">
        <OnboardingFlow />
      </div>
    </div>
  );
};

export default AdminOnboarding;
