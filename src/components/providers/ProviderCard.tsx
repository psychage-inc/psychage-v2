import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ShieldCheck, CreditCard, Video, Clock } from 'lucide-react';
import { Provider } from '../../types/models';
import Badge from '../ui/Badge';
import { hoverLift } from '../../lib/animations';
import Button from '../ui/Button';
import { Link, useNavigate } from 'react-router-dom';

// Default fallback avatar
const FallbackAvatar: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
    <div className={`bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center ${className}`}>
        <span className="text-white font-bold text-xl">
            {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
        </span>
    </div>
);

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      {...hoverLift}
      className="bg-surface rounded-2xl p-6 border border-border shadow-sm hover:shadow-xl hover:border-teal-100 dark:hover:border-teal-900 transition-all duration-300 flex flex-col h-full group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          {!imageError && provider.image ? (
            <img
              src={provider.image}
              alt={provider.name}
              loading="lazy"
              className="w-20 h-20 rounded-full object-cover border-2 border-surface shadow-md"
              onError={() => setImageError(true)}
            />
          ) : (
            <FallbackAvatar name={provider.name} className="w-20 h-20 rounded-full border-2 border-surface shadow-md" />
          )}
          {provider.verified && (
            <div className="absolute -bottom-1 -right-1 bg-surface rounded-full p-1 shadow-sm">
              <ShieldCheck size={16} className="text-teal-500 fill-teal-50 dark:fill-teal-900/30" />
            </div>
          )}
        </div>

        <div>
          <Link to={`/providers/${provider.id}`} className="hover:underline decoration-teal-500 decoration-2 underline-offset-2">
            <h3 className="font-display font-bold text-lg text-text-primary leading-tight">
              {provider.name}
            </h3>
          </Link>
          <p className="text-sm text-text-tertiary font-medium mb-1">{provider.role}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {provider.specialties.slice(0, 3).map(spec => (
          <Badge key={spec} variant="neutral" className="bg-surface text-text-secondary border border-border">
            {spec}
          </Badge>
        ))}
        {provider.specialties.length > 3 && (
          <Badge variant="neutral" className="bg-surface text-text-tertiary border border-border">
            +{provider.specialties.length - 3}
          </Badge>
        )}
      </div>

      <div className="space-y-3 mb-6 flex-grow">
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <MapPin size={16} className="text-text-tertiary" />
          <span>{provider.location}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <Calendar size={16} className="text-text-tertiary" />
          <span className={provider.availability.includes('week') || provider.availability.includes('tomorrow') ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
            {provider.availability}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <CreditCard size={16} className="text-text-tertiary" />
          <span className="truncate">{provider.insurance.slice(0, 2).join(", ")}{provider.insurance.length > 2 && "..."}</span>
        </div>

        {/* Badges Row */}
        <div className="flex gap-2 mt-2">
          {provider.isVideoVisit && (
            <div className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-md">
              <Video size={12} />
              Video Visit
            </div>
          )}
          {provider.nextAvailable && (
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
              <Clock size={12} />
              Next: {provider.nextAvailable.split(',')[0]}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-auto">
        <Button
          onClick={() => navigate(`/providers/${provider.id}`)}
          className="flex-1 h-10 text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white"
        >
          View Profile
        </Button>
        <Button variant="outline" className="h-10 px-3 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/20">
          Book
        </Button>
      </div>
    </motion.div>
  );
};

export default ProviderCard;