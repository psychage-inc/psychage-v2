import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { alertService, type WellnessAlert } from '@/services/alertService';

const DISMISSED_KEY = 'psychage_dismissed_alerts';

interface DismissedEntry {
    id: string;
    at: number;
}

function getDismissed(): DismissedEntry[] {
    try {
        const stored = localStorage.getItem(DISMISSED_KEY);
        if (!stored) return [];
        const entries: DismissedEntry[] = JSON.parse(stored);
        // Filter out entries older than 24 hours
        const cutoff = Date.now() - 24 * 60 * 60 * 1000;
        return entries.filter(e => e.at > cutoff);
    } catch {
        return [];
    }
}

function saveDismissed(entries: DismissedEntry[]) {
    localStorage.setItem(DISMISSED_KEY, JSON.stringify(entries));
}

const WellnessAlertBanner: React.FC = () => {
    const { user } = useAuth();
    const [alerts, setAlerts] = useState<WellnessAlert[]>([]);
    const [dismissed, setDismissedState] = useState<DismissedEntry[]>(getDismissed);

    useEffect(() => {
        if (!user) return;
        alertService.getDashboardAlerts(user.id).then(results => {
            setAlerts(results);
        }).catch(console.error);
    }, [user]);

    const handleDismiss = useCallback((alertId: string) => {
        const updated = [...dismissed, { id: alertId, at: Date.now() }];
        setDismissedState(updated);
        saveDismissed(updated);
    }, [dismissed]);

    const dismissedIds = new Set(dismissed.map(d => d.id));
    const visibleAlerts = alerts.filter(a => !dismissedIds.has(a.id));

    if (visibleAlerts.length === 0) return null;

    return (
        <div className="space-y-3 md:col-span-12">
            <AnimatePresence>
                {visibleAlerts.map(alert => (
                    <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="rounded-xl border bg-amber-50 dark:bg-amber-900/15 border-amber-200/60 dark:border-amber-800/40 p-4"
                    >
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg shrink-0 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                                <Heart size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                                    {alert.message || 'We noticed some changes in your patterns. Remember, small steps matter.'}
                                </p>
                                <div className="flex items-center gap-3 mt-3">
                                    <button
                                        onClick={() => handleDismiss(alert.id)}
                                        className="text-xs font-medium text-amber-600/80 dark:text-amber-400/80 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                                    >
                                        I'm okay
                                    </button>
                                    <Link
                                        to={alert.actionPath || '/crisis'}
                                        className="text-xs font-medium text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 transition-colors flex items-center gap-1"
                                    >
                                        Explore support <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDismiss(alert.id)}
                                className="p-1 rounded-md hover:bg-amber-200/50 dark:hover:bg-amber-800/30 text-amber-500/60 dark:text-amber-500/40 transition-colors shrink-0"
                                aria-label={`Dismiss alert`}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default WellnessAlertBanner;
