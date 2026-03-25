import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

interface SafetyAlertProps {
  severity: 'warning' | 'critical';
  visible: boolean;
  onDismiss: () => void;
}

export const SafetyAlert: React.FC<SafetyAlertProps> = ({
  visible,
  onDismiss,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
          >
            <h2 className="font-display font-bold text-xl text-gray-900 mb-3">
              You're not alone
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Some of your responses suggest you may be experiencing difficulty in your
              relationship. Whatever you're going through, support is available — and
              reaching out is a sign of strength.
            </p>

            <div className="space-y-3 mb-6">
              <a
                href="tel:18007997233"
                className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 border border-purple-100 hover:bg-purple-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">
                    National DV Hotline
                  </p>
                  <p className="text-xs text-gray-500">
                    1-800-799-7233 (24/7, confidential)
                  </p>
                </div>
              </a>

              <a
                href="sms:88788?body=START"
                className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <MessageCircle size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">Text Support</p>
                  <p className="text-xs text-gray-500">
                    Text START to 88788
                  </p>
                </div>
              </a>

              <Link
                to="/crisis"
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <ExternalLink size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">
                    More Crisis Resources
                  </p>
                  <p className="text-xs text-gray-500">
                    View all available support options
                  </p>
                </div>
              </Link>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full text-gray-400"
              onClick={onDismiss}
            >
              I'd like to continue viewing my results
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/** Persistent banner shown after SafetyAlert is dismissed */
export const SafetyBanner: React.FC = () => (
  <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-6">
    <p className="text-sm text-purple-800">
      <strong>Support is available.</strong> If you or someone you know is in an unsafe
      situation, call{' '}
      <a href="tel:18007997233" className="underline font-bold">
        1-800-799-7233
      </a>{' '}
      or text START to{' '}
      <a href="sms:88788?body=START" className="underline font-bold">
        88788
      </a>
      .
    </p>
  </div>
);
