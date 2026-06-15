import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ToolkitDisclaimer from '@/components/toolkits/ToolkitDisclaimer';
import { toolkitService, type Toolkit } from '@/services/toolkitService';

/**
 * Toolkits index. Lists published toolkits only (RLS enforces this server-side).
 * While the starter set is still in review, this page renders its empty state —
 * nothing in review is exposed on any public surface.
 */
const ToolkitsIndexPage: React.FC = () => {
    const [toolkits, setToolkits] = useState<Toolkit[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let active = true;
        (async () => {
            const data = await toolkitService.listPublished();
            if (active) {
                setToolkits(data);
                setIsLoading(false);
            }
        })();
        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="min-h-screen bg-background px-6 pb-12 pt-24">
            <SEO
                title="Toolkits | Psychage"
                description="Guided collections of educational tools and skills people use for common experiences like worry, low mood, and stress."
            />
            <div className="container mx-auto max-w-5xl">
                <div className="mb-8">
                    <Breadcrumbs />
                </div>

                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <h1 className="mb-4 font-display text-4xl font-bold text-text-primary md:text-5xl">
                        Toolkits
                    </h1>
                    <p className="text-lg leading-relaxed text-text-secondary">
                        Each toolkit gathers skills and ideas people often find helpful for a common
                        experience. Take what helps and leave the rest.
                    </p>
                </div>

                <div className="mx-auto mb-10 max-w-2xl">
                    <ToolkitDisclaimer />
                </div>

                {isLoading ? (
                    <div className="py-16 text-center text-text-secondary">Loading…</div>
                ) : toolkits.length === 0 ? (
                    <div className="mx-auto max-w-md py-16 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-hover text-text-tertiary">
                            <Compass size={24} aria-hidden="true" />
                        </div>
                        <h2 className="mb-2 text-lg font-bold text-text-primary">
                            New toolkits are on the way
                        </h2>
                        <p className="text-text-secondary">
                            We&apos;re putting these together with care. Check back soon.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {toolkits.map((toolkit, index) => (
                            <motion.div
                                key={toolkit.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                            >
                                <Link
                                    to={`/toolkits/${toolkit.id}`}
                                    className="group flex h-full flex-col rounded-3xl border border-border bg-surface p-8 shadow-sm transition-all hover:shadow-xl"
                                >
                                    <h2 className="mb-2 font-display text-2xl font-bold text-text-primary transition-colors group-hover:text-teal-600">
                                        {toolkit.theme_title}
                                    </h2>
                                    {toolkit.clinical_subtitle && (
                                        <p className="mb-4 text-sm font-medium text-text-tertiary">
                                            {toolkit.clinical_subtitle}
                                        </p>
                                    )}
                                    <span className="mt-auto inline-flex items-center gap-2 font-bold text-teal-600 dark:text-teal-400">
                                        Open toolkit
                                        <ArrowRight
                                            size={18}
                                            className="transition-transform group-hover:translate-x-0.5"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToolkitsIndexPage;
