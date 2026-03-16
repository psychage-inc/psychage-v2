import React from 'react';
import { NodeViewWrapper, NodeViewContent, NodeViewProps } from '@tiptap/react';
import { Info, AlertTriangle, Lightbulb, StickyNote, type LucideIcon } from 'lucide-react';
import type { CalloutVariant } from '../extensions/CalloutBlock';

const VARIANT_CONFIG: Record<
  CalloutVariant,
  { icon: LucideIcon; bg: string; border: string; iconColor: string; label: string }
> = {
  info: {
    icon: Info,
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-l-blue-400 dark:border-l-blue-500',
    iconColor: 'text-blue-500',
    label: 'Info',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-l-amber-400 dark:border-l-amber-500',
    iconColor: 'text-amber-500',
    label: 'Warning',
  },
  tip: {
    icon: Lightbulb,
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-l-emerald-400 dark:border-l-emerald-500',
    iconColor: 'text-emerald-500',
    label: 'Tip',
  },
  note: {
    icon: StickyNote,
    bg: 'bg-gray-50 dark:bg-slate-800/50',
    border: 'border-l-gray-400 dark:border-l-slate-500',
    iconColor: 'text-gray-500 dark:text-slate-400',
    label: 'Note',
  },
};

const CalloutBlockView: React.FC<NodeViewProps> = ({ node, updateAttributes }) => {
  const variant = (node.attrs.variant || 'info') as CalloutVariant;
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.info;
  const Icon = config.icon;

  return (
    <NodeViewWrapper
      className={`rounded-lg border-l-4 p-4 my-4 ${config.bg} ${config.border}`}
    >
      <div className="flex gap-3">
        <div contentEditable={false} className="flex flex-col items-center gap-2 flex-shrink-0">
          <Icon size={20} className={config.iconColor} />
          <select
            value={variant}
            onChange={(e) => updateAttributes({ variant: e.target.value })}
            className="text-[10px] bg-transparent border border-gray-300 dark:border-slate-600 rounded px-1 py-0.5 text-gray-500 dark:text-slate-400 cursor-pointer"
          >
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="tip">Tip</option>
            <option value="note">Note</option>
          </select>
        </div>
        <NodeViewContent className="flex-1 prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0" />
      </div>
    </NodeViewWrapper>
  );
};

export default CalloutBlockView;
