import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Calendar, Trash2, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Display } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import SEO from '@/components/SEO';
import * as d3 from 'd3';

const HISTORY_KEY = 'psychage_clarity_history';

interface HistoryItem {
    id: string;
    date: string;
    score: number;
}

const ScoreHistoryPage: React.FC = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState<HistoryItem[]>(() => {
        try {
            const saved = localStorage.getItem(HISTORY_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                return [...parsed].sort((a: HistoryItem, b: HistoryItem) => new Date(a.date).getTime() - new Date(b.date).getTime());
            }
        } catch (e) {
            console.error("Failed to parse history", e);
        }
        return [];
    });

    const [chartPath, setChartPath] = useState('');
    const [points, setPoints] = useState<{ x: number; y: number; val: number }[]>([]);

    useEffect(() => {
        const generateChart = (data: HistoryItem[]) => {
            if (data.length < 2) return;

            const height = 200;
            const width = 600; // ViewBox width
            const padding = 20;

            const xScale = d3.scalePoint()
                .domain(data.map(d => d.date))
                .range([padding, width - padding]);

            const yScale = d3.scaleLinear()
                .domain([0, 100])
                .range([height - padding, padding]);

            const lineGenerator = d3.line<HistoryItem>()
                .x(d => xScale(d.date) || 0)
                .y(d => yScale(d.score))
                .curve(d3.curveMonotoneX);

            const path = lineGenerator(data);
            if (path) setChartPath(path);

            const calculatedPoints = data.map(d => ({
                x: xScale(d.date) || 0,
                y: yScale(d.score),
                val: d.score
            }));
            setPoints(calculatedPoints);
        };

        generateChart(history);
    }, [history]);

    const clearHistory = () => {
        if (window.confirm("Are you sure you want to clear your assessment history?")) {
            localStorage.removeItem(HISTORY_KEY);
            setHistory([]);
            setChartPath('');
            setPoints([]);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Score History | Psychage" />

            <div className="container mx-auto max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/tools" className="flex items-center text-text-secondary hover:text-primary transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back to Tools
                    </Link>
                    <Display className="text-3xl">Clarity History</Display>
                </div>

                {history.length === 0 ? (
                    <Card className="p-12 text-center border-dashed border-2 border-border bg-surface-subtle">
                        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 text-text-tertiary">
                            <TrendingUp size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">No history yet</h3>
                        <p className="text-text-secondary mb-6">Take your first assessment to establish a baseline.</p>
                        <Button onClick={() => navigate('/tools/clarity-score')}>
                            Start Assessment
                        </Button>
                    </Card>
                ) : (
                    <>
                        {/* Chart Card */}
                        <Card className="p-8 mb-8 overflow-hidden">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-bold text-text-primary flex items-center gap-2">
                                    <TrendingUp size={20} className="text-primary" />
                                    Progress Over Time
                                </h3>
                                <div className="text-sm text-text-tertiary">Last {history.length} Entries</div>
                            </div>

                            <div className="w-full aspect-[2/1] md:aspect-[3/1] relative">
                                {history.length > 1 ? (
                                    <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
                                        {/* Grid Lines */}
                                        <line x1="20" y1="20" x2="580" y2="20" stroke="currentColor" className="text-border" strokeDasharray="4 4" />
                                        <line x1="20" y1="100" x2="580" y2="100" stroke="currentColor" className="text-border" strokeDasharray="4 4" />
                                        <line x1="20" y1="180" x2="580" y2="180" stroke="currentColor" className="text-border" strokeDasharray="4 4" />

                                        {/* Path */}
                                        <motion.path
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                            d={chartPath}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            className="text-primary"
                                        />

                                        {/* Area under curve (Gradient) */}
                                        <defs>
                                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="currentColor" className="text-primary" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="currentColor" className="text-primary" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d={`${chartPath} L ${points[points.length - 1]?.x} 180 L ${points[0]?.x} 180 Z`}
                                            fill="url(#areaGradient)"
                                        />

                                        {/* Points */}
                                        {points.map((p, i) => (
                                            <motion.g
                                                key={i}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 1 + (i * 0.1) }}
                                            >
                                                <circle cx={p.x} cy={p.y} r="6" className="fill-surface stroke-primary stroke-2" />
                                                <text x={p.x} y={p.y - 15} textAnchor="middle" className="fill-text-primary text-[10px] font-bold">
                                                    {p.val}
                                                </text>
                                            </motion.g>
                                        ))}
                                    </svg>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-text-tertiary">
                                        <AlertCircle className="mr-2" size={20} />
                                        Not enough data for chart (Need at least 2 entries)
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* List */}
                        <div className="bg-surface rounded-2xl border border-border overflow-hidden">
                            <div className="p-6 border-b border-border flex justify-between items-center">
                                <h3 className="font-bold text-text-primary">History Log</h3>
                                <button onClick={clearHistory} className="text-error text-sm font-medium hover:underline flex items-center gap-1">
                                    <Trash2 size={14} /> Clear
                                </button>
                            </div>
                            <div className="divide-y divide-border">
                                {history.slice().reverse().map((item) => (
                                    <div key={item.id} className="p-4 flex items-center justify-between hover:bg-surface-hover transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${item.score >= 80 ? 'bg-success/10 text-success' :
                                                item.score >= 50 ? 'bg-warning/10 text-warning' :
                                                    'bg-error/10 text-error'
                                                }`}>
                                                {item.score}
                                            </div>
                                            <div>
                                                <div className="font-medium text-text-primary flex items-center gap-2">
                                                    <Calendar size={14} className="text-text-tertiary" />
                                                    {item.date}
                                                </div>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="ghost">View</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ScoreHistoryPage;
