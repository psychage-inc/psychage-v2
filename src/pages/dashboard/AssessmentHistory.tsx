import React, { useEffect, useState } from 'react';
import UserSidebar from './UserSidebar';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { BrainCircuit, ArrowRight, Activity, Calendar, TrendingUp, X, Brain, Moon, Heart, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import MeshGradient from '@/components/ui/MeshGradient';
import { motion, AnimatePresence } from 'framer-motion';

interface AssessmentHistoryItem {
    id?: string;
    date: string;
    score: number;
    status?: string;
    breakdown?: {
        anxiety?: number;
        depression?: number;
        stress?: number;
        sleep?: number;
    };
    recommendations?: string[];
}

const UserAssessmentHistory: React.FC = () => {
    const [history, setHistory] = useState<AssessmentHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAssessment, setSelectedAssessment] = useState<AssessmentHistoryItem | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.clarityScore.getHistory();
                if (response.success && response.data) {
                    setHistory(response.data as unknown as AssessmentHistoryItem[]);
                }
            } catch (error) {
                console.error("Failed to fetch assessment history", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
        if (score >= 60) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
        return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    };

    const getLevel = (score: number) => {
        if (score >= 80) return 'Optimal';
        if (score >= 60) return 'Moderate';
        return 'Needs Attention';
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6 relative">
            <SEO title="Assessment History | Psychage" />

            {/* Background Mesh */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <MeshGradient className="opacity-[0.05]" />
            </div>

            <div className="container mx-auto max-w-[1200px] relative z-10">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8 px-2">Assessment History</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <UserSidebar />
                    </div>

                    <div className="lg:col-span-3">
                        <InteractiveCard className="p-8 bg-surface/30 backdrop-blur-md border-white/5">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                                <div>
                                    <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                                        <TrendingUp className="text-primary" size={20} />
                                        Clarity Score Log
                                    </h2>
                                    <p className="text-text-secondary mt-1">Track your mental health trends over time.</p>
                                </div>
                                <Link to="/tools/clarity-score">
                                    <Button leftIcon={<Activity size={18} />}>New Assessment</Button>
                                </Link>
                            </div>

                            {/* Upsell / Link to full visualization */}
                            <div className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0 shadow-inner border border-primary/10">
                                        <BrainCircuit size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-primary text-lg">View Detailed Analytics</h3>
                                        <p className="text-sm text-text-secondary">Explore charts, insights, and personalized recommendations.</p>
                                    </div>
                                </div>
                                <Link to="/tools/clarity-score/history" className="w-full md:w-auto relative z-10">
                                    <Button variant="outline" rightIcon={<ArrowRight size={16} />} className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary/50 text-primary">
                                        View Charts
                                    </Button>
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[600px]">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="py-4 font-bold text-text-secondary text-sm pl-4">Date</th>
                                            <th className="py-4 font-bold text-text-secondary text-sm text-center">Score</th>
                                            <th className="py-4 font-bold text-text-secondary text-sm">Level</th>
                                            <th className="py-4 font-bold text-text-secondary text-sm">Status</th>
                                            <th className="py-4 font-bold text-text-secondary text-sm text-right pr-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {isLoading ? (
                                            [1, 2, 3].map(i => (
                                                <tr key={i}>
                                                    <td className="py-4 pl-4"><div className="h-4 bg-white/5 rounded w-24 animate-pulse" /></td>
                                                    <td className="py-4 text-center"><div className="h-8 w-8 bg-white/5 rounded-full mx-auto animate-pulse" /></td>
                                                    <td className="py-4"><div className="h-4 bg-white/5 rounded w-20 animate-pulse" /></td>
                                                    <td className="py-4"><div className="h-4 bg-white/5 rounded w-16 animate-pulse" /></td>
                                                    <td className="py-4 text-right pr-4"><div className="h-8 bg-white/5 rounded w-24 ml-auto animate-pulse" /></td>
                                                </tr>
                                            ))
                                        ) : history.length > 0 ? (
                                            history.map((item) => (
                                                <tr key={item.id || item.date} className="hover:bg-white/5 transition-colors group">
                                                    <td className="py-4 pl-4 text-text-primary font-medium">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar size={14} className="text-primary/70" />
                                                            {item.date ? format(new Date(item.date), 'MMM d, yyyy') : 'Unknown'}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-center">
                                                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm border ${getScoreColor(item.score)}`}>
                                                            {item.score}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 text-text-secondary font-medium">{getLevel(item.score)}</td>
                                                    <td className="py-4 text-text-secondary">
                                                        <span className="px-2 py-1 rounded-md bg-white/5 text-xs border border-white/10">
                                                            {item.status || 'Completed'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 text-right pr-4">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary hover:text-primary"
                                                            onClick={() => setSelectedAssessment(item)}
                                                        >
                                                            Details <ArrowRight size={12} className="ml-1" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="py-16 text-center text-text-secondary">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <Activity className="text-white/10 mb-4" size={48} />
                                                        <p className="mb-4 text-lg font-medium">No assessment history found</p>
                                                        <Link to="/tools/clarity-score">
                                                            <Button>Take your first assessment</Button>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </InteractiveCard>
                    </div>
                </div>
            </div>

            {/* Assessment Detail Modal */}
            <AnimatePresence>
                {selectedAssessment && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedAssessment(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-surface rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-text-primary">Assessment Details</h3>
                                    <p className="text-text-secondary mt-1">
                                        {selectedAssessment.date ? format(new Date(selectedAssessment.date), 'MMMM d, yyyy') : 'Unknown date'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedAssessment(null)}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-text-secondary hover:text-text-primary"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Overall Score */}
                            <div className="text-center mb-8 p-6 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl border border-primary/20">
                                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl font-bold border-4 mb-3 ${getScoreColor(selectedAssessment.score)}`}>
                                    {selectedAssessment.score}
                                </div>
                                <p className="text-lg font-medium text-text-primary">{getLevel(selectedAssessment.score)}</p>
                                <p className="text-sm text-text-secondary mt-1">Overall Clarity Score</p>
                            </div>

                            {/* Score Breakdown */}
                            <div className="space-y-4 mb-8">
                                <h4 className="font-bold text-text-primary flex items-center gap-2">
                                    <TrendingUp size={16} className="text-primary" />
                                    Score Breakdown
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Anxiety', value: selectedAssessment.breakdown?.anxiety ?? Math.round(selectedAssessment.score * 0.9), icon: Brain, color: 'text-blue-400' },
                                        { label: 'Mood', value: selectedAssessment.breakdown?.depression ?? Math.round(selectedAssessment.score * 1.05), icon: Heart, color: 'text-rose-400' },
                                        { label: 'Stress', value: selectedAssessment.breakdown?.stress ?? Math.round(selectedAssessment.score * 0.95), icon: Zap, color: 'text-amber-400' },
                                        { label: 'Sleep', value: selectedAssessment.breakdown?.sleep ?? Math.round(selectedAssessment.score * 1.1), icon: Moon, color: 'text-indigo-400' },
                                    ].map((item) => (
                                        <div key={item.label} className="bg-white/5 rounded-xl p-4 border border-white/5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <item.icon size={14} className={item.color} />
                                                <span className="text-sm text-text-secondary">{item.label}</span>
                                            </div>
                                            <div className="flex items-end gap-2">
                                                <span className="text-2xl font-bold text-text-primary">{Math.min(100, Math.max(0, item.value))}</span>
                                                <span className="text-xs text-text-tertiary mb-1">/100</span>
                                            </div>
                                            <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${item.color.replace('text-', 'bg-')}`}
                                                    style={{ width: `${Math.min(100, Math.max(0, item.value))}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recommendations */}
                            <div className="space-y-3">
                                <h4 className="font-bold text-text-primary flex items-center gap-2">
                                    <BrainCircuit size={16} className="text-primary" />
                                    Recommendations
                                </h4>
                                <ul className="space-y-2">
                                    {(selectedAssessment.recommendations || [
                                        'Continue maintaining healthy sleep habits',
                                        'Practice mindfulness for 10 minutes daily',
                                        'Consider scheduling a check-in with a provider'
                                    ]).map((rec, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                            {rec}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <Button variant="outline" className="flex-1" onClick={() => setSelectedAssessment(null)}>
                                    Close
                                </Button>
                                <Link to="/tools/clarity-score" className="flex-1">
                                    <Button className="w-full">Take New Assessment</Button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserAssessmentHistory;
