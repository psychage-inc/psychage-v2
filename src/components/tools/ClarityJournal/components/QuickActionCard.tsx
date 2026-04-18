import React from 'react';
import { Link } from 'react-router-dom';
import { Check, LucideIcon } from 'lucide-react';

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  route: string;
  completed?: boolean;
  accent?: 'teal' | 'red';
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon: Icon,
  title,
  subtitle,
  route,
  completed = false,
  accent = 'teal',
}) => {
  const accentColors = accent === 'red'
    ? 'bg-red-50 border-red-200 hover:border-red-300'
    : completed
      ? 'bg-teal-50 border-teal-200'
      : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-700 hover:border-teal-300';

  return (
    <Link
      to={route}
      className={`group flex items-center gap-4 rounded-2xl p-4 border shadow-sm transition-all duration-200 hover:shadow-md ${accentColors}`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
        accent === 'red'
          ? 'bg-red-100 text-red-600'
          : completed
            ? 'bg-teal-100 text-teal-600'
            : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 group-hover:bg-teal-100 group-hover:text-teal-600'
      } transition-colors`}>
        {completed ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-slate-900 dark:text-neutral-100 text-sm">{title}</p>
        <p className="text-xs text-slate-500 dark:text-neutral-400 truncate">{subtitle}</p>
      </div>
    </Link>
  );
};

export default QuickActionCard;
