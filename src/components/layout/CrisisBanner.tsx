import React, { useMemo } from 'react';
import { Phone, MessageSquare, ExternalLink, MapPin, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { resolveCountry, getResourcesForCountry } from '@/lib/crisis';

const CrisisBanner: React.FC = () => {
  const { primaryPhone, primaryLabel, textAction, countryName } = useMemo(() => {
    const country = resolveCountry({ explicit: 'US' });
    const result = getResourcesForCountry(country);

    // Find best phone resource
    const hotline = result.all_resources.find((r) => r.phone && r.type === 'hotline');
    const phone = hotline?.phone ?? result.emergency_number;
    const label = hotline?.name ?? 'Emergency';

    // Find text resource if available
    const text = result.all_resources.find(
      (r) => r.type === 'text' && r.text_instruction
    );

    return {
      primaryPhone: phone,
      primaryLabel: label,
      textAction: text?.text_instruction ?? null,
      countryName: result.country.country_name,
    };
  }, []);

  const callHref = `tel:${primaryPhone.replace(/[^0-9+]/g, '')}`;

  return (
    <div className="bg-red-600 dark:bg-red-700 py-3 px-4 relative">
      <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: icon + message */}
        <div className="flex items-center gap-3 text-center sm:text-left min-w-0">
          <div className="bg-white/15 p-2 rounded-lg text-white hidden sm:flex shrink-0">
            <HeartHandshake size={18} />
          </div>
          <div className="flex items-center gap-2 flex-wrap text-sm">
            <span className="text-white/90 font-medium">
              24/7 Support
            </span>
            <span className="text-white/40 hidden sm:inline">|</span>
            <span className="text-white font-semibold">
              {primaryPhone}
            </span>
            <span className="text-white/70">
              ({primaryLabel})
            </span>
          </div>
        </div>

        {/* Right: country + actions */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden md:flex items-center gap-1.5 text-xs text-white/80 font-medium border border-white/30 rounded-full px-3 py-1">
            <MapPin size={12} />
            {countryName}
          </span>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Phone size={14} />}
            className="bg-white hover:bg-white/90 border-transparent text-red-600 shadow-sm text-xs font-semibold"
            onClick={() => window.open(callHref)}
          >
            Call Now
          </Button>

          {textAction ? (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<MessageSquare size={14} />}
              className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white/60 text-xs"
              onClick={() => {
                const num = textAction.match(/\d+/)?.[0];
                if (num) window.open(`sms:${num}`);
              }}
            >
              {textAction}
            </Button>
          ) : (
            <Link to="/crisis">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<ExternalLink size={14} />}
                className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white/60 text-xs"
              >
                Resources
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrisisBanner;
