import React from 'react';
import { Phone, MessageCircle, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CrisisOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CrisisOverlay: React.FC<CrisisOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-neutral-700 overflow-hidden">
        {/* Header */}
        <div className="bg-red-50 dark:bg-red-900/20 px-6 py-4 border-b border-red-100 dark:border-red-900/30">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-red-800 dark:text-red-200">You're Not Alone</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              aria-label="Close crisis overlay"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-red-700 dark:text-red-300 mt-1">
            If you are in crisis or having thoughts of self-harm, please reach out. Help is available right now.
          </p>
        </div>

        {/* Resources */}
        <div className="p-6 space-y-4">
          <a
            href="tel:988"
            className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="font-semibold text-red-800 dark:text-red-200">988 Suicide & Crisis Lifeline</p>
              <p className="text-sm text-red-600 dark:text-red-400">Call or text <strong>988</strong></p>
            </div>
          </a>

          <a
            href="sms:741741&body=HOME"
            className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-blue-800 dark:text-blue-200">Crisis Text Line</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">Text <strong>HOME</strong> to <strong>741741</strong></p>
            </div>
          </a>

          <Link
            to="/crisis"
            className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-slate-600 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Find local crisis resources
          </Link>
        </div>

        {/* Dismiss */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-sm font-medium text-slate-500 dark:text-neutral-400 bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors"
          >
            I've seen these resources — continue journaling
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrisisOverlay;
