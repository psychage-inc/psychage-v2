import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

interface AlphabetRailProps {
    /** Full A–Z (and any extra buckets) in display order. */
    letters: string[];
    /** Letters that currently have at least one visible condition. */
    enabled: Set<string>;
    /** The letter section nearest the top of the viewport. */
    active: string | null;
    /** Jump to a letter section. */
    onJump: (letter: string) => void;
    orientation?: 'vertical' | 'horizontal';
    className?: string;
}

/**
 * The sticky alphabet rail. Letters with no conditions are dimmed and skipped by
 * keyboard navigation. Roving tab index keeps a single tab stop; Arrow/Home/End move
 * between enabled letters and jump to the matching section.
 */
const AlphabetRail: React.FC<AlphabetRailProps> = ({
    letters,
    enabled,
    active,
    onJump,
    orientation = 'vertical',
    className,
}) => {
    const refs = useRef<Record<string, HTMLButtonElement | null>>({});
    const enabledLetters = letters.filter((l) => enabled.has(l));
    // The single tab stop: the active letter if enabled, else the first enabled letter.
    const tabStop = active && enabled.has(active) ? active : enabledLetters[0] ?? null;

    const focusAndJump = (letter: string) => {
        refs.current[letter]?.focus();
        onJump(letter);
    };

    const handleKeyDown = (e: React.KeyboardEvent, letter: string) => {
        const i = enabledLetters.indexOf(letter);
        if (i === -1) return;
        const prevKeys = orientation === 'vertical' ? ['ArrowUp', 'ArrowLeft'] : ['ArrowLeft', 'ArrowUp'];
        const nextKeys = orientation === 'vertical' ? ['ArrowDown', 'ArrowRight'] : ['ArrowRight', 'ArrowDown'];

        if (nextKeys.includes(e.key)) {
            e.preventDefault();
            focusAndJump(enabledLetters[Math.min(i + 1, enabledLetters.length - 1)]);
        } else if (prevKeys.includes(e.key)) {
            e.preventDefault();
            focusAndJump(enabledLetters[Math.max(i - 1, 0)]);
        } else if (e.key === 'Home') {
            e.preventDefault();
            focusAndJump(enabledLetters[0]);
        } else if (e.key === 'End') {
            e.preventDefault();
            focusAndJump(enabledLetters[enabledLetters.length - 1]);
        }
    };

    return (
        <nav
            aria-label="Jump to conditions by letter"
            className={cn(
                orientation === 'vertical'
                    ? 'flex flex-col items-center gap-0.5'
                    : 'flex flex-row items-center gap-0.5 overflow-x-auto scrollbar-hide px-1',
                className,
            )}
        >
            {letters.map((letter) => {
                const isEnabled = enabled.has(letter);
                const isActive = active === letter && isEnabled;
                return (
                    <button
                        key={letter}
                        ref={(el) => {
                            refs.current[letter] = el;
                        }}
                        type="button"
                        disabled={!isEnabled}
                        aria-current={isActive ? 'true' : undefined}
                        aria-label={isEnabled ? `Jump to ${letter}` : `${letter}, no conditions`}
                        tabIndex={letter === tabStop ? 0 : -1}
                        onClick={() => isEnabled && onJump(letter)}
                        onKeyDown={(e) => handleKeyDown(e, letter)}
                        className={cn(
                            'flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[0.78rem] font-semibold tabular-nums',
                            'transition-colors duration-150 motion-reduce:transition-none',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background',
                            isActive && 'bg-primary text-white shadow-sm',
                            !isActive && isEnabled && 'text-text-secondary hover:bg-primary/10 hover:text-primary',
                            !isEnabled && 'cursor-default text-text-tertiary/35',
                        )}
                    >
                        {letter}
                    </button>
                );
            })}
        </nav>
    );
};

export default AlphabetRail;
