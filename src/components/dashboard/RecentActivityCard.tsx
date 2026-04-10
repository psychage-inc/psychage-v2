import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Calendar, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { formatDistanceToNow, format } from 'date-fns';

interface ActivityItem {
    type: 'assessment' | 'appointment';
    title: string;
    date: string;
}

interface RecentActivityCardProps {
    activity: ActivityItem[];
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ activity }) => {
    const reduced = useReducedMotion();
    const items = activity.slice(0, 5);

    return (
        <motion.div
            initial={reduced ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
            className="h-full"
        >
            <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
                            <Activity size={16} className="text-sky-500" />
                        </div>
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Recent Activity</h3>
                    </div>
                    <Link
                        to="/dashboard/history"
                        className="text-xs text-gray-400 dark:text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1"
                    >
                        View All <ArrowRight size={12} />
                    </Link>
                </div>

                {items.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center py-4">
                        <Activity size={28} className="text-gray-300 dark:text-gray-600 mb-2" />
                        <p className="text-xs text-gray-400 dark:text-gray-500">Your activity will show up here as you use the platform.</p>
                    </div>
                ) : (
                    <div className="relative flex-grow">
                        {/* Timeline line */}
                        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-800" />

                        <div className="flex flex-col gap-3">
                            {items.map((item, idx) => {
                                let timeLabel: string;
                                try {
                                    timeLabel = formatDistanceToNow(new Date(item.date), { addSuffix: true });
                                } catch {
                                    timeLabel = format(new Date(item.date), 'MMM d');
                                }

                                return (
                                    <motion.div
                                        key={`${item.type}-${item.date}-${idx}`}
                                        initial={reduced ? {} : { opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.05 * idx }}
                                        className="flex items-start gap-3 relative pl-6"
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute left-[7px] top-1.5 w-[9px] h-[9px] rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-900 z-10" />
                                        <div className="flex-grow min-w-0">
                                            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{item.title}</p>
                                            <p className="text-[11px] text-gray-400 dark:text-gray-500">{timeLabel}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default RecentActivityCard;
