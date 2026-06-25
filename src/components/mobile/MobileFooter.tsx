import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import SocialIcons from '@/components/ui/SocialIcons';
import {
  FOOTER_GROUPS,
  FOOTER_LEGAL_LINKS,
  FOOTER_DISCLAIMER,
  getFooterPath,
} from '@/config/footerLinks';

/**
 * Mobile-native footer (≤639px). Mirrors the desktop Footer's content — link
 * groups, legal pages, disclaimer, brand — condensed into a stacked,
 * tap-to-expand accordion (native <details> for built-in a11y + keyboard).
 *
 * Crisis lives in the persistent mobile header, so it is intentionally NOT
 * repeated here. Mounted in App.tsx on phone only; sits in content flow before
 * the fixed bottom nav, so its last row carries extra bottom padding to clear
 * the 64px nav + the device safe-area inset.
 */
const MobileFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="border-t border-border bg-background px-4 pt-8 pb-[calc(5rem+env(safe-area-inset-bottom))] text-text-primary"
    >
      {/* Link groups — collapsible accordion */}
      <div className="divide-y divide-border">
        {FOOTER_GROUPS.map((group) => (
          <details key={group.title} className="group">
            <summary
              className={cn(
                'flex min-h-[44px] cursor-pointer select-none list-none items-center justify-between',
                'py-2 font-display text-sm font-semibold text-text-primary',
                '[&::-webkit-details-marker]:hidden',
              )}
            >
              {group.title}
              <ChevronDown
                size={18}
                aria-hidden
                className="text-text-tertiary transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
              />
            </summary>
            <ul className="pb-2">
              {group.links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={getFooterPath(link.view, link.id)}
                    className="flex min-h-[44px] items-center text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      {/* Legal / utility links */}
      <nav aria-label="Legal" className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
        {FOOTER_LEGAL_LINKS.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className="inline-flex min-h-[44px] items-center text-xs text-text-tertiary transition-colors hover:text-text-primary"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Social */}
      <div className="mt-4">
        <SocialIcons />
      </div>

      {/* Disclaimer + brand */}
      <div className="mt-6 space-y-2 border-t border-border pt-6">
        {FOOTER_DISCLAIMER.map((line) => (
          <p key={line} className="text-xs leading-relaxed text-text-tertiary">
            {line}
          </p>
        ))}
        <p className="text-xs text-text-tertiary">© {currentYear} Psychage, Inc.</p>
      </div>

      {/* Footer Watermark - decorative brand anchor (parity with desktop Footer) */}
      <div
        className="mt-6 flex w-full select-none items-end justify-center pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[clamp(2.5rem,15vw,6rem)] leading-none text-border dark:text-border tracking-tighter whitespace-nowrap">
          psychage
        </span>
      </div>
    </footer>
  );
};

export default MobileFooter;
