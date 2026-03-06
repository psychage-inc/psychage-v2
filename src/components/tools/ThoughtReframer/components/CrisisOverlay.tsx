import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Phone, MessageSquare, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CrisisOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisOverlay: React.FC<CrisisOverlayProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-rose-50 px-6 py-8 text-center border-b border-rose-100">
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={28} className="text-rose-600" />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
                You're not alone
              </h2>
              <p className="text-gray-600 leading-relaxed">
                It sounds like you may be going through something really difficult.
                There are people who want to help — right now.
              </p>
            </div>

            {/* Resources */}
            <div className="px-6 py-6 space-y-3">
              <a
                href="tel:988"
                className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors group"
              >
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                  <Phone size={20} className="text-teal-700" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">988 Suicide & Crisis Lifeline</p>
                  <p className="text-sm text-gray-500">Call or text 988 — available 24/7</p>
                </div>
              </a>

              <a
                href="sms:741741?body=HOME"
                className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors group"
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <MessageSquare size={20} className="text-indigo-700" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Crisis Text Line</p>
                  <p className="text-sm text-gray-500">Text HOME to 741741</p>
                </div>
              </a>

              <Link
                to="/crisis"
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <ExternalLink size={20} className="text-gray-700" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">More Crisis Resources</p>
                  <p className="text-sm text-gray-500">International helplines & safety planning</p>
                </div>
              </Link>
            </div>

            {/* Dismiss */}
            <div className="px-6 pb-6 pt-2 text-center">
              <button
                onClick={onClose}
                className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2 transition-colors"
              >
                I'd like to continue the exercise
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
