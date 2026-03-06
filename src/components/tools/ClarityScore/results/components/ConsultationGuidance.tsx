import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, HeartHandshake, AlertTriangle } from 'lucide-react';
import type { ScoreTier } from '@/lib/clarity/types';

interface ConsultationGuidanceProps {
  tier: ScoreTier;
  score: number;
  flags?: string[];
}

interface GuidanceConfig {
  icon: React.ElementType;
  title: string;
  description: string;
  bg: string;
  border: string;
  iconColor: string;
  links?: Array<{ label: string; to: string }>;
}

function getGuidance(tier: ScoreTier, score: number): GuidanceConfig {
  if (score >= 60) {
    return {
      icon: Shield,
      title: 'Keep Building on This Foundation',
      description:
        'Your wellness snapshot suggests a solid foundation. Continue the habits and routines that support your well-being. Periodic check-ins with a professional can help maintain and optimize your mental health.',
      bg: 'bg-emerald-50 dark:bg-emerald-900/10',
      border: 'border-emerald-200 dark:border-emerald-800',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    };
  }

  if (score >= 40) {
    return {
      icon: HeartHandshake,
      title: 'Consider Guided Support',
      description:
        'Your responses suggest some areas could benefit from attention. Psychage tools and community resources can help, and speaking with a mental health professional is a smart next step if things do not improve over the next few assessments.',
      bg: 'bg-amber-50 dark:bg-amber-900/10',
      border: 'border-amber-200 dark:border-amber-800',
      iconColor: 'text-amber-600 dark:text-amber-400',
      links: [
        { label: 'Find a Provider', to: '/find-care' },
        { label: 'Explore Tools', to: '/tools' },
      ],
    };
  }

  return {
    icon: AlertTriangle,
    title: 'Professional Consultation Recommended',
    description:
      'Your responses suggest you may be experiencing significant challenges. This is not a failure — reaching out for professional support is the clearest and most effective path to feeling better. You deserve help, and it is available.',
    bg: 'bg-orange-50 dark:bg-orange-900/10',
    border: 'border-orange-200 dark:border-orange-800',
    iconColor: 'text-orange-600 dark:text-orange-400',
    links: [
      { label: 'Find a Provider', to: '/find-care' },
      { label: 'Crisis Resources', to: '/crisis' },
    ],
  };
}

const ConsultationGuidance: React.FC<ConsultationGuidanceProps> = ({
  tier,
  score,
  flags = [],
}) => {
  const config = getGuidance(tier, score);
  const Icon = config.icon;

  return (
    <div
      className={`rounded-2xl p-6 border ${config.bg} ${config.border}`}
      role="region"
      aria-label="Consultation guidance"
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${config.bg} ${config.iconColor}`}
        >
          <Icon size={22} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">
            {config.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {config.description}
          </p>

          {config.links && config.links.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {config.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-teal-700 dark:text-teal-300 bg-white dark:bg-gray-800 rounded-full border border-teal-200 dark:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationGuidance;
