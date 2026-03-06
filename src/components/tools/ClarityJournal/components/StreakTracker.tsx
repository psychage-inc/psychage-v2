import React from 'react';
import { Flame } from 'lucide-react';

interface StreakTrackerProps {
  streak: number;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ streak }) => {
  if (streak === 0) return null;

  return (
    <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-sm font-medium">
      <Flame className="w-4 h-4" />
      <span>{streak} day{streak !== 1 ? 's' : ''} in a row</span>
    </div>
  );
};

export default StreakTracker;
