/**
 * Cross-Tool Links — Contextual navigation to related Psychage tools.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Smile,
  Stethoscope,
  Brain,
  ChevronRight,
} from 'lucide-react';

const LINKS = [
  {
    icon: <Smile size={18} className="text-amber-500" />,
    title: 'Log your mood alongside sleep',
    description: 'Track how sleep affects your daily mood',
    to: '/tools/mood-journal',
  },
  {
    icon: <Brain size={18} className="text-teal-500" />,
    title: 'Take the Clarity Score',
    description: 'Your sleep data feeds into the Sleep Quality dimension',
    to: '/clarity-score',
  },
  {
    icon: <BookOpen size={18} className="text-indigo-500" />,
    title: 'Learn about sleep science',
    description: 'Evidence-based articles on sleep health',
    to: '/learn',
  },
  {
    icon: <Stethoscope size={18} className="text-rose-500" />,
    title: 'Find a sleep specialist',
    description: 'Browse providers with sleep expertise',
    to: '/find-care',
  },
];

const CrossToolLinks: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-gray-700">
      <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-4">
        Related Tools
      </h3>

      <div className="space-y-2">
        {LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
          >
            {link.icon}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-gray-900 dark:text-white">
                {link.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {link.description}
              </div>
            </div>
            <ChevronRight
              size={16}
              className="text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors flex-shrink-0"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CrossToolLinks;
