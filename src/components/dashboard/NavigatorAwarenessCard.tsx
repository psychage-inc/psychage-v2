import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { format } from 'date-fns';

interface NavigatorAwarenessCardProps {
    totalExplorations: number;
    lastExplorationDate: string | null;
}

const NavigatorAwarenessCard: React.FC<NavigatorAwarenessCardProps> = ({
    totalExplorations,
    lastExplorationDate,
}) => {
    const hasData = totalExplorations > 0 && lastExplorationDate;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            className="h-full"
        >
            <div className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md h-full flex flex-col hover:border-white/[0.12] transition-colors duration-200">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <Compass size={14} className="text-purple-400" />
                        </div>
                        <span className="text-xs font-medium text-text-secondary tracking-wide uppercase">Navigator</span>
                    </div>
                    {hasData && (
                        <span className="text-xs text-text-tertiary/60">
                            {format(new Date(lastExplorationDate), 'MMM d')}
                        </span>
                    )}
                </div>

                {hasData ? (
                    <div className="flex flex-col flex-grow">
                        <p className="text-sm text-text-secondary mb-2 leading-relaxed">
                            <span className="font-semibold text-text-primary tabular-nums">{totalExplorations}</span>{' '}
                            exploration{totalExplorations !== 1 ? 's' : ''} completed.
                        </p>
                        <p className="text-xs text-text-tertiary/70 mb-4 leading-relaxed">
                            Self-reflection helps you understand patterns over time.
                        </p>

                        <div className="mt-auto">
                            <Link to="/tools/symptom-navigator">
                                <Button variant="ghost" size="sm" className="text-xs">
                                    Explore Again <ArrowRight size={12} className="ml-1" />
                                </Button>
                            </Link>
                            <p className="text-[11px] text-text-tertiary/50 mt-2.5 italic">
                                Educational tool, not a medical diagnosis.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-4 flex-grow">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
                            <Compass size={20} className="text-purple-400" />
                        </div>
                        <p className="text-sm text-text-secondary mb-1">No explorations yet</p>
                        <p className="text-xs text-text-tertiary/70 mb-4 max-w-[200px] leading-relaxed">
                            Learn about patterns in your experiences.
                        </p>
                        <Link to="/tools/symptom-navigator">
                            <Button variant="outline" size="sm" className="text-xs">
                                Get Started <ArrowRight size={12} className="ml-1" />
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default NavigatorAwarenessCard;
