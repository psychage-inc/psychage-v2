import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

/**
 * ScrollManager — global scroll behavior for the entire app.
 *
 * 1. Initializes Lenis for smooth wheel/touch scrolling.
 * 2. On every route change (pathname or search):
 *    - Scrolls to top instantly (bypassing Lenis animation).
 *    - Waits for page-transition exit animation (200ms) before scrolling
 *      so the user doesn't see the old page jump.
 * 3. On hash navigation:
 *    - Smooth-scrolls to the target element (with header offset).
 *    - If element not yet in DOM (lazy-loaded), retries once after 800ms.
 *    - Falls back to top if element is never found.
 * 4. Same-page hash changes scroll immediately (no exit-animation delay).
 */
export const ScrollManager = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname, search, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);
  const prevSearchRef = useRef(search);

  // ── Lenis initialization ──────────────────────────────────────────
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let frameId: number;
    function raf(time: number) {
      lenisRef.current?.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenisRef.current?.destroy();
    };
  }, []);

  // ── Route-change scroll handling ──────────────────────────────────
  useEffect(() => {
    const isPathChange =
      prevPathnameRef.current !== pathname ||
      prevSearchRef.current !== search;

    prevPathnameRef.current = pathname;
    prevSearchRef.current = search;

    // Delay for route changes so the exit animation (200ms) finishes first.
    // Same-page hash changes scroll immediately.
    const delay = isPathChange ? 250 : 0;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const scrollToTop = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    };

    const scrollToHashElement = (): boolean => {
      if (!hash) return false;
      try {
        const el = document.getElementById(hash.slice(1));
        if (!el) return false;

        if (lenisRef.current) {
          // offset accounts for fixed navigation header
          lenisRef.current.scrollTo(el, { offset: -80 });
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return true;
      } catch {
        return false;
      }
    };

    timeouts.push(
      setTimeout(() => {
        if (hash) {
          if (!scrollToHashElement()) {
            // Element not yet in DOM (lazy-loaded content) — retry once
            timeouts.push(
              setTimeout(() => {
                if (!scrollToHashElement()) scrollToTop();
              }, 800),
            );
          }
        } else {
          scrollToTop();
        }
      }, delay),
    );

    return () => timeouts.forEach(clearTimeout);
  }, [pathname, search, hash]);

  return null;
};
