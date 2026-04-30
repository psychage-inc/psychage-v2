import React from 'react';
import { Twitter, Instagram, Linkedin, Youtube, type LucideIcon } from 'lucide-react';

type Platform = 'twitter' | 'instagram' | 'linkedin' | 'youtube';

export interface SocialLinks {
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
}

interface SocialIconsProps {
  links?: SocialLinks;
  className?: string;
  iconSize?: number;
}

const DEFAULTS: Record<Platform, string> = {
  twitter: 'https://twitter.com/psychage',
  instagram: 'https://instagram.com/psychage',
  linkedin: 'https://linkedin.com/company/psychage',
  youtube: 'https://youtube.com/@psychage',
};

const META: Record<Platform, { label: string; Icon: LucideIcon }> = {
  twitter: { label: 'Twitter', Icon: Twitter },
  instagram: { label: 'Instagram', Icon: Instagram },
  linkedin: { label: 'LinkedIn', Icon: Linkedin },
  youtube: { label: 'YouTube', Icon: Youtube },
};

const SocialIcons: React.FC<SocialIconsProps> = ({ links, className = '', iconSize = 18 }) => {
  const platforms: Platform[] = ['twitter', 'instagram', 'linkedin', 'youtube'];

  const resolved = platforms
    .map((p) => {
      const override = links?.[p];
      if (override === null) return null;
      const href = override ?? DEFAULTS[p];
      return { platform: p, href };
    })
    .filter((entry): entry is { platform: Platform; href: string } => entry !== null);

  return (
    <ul role="list" className={`flex items-center gap-5 ${className}`.trim()}>
      {resolved.map(({ platform, href }) => {
        const { label, Icon } = META[platform];
        return (
          <li key={platform}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-tertiary hover:text-text-primary transition-colors duration-300 inline-flex"
            >
              <Icon size={iconSize} />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialIcons;
