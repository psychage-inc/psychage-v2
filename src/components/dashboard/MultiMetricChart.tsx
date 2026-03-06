import React, { useState } from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from 'recharts';
import { cn } from '@/lib/utils';

export interface ChartDataPoint {
    date: string;
    clarityScore?: number;
    mood?: number;
    sleepHours?: number;
}

interface MultiMetricChartProps {
    data: ChartDataPoint[];
    availableMetrics: ('clarity' | 'mood' | 'sleep')[];
}

const METRIC_CONFIG = [
    {
        key: 'clarity' as const,
        label: 'Clarity Score',
        color: '#0d9488',
        dataKey: 'clarityScore',
        yAxisId: 'left',
        activeBg: 'bg-teal-500/10',
        activeText: 'text-teal-400',
        activeBorder: 'border-teal-500/30',
        format: (v: number) => `${v}/100`,
    },
    {
        key: 'mood' as const,
        label: 'Mood',
        color: '#f59e0b',
        dataKey: 'mood',
        yAxisId: 'right',
        activeBg: 'bg-amber-500/10',
        activeText: 'text-amber-400',
        activeBorder: 'border-amber-500/30',
        format: (v: number) => `${v.toFixed(1)}/5`,
    },
    {
        key: 'sleep' as const,
        label: 'Sleep Hours',
        color: '#6366f1',
        dataKey: 'sleepHours',
        yAxisId: 'right',
        activeBg: 'bg-indigo-500/10',
        activeText: 'text-indigo-400',
        activeBorder: 'border-indigo-500/30',
        format: (v: number) => `${v.toFixed(1)}h`,
    },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; dataKey: string; value: number }>; label?: string }) => {
    if (!active || !payload || !payload.length) return null;

    return (
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-3 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xl">
            <p className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1.5">{label}</p>
            {payload.map((item, idx) => {
                const config = METRIC_CONFIG.find(m => m.dataKey === item.dataKey);
                return (
                    <p key={idx} className="text-xs font-medium flex items-center gap-1.5" style={{ color: item.color }}>
                        <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.color }} />
                        {config?.label}: {config?.format(item.value) ?? item.value}
                    </p>
                );
            })}
        </div>
    );
};

const MultiMetricChart: React.FC<MultiMetricChartProps> = ({ data, availableMetrics }) => {
    const [activeMetrics, setActiveMetrics] = useState<Set<string>>(() => new Set(availableMetrics));

    const toggleMetric = (key: string) => {
        setActiveMetrics(prev => {
            const next = new Set(prev);
            if (next.has(key)) {
                if (next.size > 1) next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    const visibleMetrics = METRIC_CONFIG.filter(m => availableMetrics.includes(m.key));
    const showLeftAxis = activeMetrics.has('clarity');
    const showRightAxis = activeMetrics.has('mood') || activeMetrics.has('sleep');

    if (data.length === 0) {
        return (
            <div className="w-full min-h-[350px] flex flex-col items-center justify-center text-center">
                <p className="text-text-secondary text-sm mb-1">No trend data yet</p>
                <p className="text-text-tertiary text-xs">Start using your wellness tools to see trends here.</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full min-h-[350px] flex flex-col">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <h3 className="font-bold text-text-primary text-lg">Wellness Trends</h3>
                <div className="flex gap-2">
                    {visibleMetrics.map(metric => (
                        <button
                            key={metric.key}
                            onClick={() => toggleMetric(metric.key)}
                            className={cn(
                                'px-3 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5',
                                activeMetrics.has(metric.key)
                                    ? `${metric.activeBg} ${metric.activeText} ${metric.activeBorder}`
                                    : 'bg-surface-hover text-text-tertiary border-transparent hover:text-text-secondary'
                            )}
                        >
                            <span
                                className="w-2 h-2 rounded-full inline-block"
                                style={{ backgroundColor: activeMetrics.has(metric.key) ? metric.color : '#6b7280' }}
                            />
                            {metric.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-grow w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: showRightAxis ? 10 : 0, left: 0, bottom: 0 }}>
                        <defs>
                            {METRIC_CONFIG.map(m => (
                                <linearGradient key={m.key} id={`gradient-${m.key}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={m.color} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={m.color} stopOpacity={0} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            dy={10}
                        />
                        {showLeftAxis && (
                            <YAxis
                                yAxisId="left"
                                domain={[0, 100]}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                                width={30}
                            />
                        )}
                        {showRightAxis && (
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                domain={[0, 12]}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                                width={30}
                            />
                        )}
                        {/* Provide hidden axes so Recharts doesn't error when a series references a missing yAxisId */}
                        {!showLeftAxis && (
                            <YAxis yAxisId="left" hide domain={[0, 100]} />
                        )}
                        {!showRightAxis && (
                            <YAxis yAxisId="right" hide domain={[0, 12]} />
                        )}
                        <Tooltip content={<CustomTooltip />} />
                        {activeMetrics.has('clarity') && (
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="clarityScore"
                                stroke="#0d9488"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#gradient-clarity)"
                                connectNulls
                            />
                        )}
                        {activeMetrics.has('mood') && (
                            <Area
                                yAxisId="right"
                                type="monotone"
                                dataKey="mood"
                                stroke="#f59e0b"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#gradient-mood)"
                                connectNulls
                            />
                        )}
                        {activeMetrics.has('sleep') && (
                            <Area
                                yAxisId="right"
                                type="monotone"
                                dataKey="sleepHours"
                                stroke="#6366f1"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#gradient-sleep)"
                                connectNulls
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MultiMetricChart;
