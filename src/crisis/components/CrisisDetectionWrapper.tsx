/**
 * CRISIS DETECTION WRAPPER
 *
 * Integration point — wraps any text input component in the Psychage platform.
 * Uses MutationObserver for zero-coupling detection.
 *
 * Apply to:
 * - AI Help Chatbot input
 * - Symptom Navigator text fields
 * - Clarity Score freetext inputs
 * - Daily check-in journal entries
 * - Community forum post composer (future)
 */

import React, { useEffect, useRef } from 'react';
import type { CrisisDetectionWrapperProps } from '../types/crisis.types';
import { useCrisisDetection } from '../hooks/useCrisisDetection';

export function CrisisDetectionWrapper({
  children,
  onTierDetected,
  locale,
  disabled = false,
}: CrisisDetectionWrapperProps) {
  const { detect } = useCrisisDetection(locale);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    // TODO: Set up MutationObserver to detect input changes
    // Debounce 300ms on onChange
    // Run final check on onSubmit (safety net)
    // Inject appropriate UI based on tier
  }, [disabled, detect]);

  return <div ref={wrapperRef}>{children}</div>;
}
