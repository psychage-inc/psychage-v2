import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Calendar, BrainCircuit, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { format } from 'date-fns';

interface ActivityItem {
    type: 'assessment' | 'appointment';
    title: string;
    date: string;
}

interface RecentActivityCardProps {
    activity: ActivityItem[];
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ activity }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.35 }}
            className="h-full"
        >
            <div className="p-5 h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md flex flex-col hover:border-white/[0.12] transition-colors duration-200">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center">
                        <Activity size={14} className="text-rose-400" />
                    </div>
                    <span className="text-xs font-medium text-text-secondary tracking-wide uppercase">Activity</span>
                </div>

                {activity.length > 0 ? (
                    <div className="space-y-1 flex-grow">
                        {activity.slice(0, 3).map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 group p-3 rounded-xl hover:bg-white/[0.04] transition-colors cursor-default min-h-[48px]"
                            >
                                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-text-tertiary shrink-0 group-hover:text-primary group-hover:border-primary/20 transition-colors">
                                    {item.type === 'assessment' ? <BrainCircuit size={14} /> : <Calendar size={14} />}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <p className="font-medium text-text-primary text-[13px] group-hover:text-primary transition-colors truncate">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-text-tertiary/60">
                                        {item.date ? format(new Date(item.date), 'MMM d, h:mm a') : ''}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-5 flex flex-col items-center justify-center flex-grow border border-dashed border-white/[0.06] rounded-xl">
                        <p className="text-sm text-text-tertiary/70">No recent activity</p>
                        <p className="text-xs text-text-tertiary/50 mt-0.5">Your actions will appear here.</p>
                    </div>
                )}

                <Link to="/dashboard/history" className="mt-3">
                    <Button variant="ghost" className="w-full text-xs text-text-tertiary hover:text-primary">
                        View All <ArrowRight size={12} className="ml-1" />
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
};

export default RecentActivityCard;
