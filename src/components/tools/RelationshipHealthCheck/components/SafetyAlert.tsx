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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-surface rounded-2xl max-w-md w-full p-8 shadow-2xl border border-border"
          >
            <h2 className="font-display font-bold text-xl text-text-primary mb-3">
              You're not alone
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Some of your responses suggest you may be experiencing difficulty in your
              relationship. Whatever you're going through, support is available -- and
              reaching out is a sign of strength.
            </p>

            <div className="space-y-3 mb-6">
              <a
                href="tel:18007997233"
                className="flex items-center gap-3 p-4 rounded-xl bg-surface-hover border border-border hover:bg-surface-active transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-text-primary">
                    National DV Hotline
                  </p>
                  <p className="text-xs text-text-tertiary">
                    1-800-799-7233 (24/7, confidential)
                  </p>
                </div>
              </a>

              <a
                href="sms:88788?body=START"
                className="flex items-center gap-3 p-4 rounded-xl bg-surface-hover border border-border hover:bg-surface-active transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MessageCircle size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-text-primary">Text Support</p>
                  <p className="text-xs text-text-tertiary">
                    Text START to 88788
                  </p>
                </div>
              </a>

              <Link
                to="/crisis"
                className="flex items-center gap-3 p-4 rounded-xl bg-surface-hover border border-border hover:bg-surface-active transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-surface-active flex items-center justify-center shrink-0">
                  <ExternalLink size={18} className="text-text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-text-primary">
                    More Crisis Resources
                  </p>
                  <p className="text-xs text-text-tertiary">
                    View all available support options
                  </p>
                </div>
              </Link>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full text-text-tertiary"
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
  <div className="bg-surface border border-border rounded-2xl p-4 mb-6">
    <p className="text-sm text-text-secondary">
      <strong className="text-text-primary">Support is available.</strong> If you or someone you know is in an unsafe
      situation, call{' '}
      <a href="tel:18007997233" className="underline font-semibold text-primary">
        1-800-799-7233
      </a>{' '}
      or text START to{' '}
      <a href="sms:88788?body=START" className="underline font-semibold text-primary">
        88788
      </a>
      .
    </p>
  </div>
);
