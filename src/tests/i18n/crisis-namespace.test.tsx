/**
 * Crisis i18n namespace — Wave 2 guard tests.
 *
 * Verifies (1) every crisis.* key referenced across the 14 wired components
 * exists in EN, (2) pt/es/sv/fr carry the identical key-set as PENDING stubs,
 * and (3) representative components render their EN strings unchanged.
 */
import React from 'react';
import fs from 'fs';
import path from 'path';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { CrisisResourceCard } from '@/components/navigator/CrisisResourceCard';
import type { CrisisResource } from '@/lib/navigator/types';
import en from '@/locales/en/translation.json';
import pt from '@/locales/pt/translation.json';
import es from '@/locales/es/translation.json';
import sv from '@/locales/sv/translation.json';
import fr from '@/locales/fr/translation.json';

// The 14 wired crisis components (paths relative to src/).
const COMPONENT_FILES = [
  'components/layout/CrisisBanner.tsx',
  'components/pages/CrisisPage.tsx',
  'components/screens/CrisisResourcesScreen.tsx',
  'features/chat/components/CrisisOverlay.tsx',
  'features/crisis/components/CrisisSupportModalContent.tsx',
  'components/navigator/CrisisStickyBanner.tsx',
  'components/navigator/CrisisOverlay.tsx',
  'components/navigator/CrisisResourceCard.tsx',
  'components/layout/CrisisResources.tsx',
  'components/article/CrisisResourceBanner.tsx',
  'components/tools/ClarityJournal/components/CrisisCallout.tsx',
  'components/tools/ClarityJournal/v2-sections/CrisisOverlay.tsx',
  'components/tools/ClarityScore/results/components/CrisisUrgentBanner.tsx',
  'components/tools/SleepArchitect/shared/CrisisAlert.tsx',
];

type AnyObj = Record<string, unknown>;

function resolve(obj: AnyObj, dotted: string): unknown {
  return dotted.split('.').reduce<unknown>((o, k) => (o == null ? undefined : (o as AnyObj)[k]), obj);
}

function leafKeys(obj: AnyObj, prefix = ''): Set<string> {
  const out = new Set<string>();
  for (const [k, v] of Object.entries(obj)) {
    if (k === '_meta') continue; // stub marker, not a content key
    if (v && typeof v === 'object') {
      for (const child of leafKeys(v as AnyObj, prefix + k + '.')) out.add(child);
    } else {
      out.add(prefix + k);
    }
  }
  return out;
}

describe('crisis i18n namespace — key integrity', () => {
  it('EN defines every statically-referenced crisis.* key in the 14 components', () => {
    const referenced = new Set<string>();
    for (const rel of COMPONENT_FILES) {
      const src = fs.readFileSync(path.resolve(process.cwd(), 'src', rel), 'utf8');
      for (const m of src.matchAll(/['"`](crisis\.[a-zA-Z0-9_.]+)['"`]/g)) {
        const key = m[1];
        if (key.endsWith('.')) continue; // template-literal prefix (severity), asserted below
        referenced.add(key);
      }
    }
    // Sanity: we expect a substantial number of distinct keys wired.
    expect(referenced.size).toBeGreaterThan(60);
    const missing = [...referenced].filter((k) => typeof resolve(en as AnyObj, k) !== 'string');
    expect(missing).toEqual([]);
  });

  it('EN defines the dynamic severity title/subtitle keys (built via template literal)', () => {
    for (const sev of ['watch', 'urgent', 'crisis']) {
      expect(typeof resolve(en as AnyObj, `crisis.supportModal.${sev}_title`)).toBe('string');
      expect(typeof resolve(en as AnyObj, `crisis.supportModal.${sev}_subtitle`)).toBe('string');
    }
  });

  it('pt/es/sv/fr carry the identical crisis key-set as EN, with PENDING _meta', () => {
    const enKeys = leafKeys((en as AnyObj).crisis as AnyObj);
    for (const [name, loc] of [['pt', pt], ['es', es], ['sv', sv], ['fr', fr]] as const) {
      const crisis = (loc as AnyObj).crisis as AnyObj;
      const locKeys = leafKeys(crisis);
      const missing = [...enKeys].filter((k) => !locKeys.has(k));
      const extra = [...locKeys].filter((k) => !enKeys.has(k));
      expect({ name, missing }).toEqual({ name, missing: [] });
      expect({ name, extra }).toEqual({ name, extra: [] });
      const status = (crisis._meta as AnyObj)?._translation_status as string;
      expect(status).toMatch(/^PENDING —/);
    }
  });
});

describe('crisis i18n namespace — EN render output unchanged', () => {
  it('CrisisBanner renders its EN strings via t()', async () => {
    vi.resetModules();
    vi.doMock('framer-motion', () => ({
      AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
      motion: { div: ({ children, ...p }: AnyObj) => <div {...p}>{children as React.ReactNode}</div> },
    }));
    vi.doMock('@/lib/crisis', () => ({
      resolveCountry: () => 'US',
      getResourcesForCountry: () => ({
        emergency_number: '911',
        all_resources: [{ name: '988 Suicide & Crisis Lifeline', type: 'hotline', phone: '988' }],
      }),
    }));
    const { default: CrisisBanner } = await import('@/components/layout/CrisisBanner');
    render(
      <MemoryRouter>
        <CrisisBanner />
      </MemoryRouter>,
    );
    expect(screen.getByText('24/7 Crisis Support')).toBeInTheDocument();
    expect(screen.getByText('Call Now')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByLabelText('Dismiss crisis support notification')).toBeInTheDocument();
    vi.doUnmock('framer-motion');
    vi.doUnmock('@/lib/crisis');
  });

  it('CrisisResourceCard resolves action + 24/7 badge text from the crisis namespace', () => {
    const resource: CrisisResource = {
      id: 'r1',
      region_code: 'US',
      name: '988 Suicide & Crisis Lifeline',
      type: 'hotline',
      phone: '988',
      text_instruction: null,
      url: null,
      email: null,
      description: 'National hotline',
      hours: '24/7',
      languages: ['English'],
      priority: 1,
      condition_specific: null,
      is_active: true,
      last_verified: null,
    };
    render(<CrisisResourceCard resource={resource} />);
    expect(screen.getByText('Call Now')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();
  });
});
