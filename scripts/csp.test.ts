// @vitest-environment node
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

// The enforced CSP is the <meta http-equiv> tag in index.html (the vercel.json
// header is Report-Only). It must allow exactly the third parties the app uses
// and nothing that was removed.

const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8');
const csp = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1] ?? '';
const directive = (name: string) =>
  csp.split(';').map(d => d.trim()).find(d => d.startsWith(`${name} `)) ?? '';

describe('enforced CSP (index.html)', () => {
  it('exists', () => {
    expect(csp).not.toBe('');
  });

  it('allows the privacy-enhanced YouTube embed and no other frame host', () => {
    expect(directive('frame-src')).toBe("frame-src 'self' https://www.youtube-nocookie.com");
  });

  it.each(['fonts.googleapis.com', 'fonts.gstatic.com', 'plausible.io', 'sentry.io', 'www.youtube.com'])(
    'does not allow %s',
    (host) => {
      expect(csp).not.toContain(host);
    },
  );
});
