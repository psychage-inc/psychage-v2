import React, { useState, useCallback } from 'react';
import { Headphones, Minus, Plus, Type } from 'lucide-react';
import { cn } from '@/lib/utils';
import ArticleAudioPlayer from './ArticleAudioPlayer';

interface AccessibilityBarProps {
    audioUrl?: string;
    articleText?: string;
    articleTitle?: string;
    className?: string;
}

const FONT_SIZES = [
    { label: 'S', size: '1rem', lineHeight: '1.75' },
    { label: 'M', size: '1.125rem', lineHeight: '1.85' },
    { label: 'L', size: '1.25rem', lineHeight: '1.9' },
    { label: 'XL', size: '1.375rem', lineHeight: '1.95' },
] as const;

const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
    audioUrl,
    articleText,
    articleTitle,
    className = '',
}) => {
    const [showPlayer, setShowPlayer] = useState(false);
    const [fontSizeIndex, setFontSizeIndex] = useState(1); // Default: M (matches article-prose.css base)

    const adjustFontSize = useCallback(
        (direction: 'up' | 'down') => {
            const newIndex =
                direction === 'up'
                    ? Math.min(fontSizeIndex + 1, FONT_SIZES.length - 1)
                    : Math.max(fontSizeIndex - 1, 0);
            setFontSizeIndex(newIndex);

            // Apply to article prose container
            const proseEl = document.querySelector('.article-prose') as HTMLElement;
            if (proseEl) {
                proseEl.style.fontSize = FONT_SIZES[newIndex].size;
                proseEl.style.lineHeight = FONT_SIZES[newIndex].lineHeight;
            }
        },
        [fontSizeIndex],
    );

    const scrollToSummary = useCallback(() => {
        const summaryEl = document.getElementById('summary');
        if (summaryEl) {
            summaryEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            summaryEl.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
            setTimeout(() => {
                summaryEl.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
            }, 2000);
        }
    }, []);

    return (
        <div
            className={cn(
                'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60',
                className,
            )}
            role="toolbar"
            aria-label="Article accessibility tools"
        >
            <div className="container mx-auto max-w-content px-6">
                <div className="flex items-center gap-3 py-2 overflow-x-auto hide-scrollbar">
                    {/* Listen button */}
                    <button
                        onClick={() => setShowPlayer(!showPlayer)}
                        className={cn(
                            'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0',
                            showPlayer
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary',
                        )}
                    >
                        <Headphones size={16} />
                        <span className="hidden sm:inline">Listen to this article</span>
                        <span className="sm:hidden">Listen</span>
                    </button>

                    {/* Read summary */}
                    <button
                        onClick={scrollToSummary}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors shrink-0"
                    >
                        <span className="hidden sm:inline">Read Summary</span>
                        <span className="sm:hidden">Summary</span>
                    </button>

                    {/* Font size controls */}
                    <div className="flex items-center gap-1 ml-auto shrink-0">
                        <Type size={14} className="text-gray-400 mr-1" />
                        <button
                            onClick={() => adjustFontSize('down')}
                            disabled={fontSizeIndex === 0}
                            className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            aria-label="Decrease font size"
                        >
                            <Minus size={12} />
                        </button>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-5 text-center">
                            {FONT_SIZES[fontSizeIndex].label}
                        </span>
                        <button
                            onClick={() => adjustFontSize('up')}
                            disabled={fontSizeIndex === FONT_SIZES.length - 1}
                            className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            aria-label="Increase font size"
                        >
                            <Plus size={12} />
                        </button>
                    </div>
                </div>

                {/* Audio player (expandable) */}
                {showPlayer && (
                    <div className="pb-3">
                        <ArticleAudioPlayer
                            audioUrl={audioUrl}
                            articleText={articleText}
                            articleTitle={articleTitle}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccessibilityBar;
