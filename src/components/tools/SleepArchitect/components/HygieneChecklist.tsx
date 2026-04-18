import React from 'react';
import { CheckCircle2, Smartphone, Coffee, Thermometer, Moon, Sun } from 'lucide-react';

interface Habit {
  id: string;
  text: string;
  icon: React.ElementType;
}

const HABITS: Habit[] = [
  { id: 'screens', text: 'No screens 1 hour before bed', icon: Smartphone },
  { id: 'caffeine', text: 'No caffeine after 2 PM', icon: Coffee },
  { id: 'temp', text: 'Room temperature 65–68°F', icon: Thermometer },
  { id: 'dark', text: 'Room is completely dark', icon: Moon },
  { id: 'sun', text: 'Morning sunlight exposure', icon: Sun },
];

interface HygieneChecklistProps {
  checked: string[];
  onToggle: (id: string) => void;
}

const HygieneChecklist: React.FC<HygieneChecklistProps> = ({ checked, onToggle }) => {
  const score = HABITS.length > 0 ? Math.round((checked.length / HABITS.length) * 100) : 0;

  return (
    <div className="bg-gray-900 rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 p-32 bg-indigo-500/20 blur-[80px] rounded-full" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-bold text-lg">Sleep Hygiene</h3>
            <p className="text-gray-400 dark:text-neutral-500 text-xs">Daily habits check</p>
          </div>
          <div className="text-3xl font-display font-bold text-indigo-400">
            {score}%
          </div>
        </div>

        <div className="space-y-2">
          {HABITS.map(habit => {
            const isChecked = checked.includes(habit.id);
            return (
              <button
                key={habit.id}
                type="button"
                onClick={() => onToggle(habit.id)}
                className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all text-sm ${
                  isChecked
                    ? 'bg-indigo-600/20 border border-indigo-500/50 text-white'
                    : 'bg-white/5 border border-white/10 text-gray-400 dark:text-neutral-500 hover:bg-white/10'
                }`}
                role="checkbox"
                aria-checked={isChecked}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                  isChecked ? 'border-indigo-400 bg-indigo-400' : 'border-gray-500'
                }`}>
                  {isChecked && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <span className="font-medium text-left">{habit.text}</span>
                <habit.icon size={16} className="ml-auto opacity-50 flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HygieneChecklist;
