import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Honest disclosure banner for admin sections whose downstream wiring is not
 * yet complete (tracked in BACKEND_REQUIRED.md). It does NOT hide or disable a
 * feature — it tells the admin exactly what will and won't happen, so client
 * testers don't mistake "saved" for "live". See the audit's "degrade gracefully
 * until it exists" rule.
 *
 * variant:
 *  - 'unavailable' (red): the section cannot function against the live schema.
 *  - 'not-reflected' (amber): edits persist but do not yet reach the live app.
 */
const NotWiredNotice: React.FC<{ variant?: 'unavailable' | 'not-reflected'; children: React.ReactNode }> = ({
  variant = 'not-reflected',
  children,
}) => {
  const unavailable = variant === 'unavailable';
  const cls = unavailable
    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
    : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300';
  return (
    <div className={`mb-4 px-4 py-3 rounded-xl border flex items-start gap-3 text-sm ${cls}`} role="status">
      <AlertTriangle size={18} className="mt-0.5 shrink-0" />
      <p>{children}</p>
    </div>
  );
};

export default NotWiredNotice;
