import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Moon, Zap, BarChart2, AlertTriangle, Info } from 'lucide-react';
import { SleepPlanOutput, formatDuration, RiskFlag } from '../model';

interface SummaryCardsProps {
  output: SleepPlanOutput;
}

function efficiencyColor(eff: number): string {
  if (eff >= 0.9) return 'text-emerald-600';
  if (eff >= 0.85) return 'text-amber-600';
  return 'text-red-600';
}

function efficiencyBg(eff: number): string {
  if (eff >= 0.9) return 'bg-emerald-50 border-emerald-100';
  if (eff >= 0.85) return 'bg-amber-50 border-amber-100';
  return 'bg-red-50 border-red-100';
}

function riskIcon(flag: RiskFlag) {
  if (flag.severity === 'danger') return <AlertTriangle size={14} className="text-red-500 flex-shrink-0" />;
  if (flag.severity === 'warning') return <AlertTriangle size={14} className="text-amber-500 flex-shrink-0" />;
  return <Info size={14} className="text-blue-500 flex-shrink-0" />;
}

function riskBg(flag: RiskFlag) {
  if (flag.severity === 'danger') return 'bg-red-50 border-red-100';
  if (flag.severity === 'warning') return 'bg-amber-50 border-amber-100';
  return 'bg-blue-50 border-blue-100';
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ output }) => {
  const metrics = [
    {
      icon: <Clock size={20} />,
      label: 'Time in Bed',
      value: formatDuration(output.timeInBedMinutes),
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      icon: <Moon size={20} />,
      label: 'Total Sleep',
      value: formatDuration(output.totalSleepTimeMinutes),
      color: 'text-violet-600 bg-violet-50',
    },
    {
      icon: <Zap size={20} />,
      label: 'Efficiency',
      value: `${Math.round(output.sleepEfficiency * 100)}%`,
      color: `${efficiencyColor(output.sleepEfficiency)} ${efficiencyBg(output.sleepEfficiency)}`,
    },
    {
      icon: <BarChart2 size={20} />,
      label: 'Cycles',
      value: `${output.estimatedCycles}`,
      color: 'text-sky-600 bg-sky-50',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-2xl p-4 border ${m.color.split(' ').slice(1).join(' ')} border-opacity-50`}
          >
            <div className={`mb-2 ${m.color.split(' ')[0]}`}>
              {m.icon}
            </div>
            <div className="text-xs font-medium text-gray-500">{m.label}</div>
            <div className={`text-xl font-bold font-display ${m.color.split(' ')[0]}`}>
              {m.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* WASO if any */}
      {output.wasoMinutes > 0 && (
        <div className="text-xs text-gray-500 bg-gray-50 rounded-xl p-3 border border-gray-100">
          Wake after sleep onset: <span className="font-bold">{formatDuration(output.wasoMinutes)}</span>
        </div>
      )}

      {/* Risk flags */}
      {output.riskFlags.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Alerts</h4>
          {output.riskFlags.map((flag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className={`flex items-start gap-2 text-xs p-3 rounded-xl border ${riskBg(flag)}`}
            >
              {riskIcon(flag)}
              <span className="text-gray-700 leading-relaxed">{flag.message}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryCards;
