import React from 'react';
import type { LanguageLookup } from '@/lib/providers/types';

interface LanguageBadgeProps {
  language: LanguageLookup & { proficiency?: string };
  showProficiency?: boolean;
}

export const LanguageBadge: React.FC<LanguageBadgeProps> = ({ language, showProficiency = false }) => (
  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full border border-green-100 dark:border-green-800">
    {language.label}
    {showProficiency && language.proficiency && language.proficiency !== 'fluent' && (
      <span className="text-green-400 dark:text-green-500">({language.proficiency})</span>
    )}
  </span>
);
