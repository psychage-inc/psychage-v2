import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  HeartHandshake,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import type { ScoreTier } from '@/lib/clarity/types';
import { getTierHexColor } from '@/lib/clarity/scoring';

interface ConsultationGuidanceProps {
  tier: ScoreTier;
  score: number;
  flags?: string[];
}

interface GuidanceConfig {
  icon: React.ElementType;
  title: string;
  description: string;
  whatYouCanDo: string[];
  links?: Array<{ label: string; to: string; primary?: boolean }>;
}

function getGuidance(_tier: ScoreTier, score: number): GuidanceConfig {
  if (score >= 60) {
    return {
      icon: Shield,
      title: 'Keep Building on This Foundation',
      description:
        'Your wellness snapshot suggests a solid foundation. Continue the habits and routines that support your well-being. Periodic check-ins with a professional can help maintain and optimize your mental health.',
      whatYouCanDo: [
        'Continue your current wellness routines',
        'Consider periodic check-ins for maintenance and growth',
        'Share strategies that work with others who may benefit',
        'Retake this assessment in 2–4 weeks to track trends',
      ],
    };
  }

  if (score >= 40) {
    return {
      icon: HeartHandshake,
      title: 'Consider Guided Support',
      description:
        'Your responses suggest some areas could benefit from attention. Psychage tools and community resources can help, and speaking with a mental health professional is a smart next step if things do not improve.',
      whatYouCanDo: [
        'Explore Psychage wellness tools for your growth areas',
        'Speak with a mental health professional if patterns persist',
        'Track changes with regular self-assessments',
        'Build a support network you can lean on',
      ],
      links: [
        { label: 'Find a Provider', to: '/providers', primary: true },
        { label: 'Explore Tools', to: '/tools' },
      ],
    };
  }

  return {
    icon: AlertTriangle,
    title: 'Professional Consultation Recommended',
    description:
      'Your responses suggest you may be experiencing significant challenges. This is not a failure — reaching out for professional support is the clearest and most effective path to feeling better. You deserve help, and it is available.',
    whatYouCanDo: [
      'Connect with a mental health professional',
      'Reach out to a trusted person in your life',
      'Focus on basic self-care: sleep, nutrition, hydration',
      'Know that seeking help is a sign of strength, not weakness',
    ],
    links: [
      { label: 'Find a Provider', to: '/providers', primary: true },
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
  const tierColor = getTierHexColor(tier);

  return (
    <div
      className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
      role="region"
      aria-label="Consultation guidance"
    >
      {/* Colored header */}
      <div
        className="p-6 flex items-center gap-4"
        style={{ backgroundColor: `${tierColor}15` }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${tierColor}25`, color: tierColor }}
        >
          <Icon size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white text-lg">
            {config.title}
          </h4>
          {flags.length > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {flags.length} clinical indicator
              {flags.length !== 1 ? 's' : ''} flagged
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 bg-white dark:bg-gray-900 space-y-5">
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {config.description}
        </p>

        {/* What You Can Do */}
        <div>
          <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            What You Can Do
          </h5>
          <ul className="space-y-2.5">
            {config.whatYouCanDo.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300"
              >
                <CheckCircle2
                  size={16}
                  className="shrink-0 mt-0.5 text-teal-500"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action buttons */}
        {config.links && config.links.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-2">
            {config.links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                  link.primary
                    ? 'text-white hover:opacity-90'
                    : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                style={
                  link.primary ? { backgroundColor: tierColor } : undefined
                }
              >
                {link.label}
                <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationGuidance;
