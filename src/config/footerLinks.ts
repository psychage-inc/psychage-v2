/**
 * Mobile footer link/route data.
 *
 * MOBILE FOOTER ONLY. This mirrors the inline data in the desktop
 * `src/components/layout/Footer.tsx` (which is frozen and not exported). It is a
 * deliberate one-time copy so the mobile footer can stay decoupled from the
 * desktop one. If the desktop footer's link groups or routes change, keep this
 * in sync.
 */

export interface FooterLink {
  name: string;
  view: string;
  id?: string;
}

export interface FooterGroup {
  title: string;
  links: FooterLink[];
}

/** Resolve a footer link to a route. Mirror of desktop Footer.tsx `getPath`. */
export const getFooterPath = (view: string, id?: string): string => {
  if (view === 'home') return '/';
  if (view === 'category' && id) return `/learn/${id}`;
  if (view === 'clarity-score') return '/clarity-score';
  if (view === 'find-care' || view === 'providers') return '/providers';
  if (view === 'about') return '/about';
  if (view === 'contact') return '/contact';
  if (view === 'privacy') return '/legal/privacy';
  if (view === 'terms') return '/legal/terms';
  if (view === 'learn') return '/learn';
  if (view === 'tools') return '/tools';
  if (view === 'how-we-verify') return '/how-we-verify';
  return `/${view}`;
};

/** The four link groups, in display order. */
export const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: 'Learn',
    links: [
      { name: 'Anxiety & Stress', view: 'category', id: 'anxiety-stress' },
      { name: 'Depression & Grief', view: 'category', id: 'depression-grief' },
      { name: 'Trauma & Healing', view: 'category', id: 'trauma-healing' },
      { name: 'Relationships', view: 'category', id: 'relationships-communication' },
      { name: 'Self-Worth & Identity', view: 'category', id: 'self-worth-identity' },
      { name: 'Sleep & Body', view: 'category', id: 'sleep-body-connection' },
      { name: 'All Articles', view: 'learn' },
    ],
  },
  {
    title: 'Popular',
    links: [
      { name: 'Clarity Score™', view: 'clarity-score' },
      { name: 'Find a Provider', view: 'providers' },
      { name: 'How We Verify', view: 'how-we-verify' },
      { name: 'Articles', view: 'learn' },
      { name: 'Tools', view: 'tools' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', view: 'about' },
      { name: 'Advisory Board', view: 'advisory-board' },
      { name: 'Content Standards', view: 'content-standards' },
      { name: 'Contact Us', view: 'contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { name: 'Contact Support', view: 'contact' },
      { name: 'Crisis Resources', view: 'crisis' },
      { name: 'For Providers', view: 'for-providers' },
    ],
  },
];

/** Legal / utility links shown as a flat row below the groups. */
export const FOOTER_LEGAL_LINKS: { name: string; to: string }[] = [
  { name: 'Privacy', to: '/legal/privacy' },
  { name: 'Terms', to: '/legal/terms' },
  { name: 'Cookies', to: '/legal/privacy#cookies' },
  { name: 'Accessibility', to: '/legal/accessibility' },
  { name: 'Sitemap', to: '/sitemap' },
];

/** Non-diagnostic disclaimer (SR-3). */
export const FOOTER_DISCLAIMER: string[] = [
  'Psychage is an educational tool and does not provide medical advice, diagnosis, or treatment.',
  'Fully compliant with HIPAA and GDPR standards.',
];
