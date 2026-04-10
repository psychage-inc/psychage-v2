/**
 * Crisis Alert — Shown when crisis keywords are detected in free-text input.
 * NON-NEGOTIABLE: This component must always be rendered when crisis content is detected.
 */

import { motion } from 'framer-motion';
import { Phone, MessageSquare, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CRISIS_RESOURCES } from '@/lib/sleep/constants';

interface CrisisAlertProps {
  className?: string;
  onDismiss?: () => void;
}

const CrisisAlert: React.FC<CrisisAlertProps> = ({ className, onDismiss }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'rounded-2xl border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/30 p-6',
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <h3 className="text-lg font-bold text-red-800 dark:text-red-200 mb-2">
        {CRISIS_RESOURCES.title}
      </h3>
      <p className="text-sm text-red-700 dark:text-red-300 mb-4">
        It sounds like you may be going through a difficult time. You are not
        alone, and help is available right now.
      </p>

      <div className="space-y-3">
        {CRISIS_RESOURCES.resources.map((resource) => (
          <div
            key={resource.name}
            className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 border border-red-100 dark:border-red-800"
          >
            {resource.contact.startsWith('http') ? (
              <ExternalLink
                size={18}
                className="text-red-500 flex-shrink-0"
              />
            ) : resource.contact.includes('text') ||
              resource.contact.includes('Text') ? (
              <MessageSquare
                size={18}
                className="text-red-500 flex-shrink-0"
              />
            ) : (
              <Phone size={18} className="text-red-500 flex-shrink-0" />
            )}
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">
                {resource.name}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {resource.contact} &middot; {resource.available}
              </div>
            </div>
          </div>
        ))}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="mt-4 text-xs text-red-600 dark:text-red-400 hover:underline"
        >
          I understand, continue
        </button>
      )}
    </motion.div>
  );
};

export default CrisisAlert;
