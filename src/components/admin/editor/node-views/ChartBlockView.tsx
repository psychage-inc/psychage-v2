import React, { useState, useMemo } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { Settings, Trash2 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import ChartDataEditor from './ChartDataEditor';
import type { ChartBlockData } from '../extensions/ChartBlock';

const CHART_COLORS = ['#1A9B8C', '#6366F1', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-surface border border-border rounded-lg shadow-lg px-3 py-2 text-xs">
        <p className="font-medium text-text-primary">{label || payload[0]?.name}</p>
        <p className="text-text-secondary">{payload[0]?.value}</p>
      </div>
    );
  }
  return null;
};

const ChartBlockView: React.FC<NodeViewProps> = ({ node, updateAttributes, deleteNode }) => {
  const [showEditor, setShowEditor] = useState(false);

  const chartData: ChartBlockData = useMemo(() => {
    try {
      return JSON.parse(node.attrs.chartData);
    } catch {
      return { chartType: 'bar' as const, title: 'Chart', data: [] };
    }
  }, [node.attrs.chartData]);

  const updateChartData = (newData: ChartBlockData) => {
    updateAttributes({ chartData: JSON.stringify(newData) });
  };

  const renderChart = () => {
    const { data, chartType } = chartData;
    if (!data.length) {
      return (
        <div className="flex items-center justify-center h-full text-text-tertiary text-sm">
          No data — click the gear icon to add data
        </div>
      );
    }

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ label }) => label}
                labelLine
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="value" stroke="#1A9B8C" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <NodeViewWrapper className="my-6" data-drag-handle>
      <div className="border border-border rounded-xl overflow-hidden bg-surface">
        {/* Header */}
        <div
          contentEditable={false}
          className="flex items-center justify-between px-4 py-2 bg-surface-hover border-b border-border"
        >
          <input
            value={chartData.title}
            onChange={(e) => updateChartData({ ...chartData, title: e.target.value })}
            className="text-sm font-medium bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded text-text-primary placeholder:text-text-tertiary"
            placeholder="Chart Title"
          />
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowEditor(!showEditor)}
              title="Edit chart data"
              className={`p-1.5 rounded transition-colors ${showEditor ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' : 'text-text-tertiary hover:text-text-primary'}`}
            >
              <Settings size={14} />
            </button>
            <button
              onClick={deleteNode}
              title="Remove chart"
              className="p-1.5 rounded text-text-tertiary hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Chart area */}
        <div contentEditable={false} className="h-64 p-4">
          {renderChart()}
        </div>

        {/* Data editor (expandable) */}
        {showEditor && (
          <div contentEditable={false} className="border-t border-border">
            <ChartDataEditor data={chartData} onChange={updateChartData} />
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default ChartBlockView;
