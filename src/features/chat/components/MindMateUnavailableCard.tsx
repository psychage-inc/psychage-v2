import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MindMateUnavailableCardProps {
  className?: string;
}

export default function MindMateUnavailableCard({
  className,
}: MindMateUnavailableCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-900/20 p-5',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-500 flex items-center justify-center"
          aria-hidden="true"
        >
          <Info size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold text-sm text-amber-900 dark:text-amber-100">
            MindMate is temporarily unavailable
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-amber-900/80 dark:text-amber-100/80">
            Our chat assistant is having trouble right now. We&apos;ve been
            notified and are working on it. In the meantime, you can explore
            articles on mental health topics or take the Symptom Navigator to
            understand what you&apos;re experiencing.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/learn"
              className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
            >
              Browse articles
            </Link>
            <Link
              to="/tools/symptom-navigator"
              className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-amber-900 dark:text-amber-100 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-colors"
            >
              Use Symptom Navigator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
