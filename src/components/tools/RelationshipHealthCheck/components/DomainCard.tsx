import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Home, Users, Globe, ArrowRight, ChevronDown, BookOpen } from 'lucide-react';
import { DOMAIN_META, SUB_DIMENSION_META } from '../types';
import type { RelationshipDomain, SubDimensionScores } from '../types';
import { FRAMEWORKS } from '../frameworks';

interface DomainCardProps {
  domain: RelationshipDomain;
  score: number;
  subDimensionScores?: SubDimensionScores;
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

const DOMAIN_CONTEXT_BG: Record<RelationshipDomain, string> = {
  partner: 'bg-rose-50',
  family: 'bg-indigo-50',
  friends: 'bg-amber-50',
  community: 'bg-teal-50',
};

const DOMAIN_RING_COLORS: Record<RelationshipDomain, string> = {
  partner: '#f43f5e',
  family: '#6366f1',
  friends: '#f59e0b',
  community: '#20B8A6',
};

function getScoreLabel(score: number): { text: string; color: string } {
  if (score >= 80) return { text: 'Thriving', color: 'text-emerald-600 bg-emerald-50' };
  if (score >= 60) return { text: 'Healthy', color: 'text-teal-600 bg-teal-50' };
  if (score >= 40) return { text: 'Mixed', color: 'text-amber-600 bg-amber-50' };
  if (score >= 20) return { text: 'Strained', color: 'text-orange-600 bg-orange-50' };
  return { text: 'Needs attention', color: 'text-rose-600 bg-rose-50' };
}

function getSubDimLabel(score: number): { text: string; color: string } {
  if (score >= 75) return { text: 'Strong', color: 'text-emerald-600' };
  if (score >= 50) return { text: 'Moderate', color: 'text-teal-600' };
  if (score >= 25) return { text: 'Growth area', color: 'text-amber-600' };
  return { text: 'Focus here', color: 'text-rose-600' };
}

function getEvidenceInsight(domain: RelationshipDomain, score: number, subScores: Record<string, number>): string {
  const subDims = DOMAIN_META[domain].subDimensions;
  const sorted = [...subDims].sort(
    (a, b) => (subScores[a] ?? 0) - (subScores[b] ?? 0)
  );
  const weakest = sorted[0];
  const strongest = sorted[sorted.length - 1];
  const weakMeta = SUB_DIMENSION_META.find((m) => m.key === weakest);
  const strongMeta = SUB_DIMENSION_META.find((m) => m.key === strongest);

  if (score >= 75) {
    const framework = strongMeta ? FRAMEWORKS[strongMeta.frameworkRef] : null;
    return `Your ${strongMeta?.name.toLowerCase() ?? 'strongest area'} is especially strong. ${framework ? `${framework.shortName} research suggests this creates a foundation of security that buffers against life's challenges.` : 'This represents a genuine source of resilience.'}`;
  }
  if (score >= 50) {
    return `You have strengths in ${strongMeta?.name.toLowerCase() ?? 'several areas'}, with room to grow around ${weakMeta?.name.toLowerCase() ?? 'some areas'}. Even small, targeted improvements in your weaker sub-dimensions can elevate the entire domain.`;
  }
  const framework = weakMeta ? FRAMEWORKS[weakMeta.frameworkRef] : null;
  return `${weakMeta?.name.toLowerCase() ?? 'Several areas'} stands out as the primary growth opportunity here. ${framework ? `${framework.shortName} research offers evidence-based strategies for building strength in this area.` : 'Focused attention here can make a meaningful difference.'}`;
}

function getAction(domain: RelationshipDomain, score: number): { text: string; to: string } {
  if (score < 40) {
    if (domain === 'partner') {
      return { text: 'Explore couples support', to: '/providers' };
    }
    return { text: 'Find a provider near you', to: '/providers' };
  }
  return { text: 'Explore relationship articles', to: '/learn/relationships-social' };
}

export const DomainCard: React.FC<DomainCardProps> = ({
  domain,
  score,
  subDimensionScores,
  skipped,
  answers: _answers = {},
}) => {
  const [expanded, setExpanded] = useState(false);
  const meta = DOMAIN_META[domain];
  const action = getAction(domain, score);
  const scoreLabel = getScoreLabel(score);

  const gaugeCircumference = 2 * Math.PI * 28;
  const gaugeOffset = gaugeCircumference - (score / 100) * gaugeCircumference;

  // Get sub-dimension data for this domain
  const domainSubDims = useMemo(() => {
    const subDims = SUB_DIMENSION_META.filter((m) => m.domain === domain);
    const scores = subDimensionScores
      ? (subDimensionScores[domain] as Record<string, number>)
      : {};
    return subDims.map((m) => ({
      ...m,
      score: scores[m.key] ?? 0,
    }));
  }, [domain, subDimensionScores]);

  const subScoresMap = useMemo(() => {
    if (!subDimensionScores) return {};
    return subDimensionScores[domain] as Record<string, number>;
  }, [domain, subDimensionScores]);

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
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${scoreLabel.color}`}>
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

        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          {subDimensionScores
            ? getEvidenceInsight(domain, score, subScoresMap)
            : meta.description}
        </p>

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
              {/* Sub-dimension breakdown */}
              <h4 className="text-sm font-bold text-gray-900 mb-4">Sub-Dimension Breakdown</h4>
              <div className="space-y-3 mb-6">
                {domainSubDims.map((sub) => {
                  const label = getSubDimLabel(sub.score);
                  return (
                    <div key={sub.key}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700">{sub.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${label.color}`}>{label.text}</span>
                          <span className="text-xs text-gray-400 font-medium w-8 text-right">{sub.score}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${DOMAIN_BAR_COLORS[domain]}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${sub.score}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">{sub.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Framework attribution */}
              {domainSubDims.length > 0 && (
                <div className="bg-slate-50 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <BookOpen size={14} className="text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-600 mb-1">Research basis</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {(() => {
                          const refs = [...new Set(domainSubDims.map((d) => d.frameworkRef))];
                          const names = refs.map((r) => FRAMEWORKS[r]?.shortName).filter(Boolean);
                          return `Sub-dimensions grounded in ${names.join(', ')}`;
                        })()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Score context */}
              <div className={`rounded-lg p-3 ${DOMAIN_CONTEXT_BG[domain]}`}>
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>What this means:</strong> Your {meta.name.toLowerCase()} score of{' '}
                  <strong>{score}/100</strong> places you in the{' '}
                  <strong>{scoreLabel.text.toLowerCase()}</strong> range.
                  {domainSubDims.length > 0 && (() => {
                    const sorted = [...domainSubDims].sort((a, b) => a.score - b.score);
                    const weakest = sorted[0];
                    const strongest = sorted[sorted.length - 1];
                    if (strongest.score - weakest.score > 20) {
                      return ` Your strongest sub-dimension is ${strongest.name} (${strongest.score}) while ${weakest.name} (${weakest.score}) represents your greatest opportunity for growth.`;
                    }
                    return ` Your sub-dimensions are relatively balanced across this domain.`;
                  })()}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
