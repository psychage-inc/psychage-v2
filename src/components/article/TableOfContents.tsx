import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface TOCSection {
    id: string;
    title: string;
    level: 2 | 3;
}

interface TableOfContentsProps {
    sections?: TOCSection[];
    articleSelector?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
    sections: propSections,
    articleSelector = 'article',
}) => {
    const [sections, setSections] = useState<TOCSection[]>(propSections || []);
    const [activeId, setActiveId] = useState<string>('');
    const observerRef = useRef<IntersectionObserver | null>(null);
    const navigate = useNavigate();

    // Scan DOM for headings if no sections prop provided
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

            // Add Sources & Citations as final entry
            const sourcesEl = document.getElementById('sources-citations');
            if (sourcesEl) {
                discovered.push({
                    id: 'sources-citations',
                    title: 'Sources & Citations',
                    level: 2,
                });
            }

            setSections(discovered);
        };

        // Delay to let article content render
        const timer = setTimeout(scanHeadings, 300);
        return () => clearTimeout(timer);
    }, [propSections, articleSelector]);

    // IntersectionObserver for active section tracking
    useEffect(() => {
        if (sections.length === 0) return;

        observerRef.current?.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                // Find the topmost visible entry
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            { rootMargin: '-10% 0px -70% 0px' }
        );

        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observerRef.current!.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, [sections]);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        []
    );

    if (sections.length === 0) return null;

    return (
        <div className="hidden lg:block">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
                Contents
            </div>
            <ul className="space-y-1 border-l border-gray-100 dark:border-gray-800">
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
                                            ? 'text-teal-600 dark:text-teal-400 font-semibold border-l-2 border-teal-500'
                                            : 'text-gray-500 dark:text-gray-400 font-medium hover:text-teal-600 dark:hover:text-teal-400 hover:border-l-2 hover:border-teal-500/50'
                                    }
                                `}
                            >
                                {section.title}
                            </a>
                        </li>
                    );
                })}
            </ul>

            {/* Find Provider CTA */}
            <div className="mt-12 p-6 bg-teal-50 dark:bg-teal-900/20 rounded-2xl border border-teal-100 dark:border-teal-800/30">
                <h4 className="font-bold text-teal-900 dark:text-teal-100 mb-2 text-sm">
                    Need professional help?
                </h4>
                <p className="text-xs text-teal-700/80 dark:text-teal-300/60 mb-4 leading-relaxed">
                    Find verified therapists specializing in your area of need.
                </p>
                <button
                    onClick={() => navigate('/providers')}
                    className="w-full py-2 bg-teal-600 text-white rounded-lg text-xs font-bold hover:bg-teal-700 transition-colors"
                >
                    Find Provider
                </button>
            </div>
        </div>
    );
};

export default TableOfContents;
