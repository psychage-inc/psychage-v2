import React, { useEffect, useState } from 'react';
import { Wrench } from 'lucide-react';
import { toolService } from '@/services/toolService';
import type { Tool } from '@/types/models';
import { MobileToolCard } from '@/components/mobile/cards/MobileToolCard';

/**
 * Mobile Tools (route `/tools`). A phone-adapted bento grid over the full tool
 * registry — a 2-col layout with occasional full-width emphasis tiles, echoing
 * the desktop bento (`home/ToolsSection`) without porting it pixel-for-pixel.
 *
 * Foundation wraps this screen in the crisis header + bottom nav (the Tools tab
 * stays active on `/tools` exactly), so we render only the scroll body and own
 * the `px-4 py-6` padding. The tool list comes from `toolService`, never a
 * hardcoded copy; the tile (icon/route/coming-soon maps) lives in the shared
 * `MobileToolCard`, reused by the Home preview.
 */

// Deterministic bento rhythm: every 5th tile (incl. the first) spans full width.
// Index-based so it survives registry edits — no dependence on a specific tool.
const isFeatured = (index: number): boolean => index % 5 === 0;

const MobileToolsSkeleton: React.FC = () => (
    <div className="grid grid-cols-2 gap-3" aria-hidden>
        <div className="col-span-2 h-44 animate-pulse rounded-3xl bg-surface-hover" />
        {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-3xl bg-surface-hover" />
        ))}
    </div>
);

const MobileTools: React.FC = () => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        toolService
            .getAll()
            .then((data) => {
                if (!cancelled) setTools(data);
            })
            .catch((err) => {
                console.warn('[MobileTools] Failed to fetch tools:', err);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="px-4 py-6">
            <h1 className="font-display text-2xl font-semibold text-text-primary">Tools</h1>
            <p className="mt-1 text-sm text-text-secondary">
                Evidence-informed tools to understand and support your mental well-being.
            </p>

            <div className="mt-6">
                {isLoading ? (
                    <MobileToolsSkeleton />
                ) : tools.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                        {tools.map((tool, index) => (
                            <MobileToolCard key={tool.id} tool={tool} featured={isFeatured(index)} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-20 text-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-hover text-text-tertiary">
                            <Wrench size={24} aria-hidden />
                        </span>
                        <h2 className="mt-4 font-display text-lg font-semibold text-text-primary">
                            No tools to show right now
                        </h2>
                        <p className="mt-1 text-sm text-text-secondary">
                            Please check back in a little while.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileTools;
