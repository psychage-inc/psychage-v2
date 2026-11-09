import { useRef } from 'react';

/**
 * Drag-vs-tap guard for horizontally-scrolling rows.
 *
 * Native overflow scroll still moves the row; this only suppresses the click a
 * drag-scroll would otherwise fire, so a swipe/drag on a touchscreen or hybrid
 * laptop scrolls the row instead of opening the item under the finger. A
 * stationary tap is left untouched and navigates as before.
 *
 * Spread the returned handlers onto the SCROLL CONTAINER (not the items):
 *
 *   const guard = useDragScrollGuard();
 *   <div className="... overflow-x-auto touch-pan-x" {...guard}>{items}</div>
 *
 * `onClickCapture` runs in the capture phase (ancestor → target), so it fires
 * before an item's own click handler. When a drag was detected it calls both:
 *   - preventDefault()  → kills the native <a href> navigation (React Router
 *                         <Link> renders a real anchor).
 *   - stopPropagation() → kills the React onClick (a plain <button> handler and
 *                         React Router's own Link onClick).
 * Both are required: without preventDefault the raw href would still trigger a
 * full-page navigation; without stopPropagation a button's navigate() would run.
 */
export function useDragScrollGuard(threshold = 8) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const moved = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
    moved.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (
      start.current &&
      Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y) > threshold
    ) {
      moved.current = true;
    }
  };

  const onPointerCancel = () => {
    // Browser claimed the gesture as a pan — treat it as a drag.
    moved.current = true;
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (moved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
    moved.current = false;
    start.current = null;
  };

  return { onPointerDown, onPointerMove, onPointerCancel, onClickCapture };
}
