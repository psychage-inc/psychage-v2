import { motion } from 'framer-motion';
import { FileText, Wrench, PlayCircle, BookOpen } from 'lucide-react';
import type { CitationSource } from '../types/chat.types';

interface SourceCitationsProps {
  sources: CitationSource[];
}

const TYPE_ICONS: Record<CitationSource['type'], typeof FileText> = {
  article: FileText,
  tool: Wrench,
  video: PlayCircle,
  guide: BookOpen,
};

export default function SourceCitations({ sources }: SourceCitationsProps) {
  if (!sources.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-3"
    >
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Sources</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {sources.map((source) => {
          const Icon = TYPE_ICONS[source.type] || FileText;
          return (
            <a
              key={source.id}
              href={source.url}
              className="flex items-start gap-2.5 border border-slate-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors"
            >
              <Icon size={16} className="text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-neutral-200 truncate">
                  {source.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-neutral-400 truncate">
                  {source.snippet}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}
