import React from 'react';
import {
    ResponsiveContainer,
    BarChart, Bar,
    LineChart, Line,
    PieChart, Pie, Cell,
    AreaChart, Area,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { useScrollAnimation } from './shared/useScrollAnimation';

type ChartType = 'bar' | 'line' | 'pie' | 'area' | 'radar' | 'donut';

interface ChartDataPoint {
    label?: string;
    name?: string;
    value?: number | string;
    color?: string;
    secondValue?: number;
    [key: string]: unknown;
}

interface ArticleChartProps {
    type?: ChartType;
    title?: string;
    description?: string;
    caption?: string;
    data: ChartDataPoint[] | Record<string, unknown>;
    source?: string;
    height?: number;
    className?: string;
    color?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    /** Alternative key-based API for multi-series charts */
    xKey?: string;
    yKey?: string;
    yKey1?: string;
    yKey2?: string;
    yLabel?: string;
    label1?: string;
    label2?: string;
    citationId?: string;
    lines?: Array<{ key: string; color: string; label: string }>;
    labels?: string[];
}

const COLORS = ['#0D9488', '#6366F1', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];

const getColor = (index: number, point?: ChartDataPoint) =>
    (point?.color as string) || COLORS[index % COLORS.length];

/** Normalize data: articles sometimes use `name` instead of `label`, and `value` as string */
function normalizeData(data: ChartDataPoint[]): Array<{ label: string; value: number; color?: string; [key: string]: unknown }> {
    return data.map((d) => ({
        ...d,
        label: d.label ?? d.name ?? '',
        value: typeof d.value === 'string' ? parseFloat(d.value) || 0 : (d.value ?? 0),
    }));
}

const ChartRenderer: React.FC<{ type: ChartType; data: ReturnType<typeof normalizeData>; height: number }> = ({
    type,
    data,
    height,
}) => {
    const axisStyle = { fontSize: 11, fill: '#9ca3af' };
    const gridStroke = '#e5e7eb';

    switch (type) {
        case 'bar':
            return (
                <ResponsiveContainer width="100%" height={height}>
                    <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                        <XAxis dataKey="label" tick={axisStyle} stroke="#d1d5db" />
                        <YAxis tick={axisStyle} stroke="#d1d5db" />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '0.75rem',
                                border: '1px solid #e5e7eb',
                                fontSize: 13,
                            }}
                        />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={800}>
                            {data.map((point, i) => (
                                <Cell key={i} fill={getColor(i, point)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            );

        case 'line':
            return (
                <ResponsiveContainer width="100%" height={height}>
                    <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                        <XAxis dataKey="label" tick={axisStyle} stroke="#d1d5db" />
                        <YAxis tick={axisStyle} stroke="#d1d5db" />
                        <Tooltip contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e5e7eb', fontSize: 13 }} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#0D9488"
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: '#0D9488' }}
                            activeDot={{ r: 6 }}
                            animationDuration={1000}
                        />
                    </LineChart>
                </ResponsiveContainer>
            );

        case 'area':
            return (
                <ResponsiveContainer width="100%" height={height}>
                    <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0D9488" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#0D9488" stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                        <XAxis dataKey="label" tick={axisStyle} stroke="#d1d5db" />
                        <YAxis tick={axisStyle} stroke="#d1d5db" />
                        <Tooltip contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e5e7eb', fontSize: 13 }} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#0D9488"
                            strokeWidth={2}
                            fill="url(#areaGradient)"
                            animationDuration={1000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            );

        case 'pie':
        case 'donut':
            return (
                <ResponsiveContainer width="100%" height={height}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="label"
                            cx="50%"
                            cy="50%"
                            outerRadius={height / 3}
                            innerRadius={type === 'donut' ? height / 5 : 0}
                            label={({ label, percent }: { label: string; percent: number }) =>
                                `${label} (${(percent * 100).toFixed(0)}%)`
                            }
                            labelLine={{ strokeWidth: 1 }}
                            animationDuration={800}
                        >
                            {data.map((point, i) => (
                                <Cell key={i} fill={getColor(i, point)} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e5e7eb', fontSize: 13 }} />
                    </PieChart>
                </ResponsiveContainer>
            );

        case 'radar':
            return (
                <ResponsiveContainer width="100%" height={height}>
                    <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="label" tick={{ fontSize: 11, fill: '#6b7280' }} />
                        <PolarRadiusAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
                        <Radar
                            dataKey="value"
                            stroke="#0D9488"
                            fill="#0D9488"
                            fillOpacity={0.2}
                            strokeWidth={2}
                            animationDuration={800}
                        />
                        <Tooltip contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e5e7eb', fontSize: 13 }} />
                    </RadarChart>
                </ResponsiveContainer>
            );

        default:
            return null;
    }
};

const ArticleChart: React.FC<ArticleChartProps> = ({
    type = 'bar',
    title,
    description,
    data,
    source,
    height = 280,
    className = '',
}) => {
    const { ref, isInView } = useScrollAnimation({ amount: 0.15 });
    const normalized = Array.isArray(data) ? normalizeData(data) : [];

    if (!normalized.length) return null;

    return (
        <div
            ref={ref}
            className={`
                my-10 p-6 rounded-2xl
                bg-white dark:bg-gray-900/50
                border border-gray-100 dark:border-gray-800
                shadow-sm
                ${className}
            `}
            role="img"
            aria-label={title || `${type} chart`}
        >
            {title && (
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                    {title}
                </h4>
            )}
            {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {description}
                </p>
            )}

            {/* Only render chart when in view so Recharts animations play on scroll entry */}
            <div style={{ minHeight: height }}>
                {isInView && <ChartRenderer type={type} data={normalized} height={height} />}
            </div>

            {source && (
                <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 italic">
                    Source: {source}
                </p>
            )}
        </div>
    );
};

export { ArticleChart };
export type { ChartType, ChartDataPoint, ArticleChartProps };
