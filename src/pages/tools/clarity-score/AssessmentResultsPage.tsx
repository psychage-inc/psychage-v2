import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, BarChart2, Calendar, RefreshCw, Share2, Download, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Display } from '@/components/ui/Typography';
import SEO from '@/components/SEO';

const STORAGE_KEY = 'psychage_clarity_progress';
const HISTORY_KEY = 'psychage_clarity_history';

const AssessmentResultsPage: React.FC = () => {
    const navigate = useNavigate();
    const [score, setScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Calculate score from storage
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.answers) {
                    // Logic to calculate score (Should ideally be in a shared util or service)
                    // Simplified for now based on previous implementation logic
                    const answersList = Object.values(parsed.answers) as number[];
                    const maxPossible = answersList.length * 3; // Assuming 0-3 scale
                    const total = answersList.reduce((a, b) => a + b, 0);
                    // Clarity is inverse of symptoms (100 - symptom%)
                    const clarityScore = Math.round(100 - ((total / maxPossible) * 100));

                    setScore(clarityScore);

                    // Save to history
                    const historyItem = {
                        date: new Date().toLocaleDateString(),
                        score: clarityScore,
                        id: Date.now().toString()
                    };

                    const existingHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
                    // Avoid duplicate save on refresh (naive check)
                    const last = existingHistory[0];
                    if (!last || last.date !== historyItem.date || last.score !== historyItem.score) {
                        // Only save if different or new day
                        const newHistory = [historyItem, ...existingHistory].slice(0, 10);
                        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
                    }
                }
            }
        } catch (e) {
            console.error("Error calculating results", e);
        } finally {
            setLoading(false);
        }
    }, []);

    const getRecommendation = (val: number) => {
        if (val >= 80) return {
            text: "Your mental clarity is high. Keep up your current wellness routines.",
            action: "Explore advanced mindfulness techniques in our Learn Hub.",
            link: "/learn",
            color: "text-success",
            bg: "bg-success/10"
        };
        if (val >= 50) return {
            text: "You're experiencing moderate stress. It might be helpful to talk to someone.",
            action: "Browse our directory to find a therapist who fits your needs.",
            link: "/find-care",
            color: "text-warning",
            bg: "bg-warning/10"
        };
        return {
            text: "Your clarity score suggests you may be overwhelmed. Professional support is recommended.",
            action: "Connect with a specialist immediately.",
            link: "/find-care",
            color: "text-error",
            bg: "bg-error/10"
        };
    };

    if (loading) return <div className="min-h-screen bg-background pt-32 text-center text-text-secondary">Generating Report...</div>;

    if (score === null && !loading) {
        return (
            <div className="min-h-screen bg-background pt-32 text-center px-6">
                <Display className="text-2xl mb-4">No results found</Display>
                <Button onClick={() => navigate('/tools/clarity-score')}>Take Assessment</Button>
            </div>
        );
    }

    const rec = getRecommendation(score!);

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Assessment Results | Psychage" />

            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-surface rounded-3xl overflow-hidden shadow-2xl shadow-shadow/10 border border-border mb-12"
                >
                    <div className="bg-text-primary text-background p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[url('/images/ui/noise.svg')] filter contrast-125 brightness-100" />

                        <div className="relative z-10">
                            <p className="text-text-secondary font-bold tracking-wider uppercase text-sm mb-4">Your Clarity Score</p>
                            <div className="text-8xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                                {score}
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-medium text-white">
                                <CheckCircle2 size={16} className="text-green-400" />
                                Assessment Complete
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                            {/* Analysis Column */}
                            <div>
                                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2 text-lg">
                                    <BarChart2 size={24} className="text-primary" />
                                    Analysis
                                </h3>
                                <p className="text-text-secondary leading-relaxed mb-6 text-lg">
                                    {rec.text}
                                </p>

                                {/* Mock Gauges */}
                                <div className="space-y-6 bg-surface-hover rounded-2xl p-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-medium text-text-secondary">Anxiety Indicators</span>
                                            <span className="font-bold text-text-primary">{score! > 70 ? 'Low' : 'Moderate'}</span>
                                        </div>
                                        <div className="h-2 bg-surface rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: score! > 70 ? '20%' : '50%' }}
                                                className={`h-full ${score! > 70 ? 'bg-success' : 'bg-warning'}`}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-medium text-text-secondary">Mood Stability</span>
                                            <span className="font-bold text-text-primary">{score! > 50 ? 'Stable' : 'Needs Attention'}</span>
                                        </div>
                                        <div className="h-2 bg-surface rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: score! > 50 ? '80%' : '40%' }}
                                                className={`h-full ${score! > 50 ? 'bg-primary' : 'bg-error'}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recommendation Column */}
                            <div>
                                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2 text-lg">
                                    <Calendar size={24} className="text-primary" />
                                    Recommended Action
                                </h3>
                                <div className={`rounded-2xl p-8 border ${rec.bg} border-current/10`}>
                                    <p className={`font-bold text-xl mb-6 ${rec.color}`}>
                                        {rec.action}
                                    </p>
                                    <Link to={rec.link}>
                                        <Button className="w-full" rightIcon={<ChevronRight size={18} />}>
                                            Take Action
                                        </Button>
                                    </Link>
                                </div>
                                <div className="mt-6 flex flex-col gap-3">
                                    <h4 className="font-bold text-text-primary text-sm">Helpful Resources:</h4>
                                    <Link to="/learn/anxiety-101" className="text-primary hover:underline text-sm block">Understanding Anxiety Triggers</Link>
                                    <Link to="/tools/mood-journal" className="text-primary hover:underline text-sm block">Start a Mood Journal</Link>
                                </div>
                            </div>
                        </div>

                        {/* Actions Footer */}
                        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-6">
                            <div className="flex gap-4">
                                <Button variant="secondary" leftIcon={<Share2 size={16} />}>Share</Button>
                                <Button variant="secondary" leftIcon={<Download size={16} />}>Save PDF</Button>
                            </div>
                            <div className="flex gap-6 items-center">
                                <Link to="/tools/clarity-score/history" className="text-text-primary font-bold hover:text-primary transition-colors">
                                    View History
                                </Link>
                                <button
                                    onClick={() => navigate('/tools/clarity-score')}
                                    className="text-text-tertiary hover:text-text-primary font-medium flex items-center gap-2 transition-colors"
                                >
                                    <RefreshCw size={16} /> Retake
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AssessmentResultsPage;
