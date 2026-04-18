import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type DiagramType = 'flowchart' | 'cycle' | 'hierarchy' | 'venn' | 'mindmap' | 'process';

export interface DiagramNode {
  id: string;
  label: string;
  x?: number;
  y?: number;
  color?: string;
  description?: string;
}

export interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
}

// Support simple items format (label/value/description) for non-diagram use
export interface SimpleItem {
  label: string;
  value?: string;
  description?: string;
}

export interface DiagramBlockProps {
  type?: DiagramType;
  title: string;
  nodes?: DiagramNode[];
  items?: SimpleItem[]; // Alternative format for simple lists
  connections?: DiagramConnection[];
  source?: string;
  className?: string;
  description?: string;
}

/**
 * DiagramBlock — SVG-based conceptual diagrams
 * Supports: flowcharts, cycles, hierarchies, venn diagrams, mindmaps, process flows
 * All diagrams include alt text for accessibility
 * Also supports simple item lists for non-diagram content
 */
export const DiagramBlock: React.FC<DiagramBlockProps> = ({
  type,
  title,
  nodes: propNodes,
  items,
  connections = [],
  source,
  className = '',
  description,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // If items are provided instead of nodes, convert them or render as simple list
  const isSimpleList = items && items.length > 0 && !propNodes;
  const nodes: DiagramNode[] = propNodes || (items ? items.map((item, i) => ({
    id: `item-${i}`,
    label: item.label
  })) : []);

  // If no type specified and we have items with value/description, render as simple list
  if (isSimpleList && !type) {
    return (
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`not-prose my-10 scroll-mt-32 ${className}`}
      >
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-text-secondary mb-6">{description}</p>
          )}
          <div className="grid gap-4">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col gap-2 p-4 rounded-lg bg-surface-hover border border-border">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="text-sm font-semibold text-text-primary">
                    {item.label}
                  </div>
                  {item.value && (
                    <div className="text-lg font-bold text-primary">
                      {item.value}
                    </div>
                  )}
                </div>
                {item.description && (
                  <div className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </div>
                )}
              </div>
            ))}
          </div>
          {source && (
            <p className="text-xs text-text-tertiary mt-4 italic">
              {source}
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  const renderFlowchart = () => {
    // Simple vertical flowchart with arrows
    const nodeHeight = 60;
    const nodeWidth = 200;
    const gap = 40;
    const startY = 40;

    return (
      <svg
        viewBox={`0 0 ${nodeWidth + 80} ${nodes.length * (nodeHeight + gap) + 40}`}
        className="w-full h-auto"
        role="img"
        aria-label={description || `Flowchart: ${title}`}
      >
        {nodes.map((node, i) => {
          const y = startY + i * (nodeHeight + gap);
          const x = 40;

          return (
            <g key={node.id}>
              {/* Connection line to next node */}
              {i < nodes.length - 1 && (
                <>
                  <line
                    x1={x + nodeWidth / 2}
                    y1={y + nodeHeight}
                    x2={x + nodeWidth / 2}
                    y2={y + nodeHeight + gap}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-text-tertiary"
                  />
                  <polygon
                    points={`${x + nodeWidth / 2},${y + nodeHeight + gap - 8} ${x + nodeWidth / 2 - 5},${y + nodeHeight + gap - 16} ${x + nodeWidth / 2 + 5},${y + nodeHeight + gap - 16}`}
                    fill="currentColor"
                    className="text-text-tertiary"
                  />
                </>
              )}

              {/* Node box */}
              <rect
                x={x}
                y={y}
                width={nodeWidth}
                height={nodeHeight}
                rx="12"
                fill={node.color || 'currentColor'}
                stroke="currentColor"
                strokeWidth="2"
                className={!node.color ? 'text-primary/10 dark:text-primary/20 stroke-primary dark:stroke-primary' : ''}
              />

              {/* Node label */}
              <text
                x={x + nodeWidth / 2}
                y={y + nodeHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-text-primary text-sm font-medium"
              >
                {node.label.length > 30 ? (
                  <>
                    <tspan x={x + nodeWidth / 2} dy="-0.6em">
                      {node.label.substring(0, 30)}
                    </tspan>
                    <tspan x={x + nodeWidth / 2} dy="1.2em">
                      {node.label.substring(30)}
                    </tspan>
                  </>
                ) : (
                  node.label
                )}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const renderCycle = () => {
    // Circular cycle diagram with arrows
    const centerX = 200;
    const centerY = 200;
    const radius = 140;
    const nodeRadius = 70;
    const totalNodes = nodes.length;

    return (
      <svg
        viewBox="0 0 400 400"
        className="w-full h-auto"
        role="img"
        aria-label={description || `Cycle diagram: ${title}`}
      >
        {/* Circle arrows background */}
        {nodes.map((_, i) => {
          const angle1 = (i * 2 * Math.PI) / totalNodes - Math.PI / 2;
          const angle2 = ((i + 1) * 2 * Math.PI) / totalNodes - Math.PI / 2;
          const x1 = centerX + radius * Math.cos(angle1);
          const y1 = centerY + radius * Math.sin(angle1);
          const x2 = centerX + radius * Math.cos(angle2);
          const y2 = centerY + radius * Math.sin(angle2);

          return (
            <g key={i}>
              <path
                d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-border"
                markerEnd="url(#arrowhead)"
              />
            </g>
          );
        })}

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            className="text-border"
          >
            <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
          </marker>
        </defs>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const angle = (i * 2 * Math.PI) / totalNodes - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          return (
            <g key={node.id}>
              <circle
                cx={x}
                cy={y}
                r={nodeRadius}
                fill={node.color || 'currentColor'}
                stroke="currentColor"
                strokeWidth="3"
                className={!node.color ? 'text-teal-100 dark:text-teal-900/40 stroke-primary dark:stroke-primary' : ''}
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-text-primary text-xs font-bold"
              >
                {node.label.length > 15 ? (
                  <>
                    <tspan x={x} dy="-0.6em">
                      {node.label.substring(0, 15)}
                    </tspan>
                    <tspan x={x} dy="1.2em">
                      {node.label.substring(15)}
                    </tspan>
                  </>
                ) : (
                  node.label
                )}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const renderHierarchy = () => {
    // Simple tree hierarchy (top-down)
    const levelHeight = 100;
    const nodeWidth = 140;
    const nodeHeight = 50;
    const gap = 20;

    // Assume first node is root, rest are children in rows
    const root = nodes[0];
    const children = nodes.slice(1);
    const childrenPerRow = Math.ceil(Math.sqrt(children.length));

    return (
      <svg
        viewBox={`0 0 ${Math.max(nodeWidth * childrenPerRow + gap * (childrenPerRow - 1), nodeWidth) + 80} ${levelHeight * 2 + nodeHeight + 80}`}
        className="w-full h-auto"
        role="img"
        aria-label={description || `Hierarchy diagram: ${title}`}
      >
        {/* Root node */}
        <g>
          <rect
            x={(nodeWidth * childrenPerRow + gap * (childrenPerRow - 1)) / 2 - nodeWidth / 2}
            y={40}
            width={nodeWidth}
            height={nodeHeight}
            rx="8"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/20 dark:text-primary/30 stroke-primary dark:stroke-primary"
          />
          <text
            x={(nodeWidth * childrenPerRow + gap * (childrenPerRow - 1)) / 2}
            y={40 + nodeHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-text-primary text-sm font-bold"
          >
            {root.label}
          </text>
        </g>

        {/* Children nodes */}
        {children.map((node, i) => {
          const col = i % childrenPerRow;
          const row = Math.floor(i / childrenPerRow);
          const x = 40 + col * (nodeWidth + gap);
          const y = 40 + levelHeight + row * (nodeHeight + gap);
          const rootX = (nodeWidth * childrenPerRow + gap * (childrenPerRow - 1)) / 2;
          const rootY = 40 + nodeHeight;

          return (
            <g key={node.id}>
              {/* Connection line */}
              <line
                x1={rootX}
                y1={rootY}
                x2={x + nodeWidth / 2}
                y2={y}
                stroke="currentColor"
                strokeWidth="2"
                className="text-border"
              />

              {/* Node */}
              <rect
                x={x}
                y={y}
                width={nodeWidth}
                height={nodeHeight}
                rx="8"
                fill={node.color || 'currentColor'}
                stroke="currentColor"
                strokeWidth="2"
                className={!node.color ? 'text-teal-50 dark:text-teal-900/20 stroke-teal-400 dark:stroke-teal-600' : ''}
              />
              <text
                x={x + nodeWidth / 2}
                y={y + nodeHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-text-primary text-xs font-medium"
              >
                {node.label.length > 20 ? (
                  <>
                    <tspan x={x + nodeWidth / 2} dy="-0.6em">
                      {node.label.substring(0, 20)}
                    </tspan>
                    <tspan x={x + nodeWidth / 2} dy="1.2em">
                      {node.label.substring(20)}
                    </tspan>
                  </>
                ) : (
                  node.label
                )}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const renderProcess = () => {
    // Horizontal process flow with numbered steps
    const nodeWidth = 150;
    const nodeHeight = 80;
    const gap = 60;
    const startX = 40;
    const startY = 60;

    return (
      <svg
        viewBox={`0 0 ${nodes.length * (nodeWidth + gap) + 40} ${nodeHeight + 120}`}
        className="w-full h-auto"
        role="img"
        aria-label={description || `Process flow: ${title}`}
      >
        {nodes.map((node, i) => {
          const x = startX + i * (nodeWidth + gap);

          return (
            <g key={node.id}>
              {/* Connection arrow to next */}
              {i < nodes.length - 1 && (
                <>
                  <line
                    x1={x + nodeWidth}
                    y1={startY + nodeHeight / 2}
                    x2={x + nodeWidth + gap}
                    y2={startY + nodeHeight / 2}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-text-tertiary"
                  />
                  <polygon
                    points={`${x + nodeWidth + gap},${startY + nodeHeight / 2} ${x + nodeWidth + gap - 10},${startY + nodeHeight / 2 - 6} ${x + nodeWidth + gap - 10},${startY + nodeHeight / 2 + 6}`}
                    fill="currentColor"
                    className="text-text-tertiary"
                  />
                </>
              )}

              {/* Step number badge */}
              <circle
                cx={x + nodeWidth / 2}
                cy={startY - 20}
                r="18"
                fill="currentColor"
                className="text-primary"
              />
              <text
                x={x + nodeWidth / 2}
                y={startY - 20}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white text-sm font-bold"
              >
                {i + 1}
              </text>

              {/* Node box */}
              <rect
                x={x}
                y={startY}
                width={nodeWidth}
                height={nodeHeight}
                rx="12"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                className="text-teal-50 dark:text-teal-900/20 stroke-teal-300 dark:stroke-teal-700"
              />

              {/* Node label */}
              <text
                x={x + nodeWidth / 2}
                y={startY + nodeHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-text-primary text-xs font-medium"
              >
                {node.label.length > 25 ? (
                  <>
                    <tspan x={x + nodeWidth / 2} dy="-0.6em">
                      {node.label.substring(0, 25)}
                    </tspan>
                    <tspan x={x + nodeWidth / 2} dy="1.2em">
                      {node.label.substring(25)}
                    </tspan>
                  </>
                ) : (
                  node.label
                )}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const renderDiagram = () => {
    switch (type) {
      case 'flowchart':
        return renderFlowchart();
      case 'cycle':
        return renderCycle();
      case 'hierarchy':
        return renderHierarchy();
      case 'process':
        return renderProcess();
      default:
        return renderFlowchart();
    }
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`not-prose my-10 scroll-mt-32 ${className}`}
    >
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-text-primary mb-4">
          {title}
        </h3>

        <div className="diagram-container overflow-x-auto">
          {renderDiagram()}
        </div>

        {source && (
          <p className="text-xs text-text-tertiary mt-4 italic">
            {source}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default DiagramBlock;
