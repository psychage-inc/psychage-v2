import React from 'react';
import UserSidebar from './UserSidebar';
import { Card } from '@/components/ui/Card';
// Actually ScoreHistoryPage might be a default export. Let's check imports.
// If it's a default export, I can import it as ScoreHistoryPage. 
// But ScoreHistoryPage is a full page with its own layout (maybe). 
// I should probably reuse the chart component if possible, or just render the page content.
// For now, let's create a wrapper that renders the existing functionality but within the dashboard layout.
import { BrainCircuit, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

// Re-using the logic would be best, but for now I'll create a simple view that links to the full tool or re-implements a simple list.
// Actually, the user asked for "AssessmentHistory.tsx".
// Let's make a simple list view for now that links to the full visualization.

const UserAssessmentHistory: React.FC = () => {
    // Mock history data - in real app would come from context/store
    const history = [
        { id: 1, date: 'Oct 24, 2024', score: 82, status: 'Stable', level: 'Good' },
        { id: 2, date: 'Oct 10, 2024', score: 78, status: 'Improving', level: 'Moderate' },
        { id: 3, date: 'Sep 24, 2024', score: 75, status: 'Baseline', level: 'Moderate' },
    ];

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
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-text-primary">Clarity Score Log</h2>
                                    <p className="text-text-secondary">Track your mental health trends over time.</p>
                                </div>
                                <Link to="/tools/clarity-score">
                                    <Button>New Assessment</Button>
                                </Link>
                            </div>

                            {/* Upsell / Link to full visualization */}
                            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                        <BrainCircuit size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-primary">View Detailed Analytics</h3>
                                        <p className="text-sm text-text-secondary">Explore charts, insights, and personalized recommendations.</p>
                                    </div>
                                </div>
                                <Link to="/tools/clarity-score/history">
                                    <Button variant="outline" rightIcon={<ArrowRight size={16} />}>
                                        View Charts
                                    </Button>
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="py-4 font-bold text-text-secondary text-sm">Date</th>
                                            <th className="py-4 font-bold text-text-secondary text-sm">Score</th>
                                            <th className="py-4 font-bold text-text-secondary text-sm">Level</th>
                                            <th className="py-4 font-bold text-text-secondary text-sm">Status</th>
                                            <th className="py-4 font-bold text-text-secondary text-sm text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.map((item) => (
                                            <tr key={item.id} className="border-b border-border last:border-0 hover:bg-surface-hover transition-colors">
                                                <td className="py-4 text-text-primary font-medium">{item.date}</td>
                                                <td className="py-4">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                                                        {item.score}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-text-secondary">{item.level}</td>
                                                <td className="py-4 text-text-secondary">{item.status}</td>
                                                <td className="py-4 text-right">
                                                    <Button variant="ghost" size="sm">View Details</Button>
                                                </td>
                                            </tr>
                                        ))}
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
