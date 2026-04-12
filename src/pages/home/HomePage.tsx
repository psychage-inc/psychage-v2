import React, { Suspense } from 'react';
import SEO from '@/components/SEO';
import HeroSection from '@/components/home/v2/HeroSection';
import NavigatorShowcase from '@/components/home/v2/NavigatorShowcase';
import ToolsEcosystem from '@/components/home/v2/ToolsEcosystem';
import ProviderHighlight from '@/components/home/v2/ProviderHighlight';
import ClosingSection from '@/components/home/v2/ClosingSection';

const ContentShowcase = React.lazy(() => import('@/components/home/v2/ContentWorld'));

const HomePage: React.FC = () => {
  return (
    <div className="relative bg-[#FAF9F6] min-h-[100dvh]">
      <SEO
        title="Psychage — Free Mental Health Education, Tools & Provider Directory"
        description="Understand mental health clearly, freely, and privately. Evidence-based articles, a symptom navigator, interactive tools, and 423K+ verified providers — in 5 languages."
      />

      <HeroSection />
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
