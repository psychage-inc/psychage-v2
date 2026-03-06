import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowRight } from 'lucide-react';
import InteractiveCard from '@/components/ui/InteractiveCard';
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
            transition={{ delay: 0.3 }}
            className="h-full"
        >
            <InteractiveCard className="p-6 bg-white/5 border-white/10 backdrop-blur-md h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-text-primary flex items-center gap-2 text-lg">
                        <Compass size={20} className="text-purple-400" />
                        Symptom Navigator
                    </h3>
                    {hasData && (
                        <span className="text-xs text-text-tertiary">
                            {format(new Date(lastExplorationDate), 'MMM d, yyyy')}
                        </span>
                    )}
                </div>

                {hasData ? (
                    <div className="flex flex-col flex-grow">
                        <p className="text-sm text-text-secondary mb-3">
                            You&apos;ve completed{' '}
                            <span className="font-semibold text-text-primary">{totalExplorations}</span>{' '}
                            exploration{totalExplorations !== 1 ? 's' : ''}.
                        </p>
                        <p className="text-xs text-text-tertiary mb-4">
                            Self-reflection helps you understand patterns in your experiences over time.
                        </p>

                        <div className="mt-auto">
                            <Link to="/tools/symptom-navigator">
                                <Button variant="ghost" size="sm" className="text-xs">
                                    Explore Again <ArrowRight size={12} className="ml-1" />
                                </Button>
                            </Link>
                            <p className="text-[10px] text-text-tertiary mt-3 italic">
                                This is an educational tool, not a medical diagnosis.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-4 flex-grow">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-3">
                            <Compass size={24} className="text-purple-400" />
                        </div>
                        <p className="text-sm text-text-secondary mb-1">No explorations yet</p>
                        <p className="text-xs text-text-tertiary mb-4 max-w-[220px]">
                            Learn about patterns in your experiences with our educational tool.
                        </p>
                        <Link to="/tools/symptom-navigator">
                            <Button variant="outline" size="sm" className="text-xs">
                                Get Started <ArrowRight size={12} className="ml-1" />
                            </Button>
                        </Link>
                    </div>
                )}
            </InteractiveCard>
        </motion.div>
    );
};

export default NavigatorAwarenessCard;
