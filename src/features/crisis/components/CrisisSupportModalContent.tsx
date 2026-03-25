import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageSquare,
  ShieldAlert,
  AlertTriangle,
  Heart,
  X,
  ExternalLink,
  Wind,
  UserCheck,
} from 'lucide-react';
import type { Severity, CrisisSupportProps, CrisisLine } from '../types';
import { getResourcesForRegion } from '../resources/regions';

// ─── Grounding exercise shown for WATCH and URGENT ──────────────────────
const GroundingExercise: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: 'Breathe in slowly for 4 seconds', duration: 4 },
    { label: 'Hold for 4 seconds', duration: 4 },
    { label: 'Breathe out slowly for 6 seconds', duration: 6 },
  ];

  return (
    <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Wind size={18} className="text-teal-600 dark:text-teal-400" />
        <span className="font-semibold text-teal-800 dark:text-teal-200 text-sm">
          Grounding Exercise
        </span>
      </div>
      <p className="text-sm text-teal-700 dark:text-teal-300 mb-4">
        Let's take a moment together. Follow along at your own pace.
      </p>
      <div className="text-center py-3">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-lg font-semibold text-teal-900 dark:text-teal-100 mb-4"
        >
          {steps[step].label}
        </motion.div>
        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === step
                  ? 'bg-teal-600 dark:bg-teal-400'
                  : 'bg-teal-200 dark:bg-teal-700'
              }`}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Resource line card ─────────────────────────────────────────────────
const ResourceLineCard: React.FC<{ line: CrisisLine; prominent?: boolean }> = ({
  line,
  prominent,
}) => (
  <div
    className={`rounded-xl p-4 border ${
      prominent
        ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
    }`}
  >
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p
          className={`font-semibold text-sm ${
            prominent
              ? 'text-rose-900 dark:text-rose-200'
              : 'text-gray-900 dark:text-white'
          }`}
        >
          {line.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {line.available}
          {line.languages ? ` \u00b7 ${line.languages.join(', ')}` : ''}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {line.num && (
          <a
            href={`tel:${line.num.replace(/\s/g, '')}`}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
              prominent
                ? 'bg-rose-600 text-white hover:bg-rose-700'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Phone size={14} />
            {line.num}
          </a>
        )}
        {line.text && (
          <a
            href={`sms:${line.text.match(/\d+/)?.[0] ?? ''}&body=${line.text.match(/Text (\w+)/)?.[1] ?? 'HELLO'}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <MessageSquare size={14} />
            Text
          </a>
        )}
      </div>
    </div>
  </div>
);

// ─── Trusted contact consent flow ───────────────────────────────────────
const TrustedContactSection: React.FC<{
  onNotify?: (contact: string) => void;
}> = ({ onNotify }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [contact, setContact] = useState('');

  if (!onNotify) return null;

  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <UserCheck size={16} className="text-amber-600 dark:text-amber-400" />
        <span className="font-semibold text-amber-800 dark:text-amber-200 text-sm">
          Trusted Contact
        </span>
      </div>

      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="text-sm text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 underline underline-offset-2 transition-colors"
        >
          Notify a trusted person that you need support
        </button>
      ) : (
        <div className="space-y-3 mt-2">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            We will only send a notification with your explicit permission.
            Nothing is sent automatically.
          </p>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Name or phone number"
            className="w-full px-3 py-2 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (contact.trim()) onNotify(contact.trim());
                setShowConfirm(false);
                setContact('');
              }}
              disabled={!contact.trim()}
              className="px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Confirm & Notify
            </button>
            <button
              onClick={() => {
                setShowConfirm(false);
                setContact('');
              }}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Severity-specific headers ──────────────────────────────────────────
const SEVERITY_CONFIG: Record<
  Severity,
  {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    accent: string;
    bg: string;
    border: string;
  }
> = {
  WATCH: {
    icon: <Heart size={28} className="text-amber-500" />,
    title: 'We noticed something',
    subtitle:
      "Your recent responses suggest you might be going through a tough time. That's okay \u2014 checking in is a sign of strength.",
    accent: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/20',
    border: 'border-amber-200 dark:border-amber-800',
  },
  URGENT: {
    icon: <AlertTriangle size={28} className="text-orange-500" />,
    title: "You don't have to face this alone",
    subtitle:
      'We want to make sure you have the support you need right now. These resources are free, confidential, and available around the clock.',
    accent: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/20',
    border: 'border-orange-200 dark:border-orange-800',
  },
  CRISIS: {
    icon: <ShieldAlert size={28} className="text-rose-500" />,
    title: 'Please reach out right now',
    subtitle:
      "You matter, and someone is ready to listen. Please contact one of these free, confidential services \u2014 they're here for you 24/7.",
    accent: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/20',
    border: 'border-rose-200 dark:border-rose-800',
  },
};

// ─── Main modal content ─────────────────────────────────────────────────
const CrisisSupportModalContent: React.FC<CrisisSupportProps> = ({
  severity,
  region,
  onClose,
  onNotifyTrustedContact,
  safetyPlanUrl,
}) => {
  const config = SEVERITY_CONFIG[severity];
  const resources = getResourcesForRegion(region);
  const [showResources, setShowResources] = useState(severity !== 'WATCH');

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Crisis support \u2014 ${severity} level`}
        className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl ${config.bg} ${config.border} bg-white dark:bg-gray-950`}
      >
        {/* Severity accent bar */}
        <div
          className={`h-1.5 rounded-t-2xl ${
            severity === 'CRISIS'
              ? 'bg-rose-500'
              : severity === 'URGENT'
                ? 'bg-orange-500'
                : 'bg-amber-500'
          }`}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close crisis support dialog"
        >
          <X size={18} />
        </button>

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="text-center pt-2">
            <div className="flex justify-center mb-3">{config.icon}</div>
            <h2
              className={`text-xl font-bold text-gray-900 dark:text-white mb-2`}
            >
              {config.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm mx-auto leading-relaxed">
              {config.subtitle}
            </p>
          </div>

          {/* ─── WATCH: grounding first, resources behind toggle ──── */}
          {severity === 'WATCH' && (
            <>
              <GroundingExercise />
              {!showResources ? (
                <button
                  onClick={() => setShowResources(true)}
                  className="w-full py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  View support options
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Support Resources \u2014 {resources.name}{' '}
                    {resources.flag}
                  </p>
                  {resources.lines.map((line, i) => (
                    <ResourceLineCard key={i} line={line} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* ─── URGENT: grounding + resources + trusted contact ──── */}
          {severity === 'URGENT' && (
            <>
              <GroundingExercise />
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Support Resources \u2014 {resources.name}{' '}
                  {resources.flag}
                </p>
                {resources.lines.map((line, i) => (
                  <ResourceLineCard key={i} line={line} prominent={i === 0} />
                ))}
              </div>
              <TrustedContactSection onNotify={onNotifyTrustedContact} />
            </>
          )}

          {/* ─── CRISIS: prominent resources + CTAs + consent ──────── */}
          {severity === 'CRISIS' && (
            <>
              {/* Primary CTA */}
              {resources.lines[0]?.num && (
                <a
                  href={`tel:${resources.lines[0].num.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-rose-600 text-white text-lg font-bold shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-colors"
                >
                  <Phone size={22} />
                  Call {resources.lines[0].num}
                </a>
              )}

              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  All Resources \u2014 {resources.name}{' '}
                  {resources.flag}
                </p>
                {resources.lines.map((line, i) => (
                  <ResourceLineCard key={i} line={line} prominent={i === 0} />
                ))}
                {/* Emergency services */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                  <span className="text-red-600 dark:text-red-400 font-bold text-lg">
                    {resources.emergency}
                  </span>
                  <span className="text-sm text-red-700 dark:text-red-300">
                    Emergency Services
                  </span>
                </div>
              </div>

              <TrustedContactSection onNotify={onNotifyTrustedContact} />
            </>
          )}

          {/* Safety plan link (all severities) */}
          {safetyPlanUrl && (
            <a
              href={safetyPlanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <ExternalLink size={14} />
              Download Safety Plan Template
            </a>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-center text-gray-400 dark:text-gray-500 leading-relaxed">
            This is a wellness check-in, not a clinical assessment. All
            resources listed are free and confidential. In a medical emergency,
            call {resources.emergency}.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CrisisSupportModalContent;
