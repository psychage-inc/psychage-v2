import React, { useMemo } from 'react';
import { Phone, MessageSquare, ExternalLink, MapPin, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { resolveCountry, getResourcesForCountry } from '@/lib/crisis';

const CrisisBanner: React.FC = () => {
  const { primaryPhone, primaryLabel, textAction, countryName } = useMemo(() => {
    const country = resolveCountry();
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
    <div className="bg-white border-b border-gray-100 py-3 px-4 relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-400 via-teal-500 to-teal-400" />
      <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: icon + message */}
        <div className="flex items-center gap-3 text-center sm:text-left min-w-0">
          <div className="bg-teal-50 p-2 rounded-lg text-teal-600 hidden sm:flex shrink-0">
            <HeartHandshake size={18} />
          </div>
          <div className="flex items-center gap-2 flex-wrap text-sm">
            <span className="text-gray-500 font-medium">
              24/7 Support
            </span>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <span className="text-gray-900 font-semibold">
              {primaryPhone}
            </span>
            <span className="text-gray-400">
              ({primaryLabel})
            </span>
          </div>
        </div>

        {/* Right: country + actions */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden md:flex items-center gap-1.5 text-xs text-gray-400 font-medium border border-gray-100 rounded-full px-3 py-1">
            <MapPin size={12} />
            {countryName}
          </span>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Phone size={14} />}
            className="bg-teal-600 hover:bg-teal-700 border-transparent text-white shadow-sm text-xs"
            onClick={() => window.open(callHref)}
          >
            Call Now
          </Button>

          {textAction ? (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<MessageSquare size={14} />}
              className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 text-xs"
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
                className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 text-xs"
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
