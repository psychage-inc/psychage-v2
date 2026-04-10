 
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { List, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface TOCSection {
    id: string;
    title: string;
    level: 2 | 3;
}

interface TableOfContentsProps {
    sections?: TOCSection[];
    articleSelector?: string;
    /** Render as inline list (for sidebar). When false, renders the list without outer wrapper. */
    variant?: 'sidebar' | 'mobile';
}

/** Shared hook: scan headings + track active section */
function useTOCSections(propSections?: TOCSection[], articleSelector = 'article') {
    const [sections, setSections] = useState<TOCSection[]>(propSections || []);
    const [activeId, setActiveId] = useState<string>('');
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (propSections && propSections.length > 0) {
            setSections(propSections);
            return;
        }

        const scanHeadings = () => {
            const container = document.querySelector(articleSelector);
            if (!container) return;

            const headings = container.querySelectorAll('h2[id], h3[id]');
            const discovered: TOCSection[] = Array.from(headings).map((el) => ({
                id: el.id,
                title: el.textContent?.replace(/^\d+\.\s*/, '') || '',
                level: el.tagName === 'H2' ? 2 : 3,
            }));

            const sourcesEl = document.getElementById('sources-citations');
            if (sourcesEl) {
                discovered.push({ id: 'sources-citations', title: 'Sources & Citations', level: 2 });
            }

            setSections(discovered);
        };

        const timer = setTimeout(scanHeadings, 300);
        return () => clearTimeout(timer);
    }, [propSections, articleSelector]);

    useEffect(() => {
        if (sections.length === 0) return;
        observerRef.current?.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) setActiveId(visible[0].target.id);
            },
            { rootMargin: '-10% 0px -70% 0px' }
        );

        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observerRef.current!.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, [sections]);

    return { sections, activeId };
}

/** Renders the TOC link list (shared between sidebar + mobile) */
const TOCList: React.FC<{
    sections: TOCSection[];
    activeId: string;
    onNavigate?: () => void;
}> = ({ sections, activeId, onNavigate }) => {
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                onNavigate?.();
            }
        },
        [onNavigate]
    );

    return (
        <ul className="space-y-1 border-l border-border">
            {sections.map((section) => {
                const isActive = activeId === section.id;
                return (
                    <li key={section.id} className="-ml-px">
                        <a
                            href={`#${section.id}`}
                            onClick={(e) => handleClick(e, section.id)}
                            className={`
                                block text-sm py-1.5 transition-all duration-200
                                ${section.level === 3 ? 'pl-8 text-xs' : 'pl-4'}
                                ${
                                    isActive
                                        ? 'text-primary font-semibold border-l-2 border-primary'
                                        : 'text-text-secondary font-medium hover:text-primary hover:border-l-2 hover:border-primary/50'
                                }
                            `}
                        >
                            {section.title}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};

const TableOfContents: React.FC<TableOfContentsProps> = ({
    sections: propSections,
    articleSelector = 'article',
    variant = 'sidebar',
}) => {
    const { sections, activeId } = useTOCSections(propSections, articleSelector);

    if (sections.length === 0) return null;

    if (variant === 'sidebar') {
        return (
            <div className="hidden lg:block">
                <div className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-6">
                    Contents
                </div>
                <TOCList sections={sections} activeId={activeId} />

            </div>
        );
    }

    // Mobile variant — just the list
    return <TOCList sections={sections} activeId={activeId} />;
};

/** Floating mobile TOC button + bottom sheet */
const MobileTOC: React.FC<{ articleSelector?: string }> = ({ articleSelector = 'article' }) => {
    const [open, setOpen] = useState(false);
    const { sections, activeId } = useTOCSections(undefined, articleSelector);

    // Lock body scroll when open
    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    if (sections.length === 0) return null;

    const activeTitle = sections.find((s) => s.id === activeId)?.title;

    return (
        <>
            {/* Floating pill — bottom of screen, above MindMate FAB */}
            <button
                onClick={() => setOpen(true)}
                className="lg:hidden fixed bottom-20 left-4 z-[100] flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface border border-border shadow-lg shadow-black/10 text-sm font-medium text-text-primary hover:border-primary/40 transition-all"
                aria-label="Open table of contents"
            >
                <List size={16} className="text-primary shrink-0" />
                <span className="truncate max-w-[180px]">{activeTitle || 'Contents'}</span>
            </button>

            {/* Bottom sheet overlay */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 bg-black/40 z-[200]"
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="lg:hidden fixed bottom-0 left-0 right-0 z-[201] bg-surface rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto"
                        >
                            <div className="sticky top-0 bg-surface px-5 pt-4 pb-3 border-b border-border flex items-center justify-between">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-text-tertiary">
                                    On this page
                                </h3>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-hover transition-colors"
                                    aria-label="Close table of contents"
                                >
                                    <X size={18} className="text-text-tertiary" />
                                </button>
                            </div>
                            <div className="px-5 py-4">
                                <TOCList sections={sections} activeId={activeId} onNavigate={() => setOpen(false)} />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export { MobileTOC };
export default TableOfContents;
