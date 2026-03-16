import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Home, Users, Globe, ArrowRight, ChevronDown, Check, AlertTriangle } from 'lucide-react';
import { DOMAIN_META } from '../types';
import { getDomainQuestions } from '../questions';
import type { RelationshipDomain } from '../types';

interface DomainCardProps {
  domain: RelationshipDomain;
  score: number;
  skipped?: boolean;
  answers?: Record<string, number>;
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

const DOMAIN_RING_COLORS: Record<RelationshipDomain, string> = {
  partner: '#f43f5e',
  family: '#6366f1',
  friends: '#f59e0b',
  community: '#14b8a6',
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

function getScoreLabel(score: number): { text: string; color: string } {
  if (score >= 80) return { text: 'Thriving', color: 'text-emerald-600 bg-emerald-50' };
  if (score >= 60) return { text: 'Healthy', color: 'text-teal-600 bg-teal-50' };
  if (score >= 40) return { text: 'Mixed', color: 'text-amber-600 bg-amber-50' };
  if (score >= 20) return { text: 'Strained', color: 'text-orange-600 bg-orange-50' };
  return { text: 'Needs attention', color: 'text-rose-600 bg-rose-50' };
}

function getQuestionScoreInfo(value: number, reverseScored: boolean): { label: string; color: string; icon: 'check' | 'alert' | 'neutral' } {
  const effectiveScore = reverseScored ? 6 - value : value;
  if (effectiveScore >= 4) return { label: 'Strong', color: 'text-emerald-600', icon: 'check' };
  if (effectiveScore >= 3) return { label: 'Neutral', color: 'text-gray-500', icon: 'neutral' };
  return { label: 'Growth area', color: 'text-amber-600', icon: 'alert' };
}

function getAction(domain: RelationshipDomain, score: number): { text: string; to: string } {
  if (score < 40) {
    if (domain === 'partner') {
      return { text: 'Explore support options', to: '/providers' };
    }
    return { text: 'Find a provider near you', to: '/providers' };
  }
  return { text: 'Explore relationship articles', to: '/learn/relationships-social' };
}

function getTips(domain: RelationshipDomain, score: number): string[] {
  if (score >= 75) {
    return [
      'Continue the practices that are working well for you',
      'Share your experience to inspire others',
      'Consider deepening these connections further',
    ];
  }
  if (score >= 50) {
    const tips: Record<RelationshipDomain, string[]> = {
      partner: [
        'Schedule regular check-ins to discuss feelings openly',
        'Practice active listening without interrupting',
        'Express appreciation for small things daily',
      ],
      family: [
        'Initiate a regular family activity or call',
        'Address one unresolved concern at a time',
        'Express gratitude for family support you receive',
      ],
      friends: [
        'Reach out to one friend you haven\'t spoken to recently',
        'Suggest a recurring meetup or activity',
        'Be vulnerable — share something real',
      ],
      community: [
        'Join one local group or organization',
        'Attend a community event this month',
        'Introduce yourself to a neighbor',
      ],
    };
    return tips[domain];
  }
  const tips: Record<RelationshipDomain, string[]> = {
    partner: [
      'Consider couples counseling as a constructive step',
      'Identify one specific area to work on together',
      'Create a safe space for honest conversation',
    ],
    family: [
      'A family therapist can help mediate difficult dynamics',
      'Set healthy boundaries where needed',
      'Focus on one relationship within the family to strengthen first',
    ],
    friends: [
      'Start small — reconnect with one person',
      'Explore hobby groups or clubs to meet like-minded people',
      'Be patient with yourself — building trust takes time',
    ],
    community: [
      'Try volunteering — it builds connection and purpose',
      'Explore online communities if in-person feels overwhelming',
      'Visit a local library, coffee shop, or park regularly',
    ],
  };
  return tips[domain];
}

export const DomainCard: React.FC<DomainCardProps> = ({ domain, score, skipped, answers = {} }) => {
  const [expanded, setExpanded] = useState(false);
  const meta = DOMAIN_META[domain];
  const action = getAction(domain, score);
  const scoreLabel = getScoreLabel(score);
  const questions = getDomainQuestions(domain);
  const tips = getTips(domain, score);

  const gaugeCircumference = 2 * Math.PI * 28;
  const gaugeOffset = gaugeCircumference - (score / 100) * gaugeCircumference;

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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full p-6 text-left cursor-pointer"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${meta.bgColor} ${meta.textColor}`}>
              {DOMAIN_ICONS[domain]}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{meta.name}</h3>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${scoreLabel.color}`}>
                {scoreLabel.text}
              </span>
            </div>
          </div>

          <div className="relative w-14 h-14 shrink-0">
            <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
              <circle cx="32" cy="32" r="28" fill="none" stroke="#f3f4f6" strokeWidth="4" />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke={DOMAIN_RING_COLORS[domain]}
                strokeWidth="4"
                strokeDasharray={gaugeCircumference}
                strokeDashoffset={gaugeOffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-900">{score}</span>
            </div>
          </div>
        </div>

        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
          <div
            className={`h-full rounded-full ${DOMAIN_BAR_COLORS[domain]}`}
            style={{ width: `${score}%` }}
          />
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-3">{getInsight(domain, score)}</p>

        <div className="flex items-center justify-between">
          <Link
            to={action.to}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors"
          >
            {action.text}
            <ArrowRight size={14} />
          </Link>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={18} className="text-gray-400" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Your Responses</h4>
              <div className="space-y-2 mb-6">
                {questions.map((q) => {
                  const answer = answers[q.id];
                  if (!answer) return null;
                  const info = getQuestionScoreInfo(answer, q.reverseScored);
                  return (
                    <div key={q.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <div className="mt-0.5 shrink-0">
                        {info.icon === 'check' && <Check size={14} className="text-emerald-500" />}
                        {info.icon === 'alert' && <AlertTriangle size={14} className="text-amber-500" />}
                        {info.icon === 'neutral' && <div className="w-3.5 h-3.5 rounded-full bg-gray-300" />}
                      </div>
                      <p className="flex-1 min-w-0 text-xs text-gray-700 leading-relaxed">{q.text}</p>
                      <span className={`text-xs font-bold shrink-0 ${info.color}`}>{info.label}</span>
                    </div>
                  );
                })}
              </div>

              <h4 className="text-sm font-bold text-gray-900 mb-3">Personalized Tips</h4>
              <ul className="space-y-2 mb-4">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-teal-500 font-bold shrink-0 mt-px">{i + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ul>

              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>What this means:</strong> Your {meta.name.toLowerCase()} score of{' '}
                  <strong>{score}/100</strong> places you in the{' '}
                  <strong>{scoreLabel.text.toLowerCase()}</strong> range. This reflects how
                  supported, connected, and valued you feel in this area of your life.
                  {score < 50
                    ? ' Scores in this range are common and often improve with targeted effort or professional guidance.'
                    : score < 75
                    ? ' You have a solid foundation to build on — small, intentional steps can make a meaningful difference.'
                    : ' Keep doing what works and consider how you might support others in building similar connections.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
