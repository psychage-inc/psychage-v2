/**
 * CitationCard - Article/Video/External Source Cards
 *
 * Displays citations from Psychage AI responses with:
 * - Article variant (title, excerpt, link)
 * - Video variant (thumbnail, duration)
 * - External source variant (domain trust badge)
 * - Enhanced visual design with gradients and hover effects
 */

import React from 'react';
import { ExternalLink, FileText, Video, Globe } from 'lucide-react';
import type { Citation } from '@/lib/ai/types';

interface CitationCardProps {
  citation: Citation;
}

const CitationCard: React.FC<CitationCardProps> = ({ citation }) => {
  const { title, url_path } = citation;

  // Simplified for SourceCitation type
  const isExternal = false;
  const isVideo = false;
  const _isArticle = true;

  // Icon based on type
  const Icon = isVideo ? Video : isExternal ? Globe : FileText;

  // Color scheme based on type
  const colorClass = isExternal
    ? 'border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-900/20'
    : isVideo
    ? 'border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/10 dark:to-purple-900/20'
    : 'border-teal-200 dark:border-teal-800 bg-gradient-to-br from-teal-50 to-emerald-50/50 dark:from-teal-900/10 dark:to-emerald-900/20';

  const iconColor = isExternal
    ? 'text-blue-600 dark:text-blue-400'
    : isVideo
    ? 'text-purple-600 dark:text-purple-400'
    : 'text-teal-600 dark:text-teal-400';

  const iconBgClass = isExternal
    ? 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-900/50'
    : isVideo
    ? 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-900/50'
    : 'bg-gradient-to-br from-teal-100 to-emerald-200 dark:from-teal-900/30 dark:to-emerald-900/50';

  return (
    <a
      href={url_path}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-3.5 rounded-xl border-2 ${colorClass} hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group`}
    >
      <div className="flex gap-3">
        {/* Enhanced Icon for articles */}
        <div className="shrink-0 relative">
          <div className={`absolute inset-0 ${iconBgClass} rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity`} />
          <div className={`relative w-11 h-11 rounded-xl ${iconBgClass} flex items-center justify-center ring-2 ring-white dark:ring-gray-800`}>
            <Icon size={22} className={iconColor} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`text-sm font-bold text-gray-900 dark:text-white line-clamp-2 transition-colors group-hover:text-teal-600 dark:group-hover:text-teal-400`}>
              {title}
            </h4>
            <ExternalLink
              size={15}
              className={`shrink-0 text-gray-400 transition-colors mt-0.5 group-hover:text-teal-600 dark:group-hover:text-teal-400`}
            />
          </div>

          {/* Type badge */}
          <div className="flex items-center gap-2 mt-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300`}>
              <Icon size={10} />
              Article
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CitationCard;
