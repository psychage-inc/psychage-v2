// =============================================================================
// In-stream output buffering (B3-2) — flush only completed sentences so the
// output safety validator can vet content before it reaches the client.
// =============================================================================

import { describe, it, expect } from 'vitest';
import { splitAtSentenceBoundary } from '@/lib/ai/streamSafety';

describe('splitAtSentenceBoundary', () => {
  it('flushes complete sentences and holds the trailing partial', () => {
    const { ready, rest } = splitAtSentenceBoundary('First idea. Second idea. Third partial');
    expect(ready).toBe('First idea. Second idea. ');
    expect(rest).toBe('Third partial');
  });

  it('holds everything when there is no sentence boundary yet', () => {
    const buffer = 'an unfinished thought with no terminator yet';
    const { ready, rest } = splitAtSentenceBoundary(buffer);
    expect(ready).toBe('');
    expect(rest).toBe(buffer);
  });

  it('treats a terminator followed by a closing quote as a boundary', () => {
    const { ready, rest } = splitAtSentenceBoundary('She said "stop." Then more');
    expect(ready).toBe('She said "stop." ');
    expect(rest).toBe('Then more');
  });

  it('does not split inside a decimal number', () => {
    const buffer = 'The dose is 2.5 mg today';
    const { ready, rest } = splitAtSentenceBoundary(buffer);
    expect(ready).toBe('');
    expect(rest).toBe(buffer);
  });

  it('handles stacked terminators (?!)', () => {
    const { ready, rest } = splitAtSentenceBoundary('Really?! Yes indeed');
    expect(ready).toBe('Really?! ');
    expect(rest).toBe('Yes indeed');
  });
});
