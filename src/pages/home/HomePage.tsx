import React, { Suspense } from 'react';
import SEO from '@/components/SEO';
import HeroSection from '@/components/home/v2/HeroSection';
import NavigatorShowcase from '@/components/home/v2/NavigatorShowcase';
import ToolsEcosystem from '@/components/home/v2/ToolsEcosystem';
import ProviderHighlight from '@/components/home/v2/ProviderHighlight';
import ClosingSection from '@/components/home/v2/ClosingSection';
import AnonymousWelcomeBanner from '@/components/onboarding/AnonymousWelcomeBanner';
import { useAuth } from '@/context/AuthContext';

const ContentShowcase = React.lazy(() => import('@/components/home/v2/ContentWorld'));

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="relative bg-[var(--color-homepage-bg)] min-h-[100dvh]">
      <SEO
        title="Psychage — Free Mental Health Education, Tools & Provider Directory"
        description="Understand mental health clearly, freely, and privately. Evidence-based articles, a symptom navigator, interactive tools, and 423K+ verified providers — in 5 languages."
      />

      <HeroSection />

      {/* First-visit guide for anonymous users */}
      {!user && (
        <div className="max-w-6xl mx-auto px-6 md:px-8 -mt-4 mb-8">
          <AnonymousWelcomeBanner />
        </div>
      )}

      <NavigatorShowcase />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ContentShowcase />
      </Suspense>
      <ToolsEcosystem />
      <ProviderHighlight />
      <ClosingSection />
    </div>
  );
};

export default HomePage;
