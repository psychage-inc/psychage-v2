import React from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './shared/useScrollAnimation';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ComparisonItem {
    feature?: string;
    values?: (boolean | string)[];
    left?: boolean | string;
    right?: boolean | string;
    [key: string]: unknown;
}

type ColumnDef = string | { key: string; label: string };

interface ComparisonTableProps {
    columns?: ColumnDef[];
    items?: ComparisonItem[];
    /** Alternative: pass data with arbitrary key-value objects */
    data?: Record<string, unknown>[];
    /** Alternative: pass headers + rows directly */
    headers?: string[];
    rows?: (string | boolean)[][] | Record<string, unknown>[];
    /** Alternative: left/right labels with row objects */
    leftLabel?: string;
    rightLabel?: string;
    title?: string;
    highlightColumn?: number;
    caption?: string;
    className?: string;
}

const CellContent: React.FC<{ value: boolean | string }> = ({ value }) => {
    if (typeof value === 'boolean') {
        return value ? (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
            </span>
        ) : (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30">
                <X size={14} className="text-red-500 dark:text-red-400" />
            </span>
        );
    }
    return <span className="text-sm text-text-secondary">{value}</span>;
};

function extractColumnKeys(columns: ColumnDef[]): string[] {
    return columns.map((c) => (typeof c === 'string' ? c : c.key));
}

function extractColumnLabels(columns: ColumnDef[]): string[] {
    return columns.map((c) => (typeof c === 'string' ? c : c.label));
}

const ComparisonTable: React.FC<ComparisonTableProps> = (props) => {
    const { title, highlightColumn, className = '' } = props;
    const { ref, isInView } = useScrollAnimation();
    const isMobile = useMediaQuery('(max-width: 639px)');

    // Normalize columns
    let resolvedColumns: string[];
    let columnKeys: string[] | null = null;
    let headersFirstCol: string | null = null;
    if (props.columns) {
        resolvedColumns = extractColumnLabels(props.columns);
        columnKeys = extractColumnKeys(props.columns);
    } else if (props.headers) {
        // First header is the feature column label, rest are value columns
        headersFirstCol = props.headers[0] ?? 'Feature';
        resolvedColumns = props.headers.slice(1);
    } else if (props.leftLabel && props.rightLabel) {
        resolvedColumns = [props.leftLabel, props.rightLabel];
    } else {
        resolvedColumns = [];
    }

    // Normalize items from various formats
    let resolvedItems: { feature: string; values: (boolean | string)[] }[];

    if (props.data && columnKeys) {
        // data + columns pattern: { columns: [{key, label}], data: [{key1: val, key2: val}] }
        const firstKey = columnKeys[0];
        const restKeys = columnKeys.slice(1);
        resolvedItems = props.data.map((row, i) => ({
            feature: String(row[firstKey] ?? `Row ${i + 1}`),
            values: restKeys.map((k) => {
                const v = row[k];
                return typeof v === 'boolean' ? v : String(v ?? '');
            }),
        }));
        // Fix columns: the first column is the feature column header, rest are value headers
        resolvedColumns = resolvedColumns.slice(1);
    } else if (props.items) {
        resolvedItems = props.items.map((item, i) => {
            const feature = item.feature ?? (item.left != null ? '' : `Row ${i + 1}`);
            if (item.values) {
                return { feature, values: item.values };
            }
            if (item.left != null || item.right != null) {
                return {
                    feature,
                    values: [
                        typeof item.left === 'boolean' ? item.left : String(item.left ?? ''),
                        typeof item.right === 'boolean' ? item.right : String(item.right ?? ''),
                    ],
                };
            }
            // Fallback: extract values from any extra keys
            const knownKeys = new Set(['feature', 'values', 'left', 'right']);
            const extraValues = Object.entries(item)
                .filter(([k]) => !knownKeys.has(k))
                .map(([, v]) => (typeof v === 'boolean' ? v : String(v ?? '')));
            return { feature, values: extraValues.length > 0 ? extraValues : [] };
        });
    } else if (props.rows) {
        resolvedItems = (props.rows as unknown[]).map((row, i) => {
            if (Array.isArray(row)) {
                return {
                    feature: String(row[0] ?? `Row ${i + 1}`),
                    values: row.slice(1).map((v: unknown) => (typeof v === 'boolean' ? v : String(v))),
                };
            }
            // Object rows: { left: '...', right: '...' }
            const obj = row as Record<string, unknown>;
            return {
                feature: String(obj.feature ?? ''),
                values: [String(obj.left ?? ''), String(obj.right ?? '')],
            };
        });
    } else {
        resolvedItems = [];
    }

    // Determine the first column header
    const firstColHeader = props.data && props.columns
        ? extractColumnLabels(props.columns)[0] ?? 'Feature'
        : headersFirstCol || props.leftLabel || 'Feature';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`not-prose my-8 ${className}`}
        >
            {title && (
                <h4 className="text-base font-bold text-text-primary mb-4">
                    {title}
                </h4>
            )}

            {/* Mobile: stacked cards */}
            {isMobile ? (
                <div className="space-y-3">
                    {resolvedItems.map((item, rowIdx) => (
                        <div
                            key={rowIdx}
                            className="rounded-xl border border-border overflow-hidden"
                        >
                            <div className="px-4 py-2.5 bg-surface border-b border-border">
                                <span className="text-sm font-semibold text-text-primary">
                                    {item.feature}
                                </span>
                            </div>
                            <div className="divide-y divide-border">
                                {item.values.map((value, colIdx) => (
                                    <div
                                        key={colIdx}
                                        className={`flex items-center justify-between px-4 py-2.5 ${
                                            highlightColumn === colIdx ? 'bg-teal-50/50 dark:bg-teal-900/10' : ''
                                        }`}
                                    >
                                        <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
                                            {resolvedColumns[colIdx]}
                                        </span>
                                        <CellContent value={value} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Desktop: standard table */
                <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary bg-surface border-b border-border">
                                    {firstColHeader}
                                </th>
                                {resolvedColumns.map((col, i) => (
                                    <th
                                        key={i}
                                        className={`
                                            px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider
                                            border-b border-border
                                            ${
                                                highlightColumn === i
                                                    ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                                                    : 'bg-surface text-text-tertiary'
                                            }
                                        `}
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {resolvedItems.map((item, rowIdx) => (
                                <tr
                                    key={rowIdx}
                                    className="border-b border-border last:border-b-0 hover:bg-surface-hover transition-colors"
                                >
                                    <td className="px-4 py-3 text-sm font-medium text-text-primary">
                                        {item.feature}
                                    </td>
                                    {item.values.map((value, colIdx) => (
                                        <td
                                            key={colIdx}
                                            className={`
                                                px-4 py-3 text-center
                                                ${highlightColumn === colIdx ? 'bg-teal-50/50 dark:bg-teal-900/10' : ''}
                                            `}
                                        >
                                            <CellContent value={value} />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </motion.div>
    );
};

export { ComparisonTable };
export type { ComparisonItem, ComparisonTableProps };
