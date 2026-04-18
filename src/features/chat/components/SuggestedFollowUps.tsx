import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface SuggestedFollowUpsProps {
  suggestions: string[];
  onSelect: (text: string) => void;
}

export default function SuggestedFollowUps({ suggestions, onSelect }: SuggestedFollowUpsProps) {
  if (!suggestions.length) return null;

  return (
    <div className="mt-3 space-y-2">
      {suggestions.slice(0, 3).map((suggestion, idx) => (
        <motion.button
          key={suggestion}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: idx * 0.05 }}
          onClick={() => onSelect(suggestion)}
          className="group flex items-center justify-between w-full border border-slate-200 dark:border-neutral-700 rounded-xl px-4 py-3 hover:bg-slate-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-all text-left"
        >
          <span className="text-sm text-slate-700 dark:text-neutral-300">{suggestion}</span>
          <ArrowRight
            size={16}
            className="text-slate-400 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-3"
          />
        </motion.button>
      ))}
    </div>
  );
}
