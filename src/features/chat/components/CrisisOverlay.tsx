import { motion } from 'framer-motion';
import { Phone, Globe, ArrowLeft } from 'lucide-react';
import { resolveCountry, getResourcesForCountry } from '../../../lib/crisis';

interface CrisisOverlayProps {
  isAutoTriggered?: boolean;
  onClose: () => void;
}

export default function CrisisOverlay({ isAutoTriggered, onClose }: CrisisOverlayProps) {
  // Resolve a region-correct crisis line instead of hardcoding US numbers.
  const crisis = getResourcesForCountry(resolveCountry());
  const hotline = crisis.all_resources.find((r) => r.phone);
  const callPhone = hotline?.phone ?? crisis.emergency_number;
  const callName = hotline?.name ?? 'Emergency services';

  return (
    <motion.div
      initial={isAutoTriggered ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={isAutoTriggered ? undefined : { duration: 0.2 }}
      className="fixed inset-0 z-[999] bg-white dark:bg-neutral-900 flex items-center justify-center p-6"
    >
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          You're Not Alone
        </h1>

        <p className="text-base text-slate-600 dark:text-neutral-400 mb-8 leading-relaxed">
          If you or someone you know is in crisis, please reach out for help right now.
        </p>

        <div className="space-y-3">
          {/* Region-resolved crisis line */}
          <a
            href={`tel:${callPhone.replace(/\s/g, '')}`}
            className="flex items-center gap-3 w-full px-5 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors text-left"
          >
            <Phone size={20} />
            <div>
              <p className="font-semibold text-sm">Call {callName}</p>
              <p className="text-teal-100 text-xs mt-0.5">{callPhone} · available 24/7</p>
            </div>
          </a>

          {/* International */}
          <a
            href="https://findahelpline.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full px-5 py-4 bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-900 dark:text-white rounded-xl transition-colors text-left"
          >
            <Globe size={20} />
            <div>
              <p className="font-semibold text-sm">Find a helpline in your country</p>
              <p className="text-slate-500 dark:text-neutral-400 text-xs mt-0.5">
                International crisis support directory
              </p>
            </div>
          </a>
        </div>

        {/* Return link */}
        <button
          onClick={onClose}
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:hover:text-neutral-400 dark:hover:text-neutral-300 transition-colors"
        >
          <ArrowLeft size={14} />
          Return to chat
        </button>
      </div>
    </motion.div>
  );
}
