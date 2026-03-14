import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home, Users, Globe, ArrowRight } from 'lucide-react';
import { DOMAIN_META } from '../types';
import type { RelationshipDomain } from '../types';

interface DomainCardProps {
  domain: RelationshipDomain;
  score: number;
  skipped?: boolean;
}

const DOMAIN_ICONS: Record<RelationshipDomain, React.ReactNode> = {
  partner: <Heart size={20} />,
  family: <Home size={20} />,
  friends: <Users size={20} />,
  community: <Globe size={20} />,
};

const DOMAIN_BAR_COLORS: Record<RelationshipDomain, string> = {
  partner: 'bg-rose-500',
  family: 'bg-indigo-500',
  friends: 'bg-amber-500',
  community: 'bg-teal-500',
};

function getInsight(domain: RelationshipDomain, score: number): string {
  if (score >= 75) {
    const insights: Record<RelationshipDomain, string> = {
      partner:
        'Your romantic relationship appears to be a strong source of support and connection. Continue nurturing open communication.',
      family:
        'Your family bonds seem solid and supportive. These connections can be a powerful buffer during difficult times.',
      friends:
        'Your friendships appear meaningful and reciprocal. Strong friendships are among the best predictors of well-being.',
      community:
        'You seem well-connected to your broader community. This sense of belonging contributes significantly to mental health.',
    };
    return insights[domain];
  }
  if (score >= 50) {
    const insights: Record<RelationshipDomain, string> = {
      partner:
        'Your partnership has strengths to build on, though there may be areas where deeper connection could help.',
      family:
        'Your family relationships have a foundation of connection, but some areas might benefit from attention.',
      friends:
        'You have some friendship connections, but there may be room to deepen or expand your social circle.',
      community:
        'You have some community ties, but increasing your engagement could strengthen your sense of belonging.',
    };
    return insights[domain];
  }
  const insights: Record<RelationshipDomain, string> = {
    partner:
      'Your partnership may be going through a challenging period. Exploring these feelings with a professional could help.',
    family:
      'Family relationships can be complicated. Many people find it helpful to explore these dynamics with support.',
    friends:
      'Building meaningful friendships takes time. Even small steps toward connection can make a real difference.',
    community:
      'Feeling disconnected from your community is more common than you might think. Finding even one group or activity can help.',
  };
  return insights[domain];
}

function getAction(domain: RelationshipDomain, score: number): { text: string; to: string } {
  if (score < 40) {
    if (domain === 'partner') {
      return { text: 'Explore support options', to: '/providers' };
    }
    return { text: 'Find a provider near you', to: '/providers' };
  }
  if (domain === 'partner' || domain === 'family') {
    return { text: 'Try the Thought Reframer', to: '/tools/thought-reframer' };
  }
  return { text: 'Explore relationship articles', to: '/learn/relationships-social' };
}

export const DomainCard: React.FC<DomainCardProps> = ({ domain, score, skipped }) => {
  const meta = DOMAIN_META[domain];
  const action = getAction(domain, score);

  if (skipped) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm opacity-50">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${meta.bgColor} ${meta.textColor}`}>
            {DOMAIN_ICONS[domain]}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{meta.name}</h3>
            <p className="text-xs text-gray-400">Skipped</p>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          This domain was not included in your assessment.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${meta.bgColor} ${meta.textColor}`}>
            {DOMAIN_ICONS[domain]}
          </div>
          <h3 className="font-bold text-gray-900">{meta.name}</h3>
        </div>
        <span className="text-2xl font-bold text-gray-900">{score}</span>
      </div>

      {/* Score bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full rounded-full ${DOMAIN_BAR_COLORS[domain]}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Insight */}
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{getInsight(domain, score)}</p>

      {/* Action link */}
      <Link
        to={action.to}
        className="inline-flex items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors"
      >
        {action.text}
        <ArrowRight size={14} />
      </Link>
    </div>
  );
};
