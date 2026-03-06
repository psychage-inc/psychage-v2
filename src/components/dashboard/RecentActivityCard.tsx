import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, BrainCircuit, ArrowRight } from 'lucide-react';
import InteractiveCard from '@/components/ui/InteractiveCard';
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
            transition={{ delay: 0.35 }}
            className="h-full"
        >
            <InteractiveCard className="p-6 h-full bg-white/5 border-white/10 backdrop-blur-md flex flex-col">
                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2 text-lg">
                    <TrendingUp size={20} className="text-accent-rose" />
                    Recent Activity
                </h3>

                {activity.length > 0 ? (
                    <div className="space-y-3 flex-grow">
                        {activity.slice(0, 3).map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 text-sm group p-2.5 rounded-2xl hover:bg-white/5 transition-colors cursor-default"
                            >
                                <div className="w-9 h-9 rounded-full bg-surface-hover border border-white/10 flex items-center justify-center text-text-secondary shrink-0 group-hover:text-primary group-hover:border-primary/30 transition-colors">
                                    {item.type === 'assessment' ? <BrainCircuit size={14} /> : <Calendar size={14} />}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <p className="font-medium text-text-primary text-sm group-hover:text-primary transition-colors truncate">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-text-tertiary">
                                        {item.date ? format(new Date(item.date), 'MMM d, h:mm a') : ''}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6 text-text-tertiary text-sm flex flex-col items-center justify-center flex-grow border border-dashed border-white/10 rounded-2xl bg-black/5">
                        <p>No recent activity.</p>
                        <p className="text-xs mt-1">Time to get started!</p>
                    </div>
                )}

                <Link to="/dashboard/history" className="mt-4">
                    <Button variant="ghost" className="w-full text-xs text-text-secondary hover:text-primary">
                        View All Activity <ArrowRight size={12} className="ml-1" />
                    </Button>
                </Link>
            </InteractiveCard>
        </motion.div>
    );
};

export default RecentActivityCard;
