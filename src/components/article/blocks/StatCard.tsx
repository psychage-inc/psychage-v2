 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './shared/useScrollAnimation';

interface StatItem {
    value?: number | string;
    prefix?: string;
    suffix?: string;
    label?: string;
    description?: string;
    icon?: React.ReactNode;
    color?: string;
    /** Alternative prop names used by some articles */
    stat?: string;
    source?: React.ReactNode;
    citation?: string;
}

interface StatCardProps {
    stats?: StatItem[];
    title?: string;
    /** Articles sometimes pass props directly instead of stats array */
    value?: number | string;
    /** Alternative prop name used by some articles */
    number?: number | string;
    stat?: string;
    label?: string;
    description?: string;
    source?: React.ReactNode;
    citation?: string;
    className?: string;
    /** Visual variant — used by article content */
    variant?: string;
}

function useCountUp(end: number, isActive: boolean, shouldAnimate: boolean, duration = 1500) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isActive) return;
        if (!shouldAnimate) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCount(end);
            return;
        }

        let frame: number;
        const startTime = performance.now();

        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            }
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [end, isActive, shouldAnimate, duration]);

    return count;
}

const StatValue: React.FC<{
    item: StatItem;
    isInView: boolean;
    shouldAnimate: boolean;
    index: number;
}> = ({ item, isInView, shouldAnimate, index }) => {
    const displayValue = item.value ?? item.stat ?? '';
    const numericValue = typeof displayValue === 'string' ? parseFloat(displayValue) || 0 : displayValue;
    const isNumeric = typeof displayValue === 'number' || !isNaN(parseFloat(String(displayValue)));
    const count = useCountUp(numericValue, isInView, shouldAnimate);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
            className="flex flex-col items-center text-center p-6"
        >
            {item.icon && (
                <div className="mb-3 text-primary">{item.icon}</div>
            )}
            <div className="text-4xl md:text-5xl font-bold text-text-primary tabular-nums">
                {item.prefix}
                {isNumeric ? count : displayValue}
                {item.suffix}
            </div>
            <p className="mt-2 text-sm text-text-tertiary max-w-[200px]">
                {item.label}
            </p>
            {item.description && (
                <p className="mt-1 text-xs text-text-tertiary max-w-[250px]">
                    {item.description}
                </p>
            )}
        </motion.div>
    );
};

const StatCard: React.FC<StatCardProps> = (props) => {
    const { className = '' } = props;
    const { ref, isInView, shouldAnimate } = useScrollAnimation();

    // Normalize: support both `stats` array and direct props
    const stats: StatItem[] = props.stats ?? (
        (props.value != null || props.number != null || props.stat != null)
            ? [{ value: props.value ?? props.number ?? props.stat ?? '', label: props.label ?? '', description: props.description, source: props.source, citation: props.citation }]
            : []
    );
    const source = props.source ?? stats[0]?.source;

    if (stats.length === 0) return null;

    const gridCols =
        stats.length === 1
            ? 'grid-cols-1'
            : stats.length === 2
              ? 'grid-cols-1 sm:grid-cols-2'
              : stats.length === 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : 'grid-cols-2 md:grid-cols-4';

    return (
        <div
            ref={ref}
            className={`
                not-prose my-8 rounded-2xl
                bg-gradient-to-br from-surface to-white dark:from-surface dark:to-surface
                border border-border
                overflow-hidden
                ${className}
            `}
        >
            {props.title && (
                <div className="px-6 pt-5 pb-2">
                    <h4 className="text-base font-bold text-text-primary">{props.title}</h4>
                </div>
            )}
            <div className={`grid ${gridCols} divide-x divide-border`}>
                {stats.map((item, i) => (
                    <StatValue
                        key={i}
                        item={item}
                        isInView={isInView}
                        shouldAnimate={shouldAnimate}
                        index={i}
                    />
                ))}
            </div>
            {source && (
                <div className="px-6 py-3 border-t border-border">
                    <p className="text-xs text-text-tertiary italic text-center">
                        Source: {source}
                    </p>
                </div>
            )}
        </div>
    );
};

export { StatCard };
export type { StatItem, StatCardProps };
