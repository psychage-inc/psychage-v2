import React from 'react';
import { FileText, BookOpen, FlaskConical, Heart, AlertTriangle } from 'lucide-react';
import type { ArticleType } from '@/lib/article-framework/types';
import { ARTICLE_TEMPLATES, ARTICLE_TYPE_OPTIONS } from '@/lib/article-framework/constants';

const TYPE_ICONS: Record<ArticleType, React.ElementType> = {
  condition_deep_dive: FileText,
  treatment_guide: BookOpen,
  research_digest: FlaskConical,
  self_help: Heart,
  crisis_safety: AlertTriangle,
};

interface ArticleTypeSelectorProps {
  value: ArticleType | null;
  onChange: (type: ArticleType) => void;
  disabled?: boolean;
}

const ArticleTypeSelector: React.FC<ArticleTypeSelectorProps> = ({ value, onChange, disabled }) => {
  const selectedTemplate = value ? ARTICLE_TEMPLATES[value] : null;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-text-secondary">
        Article Type (PEAF Template)
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {ARTICLE_TYPE_OPTIONS.map((opt) => {
          const Icon = TYPE_ICONS[opt.value];
          const isSelected = value === opt.value;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              disabled={disabled}
              className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                isSelected
                  ? 'border-teal-500 bg-primary/10 ring-1 ring-teal-500'
                  : 'border-border hover:border-border-hover bg-surface'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div
                className={`p-1.5 rounded ${
                  isSelected
                    ? 'bg-teal-100 dark:bg-teal-800 text-primary'
                    : 'bg-surface-hover text-text-secondary'
                }`}
              >
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    isSelected ? 'text-teal-700 dark:text-teal-300' : 'text-text-primary'
                  }`}
                >
                  {opt.label}
                </p>
                <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Template requirements summary */}
      {selectedTemplate && (
        <div className="bg-surface-hover border border-border rounded-lg p-3 mt-2">
          <p className="text-xs font-medium text-text-secondary mb-2">
            Template Requirements
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary">
            <span>Min {selectedTemplate.minWordCount.toLocaleString()} words</span>
            <span>Min {selectedTemplate.minCitations} citations</span>
            <span>{selectedTemplate.requiredSections.length} sections</span>
            {selectedTemplate.requiresClinicalReview && (
              <span className="text-amber-600 dark:text-amber-400 font-medium">Clinical review required</span>
            )}
            {selectedTemplate.requiresCrisisDisclaimer && (
              <span className="text-red-600 dark:text-red-400 font-medium">Crisis disclaimer required</span>
            )}
          </div>
          <div className="mt-2">
            <p className="text-xs text-text-tertiary">Required sections:</p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {selectedTemplate.requiredSections.map((section) => (
                <span
                  key={section}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-surface-active text-text-secondary"
                >
                  {section}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleTypeSelector;
