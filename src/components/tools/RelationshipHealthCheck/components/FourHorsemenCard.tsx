import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Swords, EyeOff, Ban } from 'lucide-react';
import type { FourHorsemenResult, HorsemanKey } from '../types';

interface FourHorsemenCardProps {
  fourHorsemen: FourHorsemenResult;
}

const HORSEMAN_META: Record<
  HorsemanKey,
  {
    name: string;
    icon: React.ReactNode;
    antidote: string;
    description: string;
    color: string;
    bgColor: string;
  }
> = {
  criticism: {
    name: 'Criticism',
    icon: <Swords size={18} />,
    antidote: 'Gentle Start-Up',
    description: 'Attacking your partner\'s character rather than addressing specific behavior',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  contempt: {
    name: 'Contempt',
    icon: <Ban size={18} />,
    antidote: 'Culture of Appreciation',
    description: 'Expressing superiority or disrespect — the strongest predictor of divorce',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  defensiveness: {
    name: 'Defensiveness',
    icon: <Shield size={18} />,
    antidote: 'Taking Responsibility',
    description: 'Deflecting blame and refusing to accept any role in the problem',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  stonewalling: {
    name: 'Stonewalling',
    icon: <EyeOff size={18} />,
    antidote: 'Physiological Self-Soothing',
    description: 'Withdrawing emotionally and shutting down during conflict',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
  },
};

const HORSEMEN_ORDER: HorsemanKey[] = ['criticism', 'contempt', 'defensiveness', 'stonewalling'];

function getRiskBadge(risk: FourHorsemenResult['overallRisk']): { text: string; color: string } {
  switch (risk) {
    case 'elevated':
      return { text: 'Elevated Risk', color: 'bg-red-100 text-red-700' };
    case 'moderate':
      return { text: 'Mild Patterns', color: 'bg-amber-100 text-amber-700' };
    case 'low':
      return { text: 'Low Risk', color: 'bg-emerald-100 text-emerald-700' };
  }
}

function getScoreBar(score: number): { width: string; color: string } {
  if (score >= 4) return { width: `${(score / 5) * 100}%`, color: 'bg-red-400' };
  if (score >= 3) return { width: `${(score / 5) * 100}%`, color: 'bg-amber-400' };
  return { width: `${(score / 5) * 100}%`, color: 'bg-emerald-400' };
}

export const FourHorsemenCard: React.FC<FourHorsemenCardProps> = ({ fourHorsemen }) => {
  const riskBadge = getRiskBadge(fourHorsemen.overallRisk);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-500" />
          <h3 className="font-bold text-gray-900">The Four Horsemen</h3>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${riskBadge.color}`}>
          {riskBadge.text}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-5">
        Gottman's research identified four communication patterns that predict relationship
        breakdown with 93.6% accuracy. Each has a specific, learnable antidote.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {HORSEMEN_ORDER.map((key) => {
          const meta = HORSEMAN_META[key];
          const data = fourHorsemen[key];
          const bar = getScoreBar(data.score);

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-4 border ${data.present ? `${meta.bgColor} border-gray-200` : 'bg-gray-50 border-gray-100'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={data.present ? meta.color : 'text-gray-400'}>
                  {meta.icon}
                </span>
                <span className={`text-sm font-bold ${data.present ? meta.color : 'text-gray-600'}`}>
                  {meta.name}
                </span>
                {data.present && (
                  <span className="text-[10px] font-semibold bg-white/80 text-red-600 px-2 py-0.5 rounded-full">
                    Detected
                  </span>
                )}
              </div>

              {/* Score bar */}
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                <motion.div
                  className={`h-full rounded-full ${bar.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: bar.width }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>

              <p className="text-[11px] text-gray-500 leading-relaxed mb-1.5">{meta.description}</p>
              <p className="text-[11px] font-medium text-teal-600">
                Antidote: {meta.antidote}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Based on the Sound Relationship House theory by John Gottman & Robert Levenson (2000).
          Scores are derived from your conflict quality and appreciation responses.
        </p>
      </div>
    </div>
  );
};
