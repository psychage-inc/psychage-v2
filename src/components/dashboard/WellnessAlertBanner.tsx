import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, BarChart2, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { alertService, type WellnessAlert } from '@/services/alertService';

const DISMISSED_KEY = 'psychage_dismissed_alerts';

function getDismissed(): Set<string> {
    try {
        const stored = localStorage.getItem(DISMISSED_KEY);
        return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
        return new Set();
    }
}

function setDismissed(dismissed: Set<string>) {
    localStorage.setItem(DISMISSED_KEY, JSON.stringify([...dismissed]));
}

const alertIcons: Record<string, React.ReactNode> = {
    mood_decline: <TrendingDown size={18} />,
    clarity_decline: <BarChart2 size={18} />,
};

const alertColors: Record<string, { bg: string; border: string; icon: string; text: string }> = {
    info: {
        bg: 'bg-blue-50 dark:bg-blue-900/15',
        border: 'border-blue-200 dark:border-blue-800/50',
        icon: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-800 dark:text-blue-200',
    },
    warning: {
        bg: 'bg-amber-50 dark:bg-amber-900/15',
        border: 'border-amber-200 dark:border-amber-800/50',
        icon: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-800 dark:text-amber-200',
    },
};

const WellnessAlertBanner: React.FC = () => {
    const { user } = useAuth();
    const [alerts, setAlerts] = useState<WellnessAlert[]>([]);
    const [dismissed, setDismissedState] = useState<Set<string>>(getDismissed);

    useEffect(() => {
        if (!user) return;

        alertService.getDashboardAlerts(user.id).then(results => {
            setAlerts(results);
        }).catch(console.error);
    }, [user]);

    const handleDismiss = useCallback((alertId: string) => {
        const newDismissed = new Set(dismissed);
        newDismissed.add(alertId);
        setDismissedState(newDismissed);
        setDismissed(newDismissed);
    }, [dismissed]);

    const visibleAlerts = alerts.filter(a => !dismissed.has(a.id));

    if (visibleAlerts.length === 0) return null;

    return (
        <div className="space-y-3">
            <AnimatePresence>
                {visibleAlerts.map(alert => {
                    const colors = alertColors[alert.severity] || alertColors.info;
                    const icon = alertIcons[alert.type];

                    return (
                        <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            className={`rounded-xl border ${colors.bg} ${colors.border} p-4`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg shrink-0 ${colors.icon}`}>
                                    {icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-semibold text-sm ${colors.text}`}>
                                        {alert.title}
                                    </h3>
                                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                                        {alert.message}
                                    </p>
                                    {alert.actionPath && (
                                        <Link
                                            to={alert.actionPath}
                                            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover mt-2 transition-colors"
                                        >
                                            {alert.actionLabel || 'View'}
                                            <ChevronRight size={12} />
                                        </Link>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleDismiss(alert.id)}
                                    className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-text-tertiary transition-colors shrink-0"
                                    aria-label={`Dismiss ${alert.title}`}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default WellnessAlertBanner;
