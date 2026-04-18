import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ThinkingBlockProps {
  content: string;
}

export default function ThinkingBlock({ content }: ThinkingBlockProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
      >
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.15 }}
        >
          <ChevronRight size={14} />
        </motion.span>
        <span>{isOpen ? 'Thinking' : 'Thinking...'}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-1 text-sm text-slate-500 italic bg-slate-50 dark:bg-neutral-800/50 rounded-lg p-3">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
