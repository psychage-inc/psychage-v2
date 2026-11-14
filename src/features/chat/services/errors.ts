/**
 * Typed errors for the MindMate chat surface.
 *
 * `MindMateUnavailableError` — thrown when `/api/ai/chat` returns a non-JSON
 * body or a JSON body without a structured `.error` field. This signals a
 * platform-level failure (cold-start crash, hard timeout before first SSE
 * byte, proxy 500) rather than a handler-returned error. Caught by
 * `useChat.ts` and the floating-widget `MindMate.tsx` catch blocks, which
 * swap in a graceful `MindMateUnavailableCard` instead of rendering raw
 * error text to users.
 *
 * `SafetyReplacementError` — thrown when the server-side output validator
 * replaces streamed content mid-flight with a safer alternative. Consumers
 * swap accumulated text for `replacementText` rather than appending.
 */

export class MindMateUnavailableError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'MindMateUnavailableError';
  }
}

export class SafetyReplacementError extends Error {
  readonly replacementText: string;
  constructor(replacementText: string) {
    super('Response replaced by safety filter');
    this.name = 'SafetyReplacementError';
    this.replacementText = replacementText;
  }
}

/**
 * `MindMateConsentRequiredError` — the server rejected the request because the
 * user has no current MindMate consent (403 CONSENT_REQUIRED, compliance
 * item 5). The chat surface goes back to the consent screen.
 */
export class MindMateConsentRequiredError extends Error {
  constructor() {
    super('MindMate consent required');
    this.name = 'MindMateConsentRequiredError';
  }
}

/** True when `err` is a MindMateConsentRequiredError (name check survives chunk splits). */
export function isConsentRequiredError(err: unknown): boolean {
  return err instanceof MindMateConsentRequiredError ||
    (err instanceof Error && err.name === 'MindMateConsentRequiredError');
}
