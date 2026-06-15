import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { toolkitAdminService } from '@/services/toolkitAdminService';
import type { Toolkit } from '@/services/toolkitService';

/**
 * Admin toolkit review surface.
 *
 * Lists every toolkit with its status and the needs-clinical-review flag, and
 * exposes the ONE state change allowed: publishing a reviewed toolkit. Nothing
 * publishes automatically; RLS (is_admin_writer) is the real gate, so a viewer
 * sees the list but the publish call is denied server-side.
 */
const ToolkitReview: React.FC = () => {
    const [toolkits, setToolkits] = useState<Toolkit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [publishingId, setPublishingId] = useState<string | null>(null);

    const load = useCallback(async () => {
        setIsLoading(true);
        try {
            setToolkits(await toolkitAdminService.listAll());
        } catch {
            toast.error('Could not load toolkits.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const handlePublish = useCallback(async (toolkit: Toolkit) => {
        setPublishingId(toolkit.id);
        try {
            const updated = await toolkitAdminService.publish(toolkit.id);
            setToolkits((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
            toast.success(`Published “${toolkit.theme_title}”.`);
        } catch {
            toast.error('Publish failed. You may not have permission.');
        } finally {
            setPublishingId(null);
        }
    }, []);

    return (
        <div className="p-6">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Toolkit review</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
                    Review draft toolkits and publish when clinically approved. Publishing is the
                    only change made here.
                </p>
            </header>

            {isLoading ? (
                <div className="flex items-center gap-2 py-16 text-gray-500 dark:text-neutral-400">
                    <Loader2 size={18} className="animate-spin" /> Loading…
                </div>
            ) : toolkits.length === 0 ? (
                <p className="py-16 text-gray-500 dark:text-neutral-400">No toolkits yet.</p>
            ) : (
                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-800">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:bg-neutral-900 dark:text-neutral-400">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Toolkit</th>
                                <th className="px-4 py-3 font-semibold">Status</th>
                                <th className="px-4 py-3 font-semibold">Clinical review</th>
                                <th className="px-4 py-3 text-right font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                            {toolkits.map((toolkit) => {
                                const isPublished = toolkit.status === 'published';
                                return (
                                    <tr key={toolkit.id} className="bg-white dark:bg-neutral-950">
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {toolkit.theme_title}
                                            </div>
                                            {toolkit.clinical_subtitle && (
                                                <div className="text-xs text-gray-500 dark:text-neutral-400">
                                                    {toolkit.clinical_subtitle}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                    isPublished
                                                        ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'
                                                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                }`}
                                            >
                                                {isPublished ? 'Published' : 'In review'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-neutral-300">
                                            {toolkit.needs_clinical_review ? 'Needs review' : 'Cleared'}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {isPublished ? (
                                                <span className="inline-flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400">
                                                    <CheckCircle2 size={14} /> Live
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handlePublish(toolkit)}
                                                    disabled={publishingId === toolkit.id}
                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-teal-700 disabled:opacity-60"
                                                >
                                                    {publishingId === toolkit.id && (
                                                        <Loader2 size={14} className="animate-spin" />
                                                    )}
                                                    Publish
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ToolkitReview;
