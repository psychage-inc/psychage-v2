import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { format } from 'date-fns';

interface NavigatorAwarenessCardProps {
    totalExplorations: number;
    lastExplorationDate: string | null;
}

const NavigatorAwarenessCard: React.FC<NavigatorAwarenessCardProps> = ({ totalExplorations, lastExplorationDate }) => {
    const reduced = useReducedMotion();
    const hasData = totalExplorations > 0;

    return (
        <motion.div
            initial={reduced ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="h-full"
        >
            <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm p-5 flex flex-col">
                <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <Compass size={16} className="text-purple-500" />
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Symptom Navigator</h3>
                </div>

                {hasData ? (
                    <div className="flex-grow">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                            <span className="font-semibold text-gray-900 dark:text-white">{totalExplorations}</span>{' '}
                            {totalExplorations === 1 ? 'exploration' : 'explorations'} completed
                        </p>
                        {lastExplorationDate && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                                Last explored {format(new Date(lastExplorationDate), 'MMM d, yyyy')}
                            </p>
                        )}
                        <Link to="/tools/symptom-navigator">
                            <Button variant="outline" size="sm" className="rounded-lg text-xs" rightIcon={<ArrowRight size={12} />}>
                                Explore Again
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center py-2">
                        {/* Warm compass illustration */}
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-3 text-purple-300 dark:text-purple-700">
                            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
                            <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="24" cy="24" r="2" fill="currentColor" />
                            <line x1="24" y1="4" x2="24" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="24" y1="36" x2="24" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="4" y1="24" x2="12" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="36" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 max-w-[200px]">
                            Understand your patterns with the Symptom Navigator.
                        </p>
                        <Link to="/tools/symptom-navigator">
                            <Button variant="primary" size="sm" className="rounded-lg text-xs" rightIcon={<ArrowRight size={12} />}>
                                Get Started
                            </Button>
                        </Link>
                    </div>
                )}

                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-auto pt-3 border-t border-gray-100 dark:border-gray-800/60">
                    Educational tool — not a medical diagnosis
                </p>
            </div>
        </motion.div>
    );
};

export default NavigatorAwarenessCard;
