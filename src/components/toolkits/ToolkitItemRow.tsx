import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, MessageCircle, Sparkles } from 'lucide-react';
import { resolveToolkitRef, type ToolkitItemKind } from '@/lib/toolkitRegistry';
import type { ToolkitItem } from '@/services/toolkitService';

const KIND_META: Record<ToolkitItemKind, { label: string; Icon: typeof Compass }> = {
    tool: { label: 'Tool', Icon: Compass },
    article: { label: 'Read', Icon: BookOpen },
    term: { label: 'Plain words', Icon: MessageCircle },
    strategy: { label: 'Strategy', Icon: Sparkles },
};

/**
 * Renders one toolkit item. Items whose target is not built yet (resolved via the
 * registry) render as a disabled "coming soon" entry — never a broken link.
 */
const ToolkitItemRow: React.FC<{ item: ToolkitItem; onOpen?: () => void }> = ({ item, onOpen }) => {
    const { href, available } = resolveToolkitRef(item.ref_id);
    const meta = KIND_META[item.kind] ?? KIND_META.tool;
    const { Icon } = meta;

    const inner = (
        <>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-hover text-text-secondary">
                <Icon size={20} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold uppercase tracking-wider text-text-tertiary">
                    {meta.label}
                </span>
                <span className="block truncate font-bold text-text-primary">{item.label}</span>
            </span>
        </>
    );

    if (!available || !href) {
        return (
            <div
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 opacity-70"
                aria-disabled="true"
            >
                {inner}
                <span className="shrink-0 rounded-full bg-surface-hover px-3 py-1 text-xs font-bold text-text-tertiary">
                    Coming soon
                </span>
            </div>
        );
    }

    return (
        <Link
            to={href}
            onClick={onOpen}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm transition-all hover:border-teal-500/40 hover:shadow-md"
        >
            {inner}
            <ArrowRight
                size={18}
                className="shrink-0 text-text-tertiary transition-transform group-hover:translate-x-0.5 group-hover:text-teal-600"
                aria-hidden="true"
            />
        </Link>
    );
};

export default ToolkitItemRow;
