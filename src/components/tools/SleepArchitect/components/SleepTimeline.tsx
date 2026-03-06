import React from 'react';
import { motion } from 'framer-motion';
import { CycleArchitecture, formatTime, parseTime } from '../model';

interface SleepTimelineProps {
  bedtime: string;
  wakeTime: string;
  latencyMinutes: number;
  cycles: CycleArchitecture[];
  totalSleepMinutes: number;
}

const STAGE_COLORS = {
  n1: { bg: '#c7d2fe', label: 'N1 (Light)' },     // indigo-200
  n2: { bg: '#818cf8', label: 'N2 (Light)' },     // indigo-400
  n3: { bg: '#3730a3', label: 'N3 (Deep)' },      // indigo-800
  rem: { bg: '#f472b6', label: 'REM' },            // pink-400
  latency: { bg: '#e5e7eb', label: 'Falling Asleep' }, // gray-200
};

const SleepTimeline: React.FC<SleepTimelineProps> = ({
  bedtime,
  wakeTime,
  latencyMinutes,
  cycles,
  totalSleepMinutes,
}) => {
  const totalBarMinutes = totalSleepMinutes + latencyMinutes;
  if (totalBarMinutes <= 0) return null;

  const latencyWidth = (latencyMinutes / totalBarMinutes) * 100;
  const bedMins = parseTime(bedtime);
  const sleepStart = bedMins + latencyMinutes;

  return (
    <div className="space-y-4" role="img" aria-label="Sleep architecture timeline showing sleep stages across cycles">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs font-medium">
        {Object.entries(STAGE_COLORS).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: val.bg }} />
            <span className="text-gray-600">{val.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline bar */}
      <div className="relative">
        {/* Time labels */}
        <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-medium">
          <span>{bedtime}</span>
          <span>{wakeTime}</span>
        </div>

        {/* Main bar */}
        <div className="flex h-14 rounded-xl overflow-hidden shadow-inner bg-gray-100">
          {/* Latency segment */}
          {latencyMinutes > 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${latencyWidth}%` }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative group"
              style={{ backgroundColor: STAGE_COLORS.latency.bg }}
              title={`Falling asleep: ~${latencyMinutes} min`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap">
                  {latencyMinutes}m
                </span>
              </div>
            </motion.div>
          )}

          {/* Cycle segments */}
          {cycles.map((cycle, ci) => {
            const cycleWidth = (cycle.durationMinutes / totalBarMinutes) * 100;
            const stages = [
              { key: 'n1', pct: cycle.n1Percent, color: STAGE_COLORS.n1.bg },
              { key: 'n2', pct: cycle.n2Percent, color: STAGE_COLORS.n2.bg },
              { key: 'n3', pct: cycle.n3Percent, color: STAGE_COLORS.n3.bg },
              { key: 'rem', pct: cycle.remPercent, color: STAGE_COLORS.rem.bg },
            ];

            return (
              <motion.div
                key={cycle.cycleNumber}
                initial={{ width: 0 }}
                animate={{ width: `${cycleWidth}%` }}
                transition={{ duration: 0.4, delay: 0.2 + ci * 0.1 }}
                className="flex relative group"
                title={`Cycle ${cycle.cycleNumber}: ${cycle.durationMinutes} min`}
              >
                {stages.map(stage => (
                  <div
                    key={stage.key}
                    style={{
                      width: `${stage.pct}%`,
                      backgroundColor: stage.color,
                    }}
                    className="h-full transition-all"
                  />
                ))}
                {/* Cycle separator */}
                {ci < cycles.length - 1 && (
                  <div className="absolute right-0 top-0 h-full w-px bg-white/50" />
                )}
                {/* Cycle number label */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="text-[10px] font-bold text-white drop-shadow-md whitespace-nowrap bg-black/30 px-1.5 py-0.5 rounded">
                    C{cycle.cycleNumber}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cycle boundary times */}
        <div className="flex mt-1.5">
          {latencyMinutes > 0 && (
            <div style={{ width: `${latencyWidth}%` }} className="text-center">
              <span className="text-[10px] text-gray-400">
                {formatTime(sleepStart)}
              </span>
            </div>
          )}
          {cycles.map((cycle) => {
            const cycleWidth = (cycle.durationMinutes / totalBarMinutes) * 100;
            return (
              <div key={cycle.cycleNumber} style={{ width: `${cycleWidth}%` }} className="text-center">
                <span className="text-[10px] text-gray-400">
                  {formatTime(sleepStart + cycle.endMinuteFromSleep)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed cycle breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
        {cycles.map(cycle => (
          <div key={cycle.cycleNumber} className="bg-gray-50 rounded-lg p-2.5 text-xs">
            <div className="font-bold text-gray-700 mb-1">Cycle {cycle.cycleNumber}</div>
            <div className="text-gray-500">{cycle.durationMinutes} min</div>
            <div className="flex gap-1 mt-1.5">
              {[
                { pct: cycle.n3Percent, color: STAGE_COLORS.n3.bg, label: 'Deep' },
                { pct: cycle.remPercent, color: STAGE_COLORS.rem.bg, label: 'REM' },
              ].map(s => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-0.5 text-[10px] font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.pct}%
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SleepTimeline;
