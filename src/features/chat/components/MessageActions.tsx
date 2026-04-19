import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw, ThumbsUp, ThumbsDown } from 'lucide-react';

interface MessageActionsProps {
  content: string;
  isLastAssistant: boolean;
  onRetry?: () => void;
}

export default function MessageActions({ content, isLastAssistant, onRetry }: MessageActionsProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2 }}
      className="flex items-center gap-1 mt-2"
    >
      <button
        onClick={handleCopy}
        className="p-1.5 rounded-md text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:hover:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
        title={copied ? 'Copied!' : 'Copy'}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>

      {isLastAssistant && onRetry && (
        <button
          onClick={onRetry}
          className="p-1.5 rounded-md text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:hover:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
          title="Retry"
        >
          <RotateCcw size={16} />
        </button>
      )}

      <button
        onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
        className={`p-1.5 rounded-md transition-colors ${
          feedback === 'up'
            ? 'text-teal-600 dark:text-teal-400'
            : 'text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:hover:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-800'
        }`}
        title="Helpful"
      >
        <ThumbsUp size={16} />
      </button>

      <button
        onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
        className={`p-1.5 rounded-md transition-colors ${
          feedback === 'down'
            ? 'text-red-500 dark:text-red-400'
            : 'text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:hover:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-800'
        }`}
        title="Not helpful"
      >
        <ThumbsDown size={16} />
      </button>
    </motion.div>
  );
}
