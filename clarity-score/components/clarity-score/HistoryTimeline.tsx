'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { AssessmentHistoryItem } from '@/lib/types';
import { useMemo } from 'react';

interface HistoryTimelineProps {
    history: AssessmentHistoryItem[];
}

export default function HistoryTimeline({ history }: HistoryTimelineProps) {
    const data = useMemo(() => {
        return [...history].reverse().map(item => ({
            date: new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            total: item.results.totalScore,
            emotional: (item.results.domainScores.emotional / 20) * 100, // Normalize to 100 scale for comparison
            vitality: (item.results.domainScores.vitality / 20) * 100,
            social: (item.results.domainScores.social / 20) * 100,
            cognitive: (item.results.domainScores.cognitive / 20) * 100,
            functioning: (item.results.domainScores.functioning / 20) * 100,
        }));
    }, [history]);

    if (!data || data.length === 0) {
        return (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/10 bg-bg-card p-6 text-center text-text-muted">
                No assessment history available yet.
            </div>
        );
    }

    return (
        <div className="h-[400px] w-full rounded-2xl border border-white/10 bg-bg-card p-4 pb-0 pt-6">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="rgba(255,255,255,0.4)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                    />
                    <YAxis
                        stroke="rgba(255,255,255,0.4)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        domain={[0, 100]}
                        dx={-10}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0F172A',
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '14px'
                        }}
                        itemStyle={{ color: '#E2E8F0' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                    <Line
                        type="monotone"
                        name="Total Score"
                        dataKey="total"
                        stroke="#0D9488"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#0D9488', strokeWidth: 0 }}
                        activeDot={{ r: 6, fill: '#0D9488' }}
                    />
                    <Line type="monotone" name="Emotional" dataKey="emotional" stroke="#6366F1" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                    <Line type="monotone" name="Vitality" dataKey="vitality" stroke="#F59E0B" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
