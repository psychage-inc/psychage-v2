import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SpecialtyTagData {
  slug: string;
  label: string;
  category: string;
}

interface SpecialtyTagProps {
  specialty: SpecialtyTagData;
  size?: 'sm' | 'md';
  clickable?: boolean;
}

const CATEGORY_STYLES: Record<string, string> = {
  condition: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
  treatment_approach: 'bg-teal-50 text-teal-600 border-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800',
  population: 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
};

export const SpecialtyTag: React.FC<SpecialtyTagProps> = ({ specialty, size = 'md', clickable = false }) => {
  const navigate = useNavigate();
  const colorClass = CATEGORY_STYLES[specialty.category] || CATEGORY_STYLES.condition;

  const className = `inline-flex items-center rounded-full border font-medium ${colorClass} ${
    size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
  } ${clickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`;

  if (clickable) {
    return (
      <button
        className={className}
        onClick={() => navigate(`/providers/search?specialty=${specialty.slug}`)}
      >
        {specialty.label}
      </button>
    );
  }

  return <span className={className}>{specialty.label}</span>;
};
