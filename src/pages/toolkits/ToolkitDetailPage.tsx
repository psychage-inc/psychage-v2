import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ToolkitDisclaimer from '@/components/toolkits/ToolkitDisclaimer';
import ToolkitItemRow from '@/components/toolkits/ToolkitItemRow';
import { toolkitService, type ToolkitWithItems } from '@/services/toolkitService';

/**
 * Toolkit detail. Renders the intro and the ordered items, each deep-linking
 * through the item registry. SR-3 non-diagnostic framing and SR-2 crisis-aware
 * notice are carried by <ToolkitDisclaimer />. A toolkit that is not readable
 * (still in review, or missing) shows a neutral not-found state, never an error.
 */
const ToolkitDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [toolkit, setToolkit] = useState<ToolkitWithItems | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let active = true;
        (async () => {
            const data = id ? await toolkitService.getById(id) : null;
            if (active) {
                setToolkit(data);
                setIsLoading(false);
            }
        })();
        return () => {
            active = false;
        };
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background px-6 pb-12 pt-32 text-center text-text-secondary">
                Loading…
            </div>
        );
    }

    if (!toolkit) {
        return (
            <div className="min-h-screen bg-background px-6 pb-12 pt-32">
                <div className="mx-auto max-w-md text-center">
                    <h1 className="mb-3 font-display text-2xl font-bold text-text-primary">
                        This toolkit isn&apos;t available
                    </h1>
                    <p className="mb-6 text-text-secondary">
                        It may have moved or isn&apos;t ready yet.
                    </p>
                    <Link
                        to="/toolkits"
                        className="inline-flex items-center gap-2 font-bold text-teal-600 hover:underline dark:text-teal-400"
                    >
                        <ArrowLeft size={18} aria-hidden="true" />
                        Back to toolkits
                    </Link>
                </div>
            </div>
        );
    }

    const introParagraphs = (toolkit.intro_md ?? '')
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <div className="min-h-screen bg-background px-6 pb-16 pt-24">
            <SEO
                title={`${toolkit.theme_title} | Toolkits | Psychage`}
                description={toolkit.clinical_subtitle ?? 'An educational toolkit from Psychage.'}
            />
            <div className="container mx-auto max-w-3xl">
                <div className="mb-8">
                    <Breadcrumbs />
                </div>

                <Link
                    to="/toolkits"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-teal-600"
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    All toolkits
                </Link>

                <header className="mb-6">
                    <h1 className="mb-2 font-display text-3xl font-bold text-text-primary md:text-4xl">
                        {toolkit.theme_title}
                    </h1>
                    {toolkit.clinical_subtitle && (
                        <p className="text-base font-medium text-text-tertiary">
                            {toolkit.clinical_subtitle}
                        </p>
                    )}
                </header>

                {introParagraphs.length > 0 && (
                    <div className="mb-8 space-y-4 text-lg leading-relaxed text-text-secondary">
                        {introParagraphs.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>
                )}

                <div className="mb-8">
                    <ToolkitDisclaimer />
                </div>

                <h2 className="mb-4 font-display text-xl font-bold text-text-primary">
                    What&apos;s inside
                </h2>
                <div className="space-y-3">
                    {toolkit.items.map((item) => (
                        <ToolkitItemRow key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ToolkitDetailPage;
