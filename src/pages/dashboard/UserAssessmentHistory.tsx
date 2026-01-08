import React, { useEffect, useState } from 'react';
import UserSidebar from './UserSidebar';
import { Card } from '@/components/ui/Card';
import { BrainCircuit, ArrowRight, Activity, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { api } from '@/lib/api';
import { format } from 'date-fns';

const UserAssessmentHistory: React.FC = () => {
    const [history, setHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.clarityScore.getHistory();
                if (response.success && response.data) {
                    setHistory(response.data);
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
        if (score >= 80) return 'text-green-600 bg-green-100';
        if (score >= 60) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    const getLevel = (score: number) => {
        if (score >= 80) return 'Optimal';
        if (score >= 60) return 'Moderate';
        return 'Needs Attention';
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Assessment History | Psychage" />

            <div className="container mx-auto max-w-[1200px]">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8">Assessment History</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <UserSidebar />
                    </div>

                    <div className="lg:col-span-3">
                        <Card className="p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                                <div>
                                    <h2 className="text-xl font-bold text-text-primary">Clarity Score Log</h2>
                                    <p className="text-text-secondary">Track your mental health trends over time.</p>
                                </div>
                                <Link to="/tools/clarity-score">
                                    <Button leftIcon={<Activity size={18} />}>New Assessment</Button>
                                </Link>
                            </div>

                            {/* Upsell / Link to full visualization */}
                            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                        <BrainCircuit size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-primary">View Detailed Analytics</h3>
                                        <p className="text-sm text-text-secondary">Explore charts, insights, and personalized recommendations.</p>
                                    </div>
                                </div>
                                <Link to="/tools/clarity-score/history" className="w-full md:w-auto">
                                    <Button variant="outline" rightIcon={<ArrowRight size={16} />} className="w-full">
                                        View Charts
                                    </Button>
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[600px]">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="py-4 font-bold text-text-secondary text-sm pl-4">Date</th>
                                            <th className="py-4 font-bold text-text-secondary text-sm text-center">Score</th>
                                            <th className="py-4 font-bold text-text-secondary text-sm">Level</th>
                                            <th className="py-4 font-bold text-text-secondary text-sm">Status</th>
                                            <th className="py-4 font-bold text-text-secondary text-sm text-right pr-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading ? (
                                            [1, 2, 3].map(i => (
                                                <tr key={i} className="border-b border-border">
                                                    <td className="py-4 pl-4"><div className="h-4 bg-surface-hover rounded w-24 animate-pulse" /></td>
                                                    <td className="py-4 text-center"><div className="h-8 w-8 bg-surface-hover rounded-full mx-auto animate-pulse" /></td>
                                                    <td className="py-4"><div className="h-4 bg-surface-hover rounded w-20 animate-pulse" /></td>
                                                    <td className="py-4"><div className="h-4 bg-surface-hover rounded w-16 animate-pulse" /></td>
                                                    <td className="py-4 text-right pr-4"><div className="h-8 bg-surface-hover rounded w-24 ml-auto animate-pulse" /></td>
                                                </tr>
                                            ))
                                        ) : history.length > 0 ? (
                                            history.map((item) => (
                                                <tr key={item.id || item.date} className="border-b border-border last:border-0 hover:bg-surface-hover transition-colors group">
                                                    <td className="py-4 pl-4 text-text-primary font-medium flex items-center gap-2">
                                                        <Calendar size={14} className="text-text-tertiary" />
                                                        {item.date ? format(new Date(item.date), 'MMM d, yyyy') : 'Unknown'}
                                                    </td>
                                                    <td className="py-4 text-center">
                                                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${getScoreColor(item.score)}`}>
                                                            {item.score}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 text-text-secondary font-medium">{getLevel(item.score)}</td>
                                                    <td className="py-4 text-text-secondary">{item.status || 'Completed'}</td>
                                                    <td className="py-4 text-right pr-4">
                                                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">View Details</Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="py-12 text-center text-text-secondary">
                                                    No assessment history found. <Link to="/tools/clarity-score" className="text-primary hover:underline">Take your first assessment</Link>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAssessmentHistory;
