import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { ArrowUp } from 'lucide-react';

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
        label: 'Clarity',
        color: '#1A9B8C',
        dataKey: 'clarityScore',
        yAxisId: 'left',
        format: (v: number) => `${v}/100`,
    },
    {
        key: 'mood' as const,
        label: 'Mood',
        color: '#D4A060',
        dataKey: 'mood',
        yAxisId: 'right',
        format: (v: number) => `${v.toFixed(1)}/5`,
    },
    {
        key: 'sleep' as const,
        label: 'Sleep',
        color: '#5B6DB0',
        dataKey: 'sleepHours',
        yAxisId: 'right',
        format: (v: number) => `${v.toFixed(1)}h`,
    },
];

// ── Custom Tooltip ──
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; dataKey: string; value: number }>; label?: string }) => {
    if (!active || !payload || !payload.length) return null;

    return (
        <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md p-3 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-xl">
            <p className="font-semibold text-gray-900 dark:text-white text-xs mb-1.5">{label}</p>
            {payload.map((item, idx) => {
                const config = METRIC_CONFIG.find(m => m.dataKey === item.dataKey);
                return (
                    <p key={idx} className="text-xs font-medium flex items-center gap-1.5" style={{ color: item.color }}>
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: item.color }} />
                        {config?.label}: {config?.format(item.value) ?? item.value}
                    </p>
                );
            })}
        </div>
    );
};

// ── Ghost chart for empty state ──
const GhostChart: React.FC = () => {
    const ghostData = Array.from({ length: 7 }, (_, i) => ({
        date: `Day ${i + 1}`,
        value: 40 + Math.sin(i * 0.8) * 20 + Math.random() * 10,
    }));

    return (
        <div className="relative w-full min-h-[280px] sm:min-h-[320px]">
            <div className="opacity-[0.08] w-full h-full">
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={ghostData}>
                        <Area type="monotone" dataKey="value" stroke="#9CA3AF" strokeWidth={2} fill="#9CA3AF" fillOpacity={0.1} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="text-sm text-gray-500 dark:text-neutral-400 mb-1 font-medium">Your wellness trends will appear here</p>
                <p className="text-xs text-gray-400 dark:text-neutral-500 mb-4 max-w-xs">As you track your mood, sleep, and clarity, patterns will emerge.</p>
                <a href="#mood-checkin" className="text-xs text-teal-600 dark:text-teal-400 font-medium hover:underline flex items-center gap-1">
                    Start with a mood check-in <ArrowUp size={12} />
                </a>
            </div>
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
        return <GhostChart />;
    }

    return (
        <div className="w-full h-full min-h-[320px] flex flex-col">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Wellness Trends</h3>
                    <p className="text-xs text-gray-400 dark:text-neutral-500 mt-0.5">Last 7 days</p>
                </div>
                {/* Toggle pills */}
                <div className="flex gap-2">
                    {visibleMetrics.map(metric => (
                        <button
                            key={metric.key}
                            onClick={() => toggleMetric(metric.key)}
                            className={cn(
                                'px-3 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5',
                                activeMetrics.has(metric.key)
                                    ? 'bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white border-gray-300 dark:border-neutral-600'
                                    : 'bg-transparent text-gray-400 dark:text-neutral-500 border-gray-200 dark:border-neutral-700 hover:text-gray-600 dark:hover:text-neutral-300'
                            )}
                        >
                            <span
                                className="w-2 h-2 rounded-full inline-block transition-opacity"
                                style={{
                                    backgroundColor: metric.color,
                                    opacity: activeMetrics.has(metric.key) ? 1 : 0.3,
                                }}
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
                                    <stop offset="5%" stopColor={m.color} stopOpacity={0.25} />
                                    <stop offset="95%" stopColor={m.color} stopOpacity={0} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156,163,175,0.15)" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 11 }}
                            dy={10}
                        />
                        {showLeftAxis && (
                            <YAxis yAxisId="left" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} width={30} />
                        )}
                        {showRightAxis && (
                            <YAxis yAxisId="right" orientation="right" domain={[0, 12]} axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} width={30} />
                        )}
                        {!showLeftAxis && <YAxis yAxisId="left" hide domain={[0, 100]} />}
                        {!showRightAxis && <YAxis yAxisId="right" hide domain={[0, 12]} />}
                        <Tooltip content={<CustomTooltip />} />
                        {activeMetrics.has('clarity') && (
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="clarityScore"
                                stroke="#1A9B8C"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#gradient-clarity)"
                                connectNulls
                                isAnimationActive
                                animationDuration={800}
                            />
                        )}
                        {activeMetrics.has('mood') && (
                            <Area
                                yAxisId="right"
                                type="monotone"
                                dataKey="mood"
                                stroke="#D4A060"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#gradient-mood)"
                                connectNulls
                                isAnimationActive
                                animationDuration={800}
                            />
                        )}
                        {activeMetrics.has('sleep') && (
                            <Area
                                yAxisId="right"
                                type="monotone"
                                dataKey="sleepHours"
                                stroke="#5B6DB0"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#gradient-sleep)"
                                connectNulls
                                isAnimationActive
                                animationDuration={800}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MultiMetricChart;
