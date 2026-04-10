import React from 'react';
import SEO from '@/components/SEO';
import { ShieldCheck, FileText, Sparkles, Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VerificationTier {
  tier: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'available' | 'locked';
}

const TIERS: VerificationTier[] = [
  {
    tier: 1,
    title: 'NPI Verification',
    description: 'Verified against the federal NPPES NPI Registry.',
    icon: <ShieldCheck size={20} />,
    status: 'completed', // All claimed providers have NPI verification
  },
  {
    tier: 2,
    title: 'License Verification',
    description: 'State license number verified against licensing board records.',
    icon: <FileText size={20} />,
    status: 'available',
  },
  {
    tier: 3,
    title: 'Psychage Certified',
    description: 'Reviewed and certified by the Psychage clinical team. Elite tier required.',
    icon: <Sparkles size={20} />,
    status: 'locked',
  },
];

const PortalVerification: React.FC = () => {
  return (
    <>
      <SEO title="Verification | Provider Portal" />
      <div className="space-y-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-text-primary">Verification</h1>
          <p className="text-text-secondary mt-1">
            Build trust with patients through our 3-tier verification system.
          </p>
        </div>

        <div className="space-y-4">
          {TIERS.map((t, i) => (
            <div
              key={t.tier}
              className={cn(
                'bg-surface rounded-2xl p-6 border transition-all',
                t.status === 'completed' && 'border-teal-300 dark:border-teal-700',
                t.status === 'available' && 'border-border',
                t.status === 'locked' && 'border-border opacity-60'
              )}
            >
              <div className="flex items-start gap-4">
                {/* Step indicator */}
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                  t.status === 'completed' && 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
                  t.status === 'available' && 'bg-gray-100 dark:bg-gray-800 text-text-secondary',
                  t.status === 'locked' && 'bg-gray-100 dark:bg-gray-800 text-text-tertiary'
                )}>
                  {t.status === 'completed' ? <Check size={18} /> : t.icon}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-text-primary">
                      Tier {t.tier}: {t.title}
                    </h3>
                    {t.status === 'completed' && (
                      <span className="text-xs font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                    {t.status === 'available' && (
                      <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock size={10} /> Available
                      </span>
                    )}
                    {t.status === 'locked' && (
                      <span className="text-xs font-medium text-text-tertiary bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                        Locked
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">{t.description}</p>
                </div>
              </div>

              {/* Connector line */}
              {i < TIERS.length - 1 && (
                <div className="ml-5 mt-4 mb-0 w-px h-4 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PortalVerification;
