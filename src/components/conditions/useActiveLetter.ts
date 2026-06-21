import { useEffect, useState } from 'react';

/**
 * Scroll-spy for the A–Z index. Observes each letter section (elements with
 * id `cond-letter-{LETTER}`) and returns the letter whose heading currently sits
 * nearest the top of the viewport — used to highlight the active letter on the rail.
 *
 * Re-initialises whenever the set of rendered letters changes (e.g. after filtering).
 */
export function useActiveLetter(letters: string[]): string | null {
    const [active, setActive] = useState<string | null>(letters[0] ?? null);
    const key = letters.join('');

    useEffect(() => {
        if (letters.length === 0) {
            setActive(null);
            return;
        }
        setActive((prev) => (prev && letters.includes(prev) ? prev : letters[0]));

        const tops = new Map<string, number>();
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const letter = (entry.target as HTMLElement).dataset.letter;
                    if (!letter) continue;
                    if (entry.isIntersecting) tops.set(letter, entry.boundingClientRect.top);
                    else tops.delete(letter);
                }
                if (tops.size === 0) return;
                let best: string | null = null;
                let bestTop = Infinity;
                for (const [letter, top] of tops) {
                    if (top < bestTop) {
                        bestTop = top;
                        best = letter;
                    }
                }
                if (best) setActive(best);
            },
            // Activation band sits just under the sticky header, in the top third.
            { rootMargin: '-88px 0px -65% 0px', threshold: 0 },
        );

        letters.forEach((letter) => {
            const el = document.getElementById(`cond-letter-${letter}`);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    return active;
}
