import { useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import Lenis from 'lenis';

const SCROLL_STORAGE_KEY = 'psychage_scroll_positions';
const MAX_ENTRIES = 30;

// Routes that should always scroll to top (never restore)
const ALWAYS_TOP_ROUTES = ['/', '/tools/symptom-navigator', '/clarity-score'];

function loadPositions(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(SCROLL_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function savePositions(map: Record<string, number>) {
  // Limit entries to prevent unbounded growth
  const keys = Object.keys(map);
  if (keys.length > MAX_ENTRIES) {
    const trimmed: Record<string, number> = {};
    keys.slice(-MAX_ENTRIES).forEach((k) => { trimmed[k] = map[k]; });
    sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(trimmed));
  } else {
    sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(map));
  }
}

/**
 * ScrollManager — global scroll behavior for the entire app.
 *
 * 1. Initializes Lenis for smooth wheel/touch scrolling.
 * 2. On route exit: saves current scroll position keyed by pathname.
 * 3. On route enter via back/forward (POP): restores saved position.
 * 4. On route enter via click (PUSH): scrolls to top.
 * 5. Hash navigation: smooth-scrolls to target element with header offset.
 */
export const ScrollManager = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname, search, hash } = useLocation();
  const navigationType = useNavigationType();
  const prevPathnameRef = useRef(pathname);
  const prevSearchRef = useRef(search);

  // ── Lenis initialization ──────────────────────────────────────────
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
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

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const scrollToPosition = useCallback((y: number) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(y, { immediate: true });
    } else {
      window.scrollTo(0, y);
    }
  }, []);

  const scrollToHashElement = useCallback((): boolean => {
    if (!hash) return false;
    try {
      const el = document.getElementById(hash.slice(1));
      if (!el) return false;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return true;
    } catch {
      return false;
    }
  }, [hash]);

  // ── Route-change scroll handling ──────────────────────────────────
  useEffect(() => {
    const isPathChange =
      prevPathnameRef.current !== pathname ||
      prevSearchRef.current !== search;

    // Save scroll position for the PREVIOUS route before updating refs
    if (isPathChange) {
      const prevPath = prevPathnameRef.current;
      const currentScroll = lenisRef.current?.scroll ?? window.scrollY;
      if (currentScroll > 0) {
        const positions = loadPositions();
        positions[prevPath] = currentScroll;
        savePositions(positions);
      }
    }

    prevPathnameRef.current = pathname;
    prevSearchRef.current = search;

    const delay = isPathChange ? 50 : 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    timeouts.push(
      setTimeout(() => {
        if (hash) {
          if (!scrollToHashElement()) {
            timeouts.push(
              setTimeout(() => {
                if (!scrollToHashElement()) scrollToTop();
              }, 800),
            );
          }
        } else if (
          navigationType === 'POP' &&
          !ALWAYS_TOP_ROUTES.includes(pathname)
        ) {
          // Back/forward navigation — try to restore position
          const positions = loadPositions();
          const saved = positions[pathname];
          if (saved != null && saved > 0) {
            scrollToPosition(saved);
            // Clean up consumed position
            delete positions[pathname];
            savePositions(positions);
          } else {
            scrollToTop();
          }
        } else {
          scrollToTop();
        }
      }, delay),
    );

    return () => timeouts.forEach(clearTimeout);
  }, [pathname, search, hash, navigationType, scrollToTop, scrollToPosition, scrollToHashElement]);

  return null;
};
