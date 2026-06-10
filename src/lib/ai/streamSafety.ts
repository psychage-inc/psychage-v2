/**
 * Sentence-boundary splitter for in-stream output safety (audit B3-2).
 *
 * Streaming chat must validate model output BEFORE it reaches the client, but a
 * regex safety check needs whole sentences, not partial tokens. This returns the
 * largest prefix of `buffer` that ends at a completed sentence boundary so the
 * caller can validate+flush it, while holding the trailing partial sentence.
 */

// A boundary is one or more terminators, optional closing quotes/brackets, then
// whitespace — the trailing whitespace proves the sentence is complete (so
// "3.14" or "Dr." mid-token are NOT treated as boundaries until streaming
// catches up). The final buffer flush bypasses this and validates the remainder.
const SENTENCE_BOUNDARY = /[.!?]+["')\]]*\s+/g;

export function splitAtSentenceBoundary(buffer: string): { ready: string; rest: string } {
  let lastEnd = -1;
  let match: RegExpExecArray | null;
  SENTENCE_BOUNDARY.lastIndex = 0;
  while ((match = SENTENCE_BOUNDARY.exec(buffer)) !== null) {
    lastEnd = match.index + match[0].length;
  }
  if (lastEnd === -1) {
    return { ready: '', rest: buffer };
  }
  return { ready: buffer.slice(0, lastEnd), rest: buffer.slice(lastEnd) };
}
