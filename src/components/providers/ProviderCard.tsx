import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, ShieldCheck, CreditCard, Video, Clock } from 'lucide-react';
import { Provider } from '../../types/models';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Link, useNavigate } from 'react-router-dom';

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-teal-100 dark:hover:border-teal-900 transition-all duration-300 flex flex-col h-full group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img
            src={provider.image}
            alt={provider.name}
            loading="lazy"
            className="w-20 h-20 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md"
          />
          {provider.verified && (
            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm">
              <ShieldCheck size={16} className="text-teal-500 fill-teal-50 dark:fill-teal-900/30" />
            </div>
          )}
        </div>

        <div>
          <Link to={`/find-care/provider/${provider.id}`} className="hover:underline decoration-teal-500 decoration-2 underline-offset-2">
            <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white leading-tight">
              {provider.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{provider.role}</p>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
            <Star size={12} fill="currentColor" />
            <span>{provider.rating}</span>
            <span className="text-gray-300 dark:text-gray-600 mx-1">•</span>
            <span className="text-gray-400 dark:text-gray-500 font-medium underline decoration-gray-200 dark:decoration-gray-700">{provider.reviews} reviews</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {provider.specialties.slice(0, 3).map(spec => (
          <Badge key={spec} variant="neutral" className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
            {spec}
          </Badge>
        ))}
        {provider.specialties.length > 3 && (
          <Badge variant="neutral" className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
            +{provider.specialties.length - 3}
          </Badge>
        )}
      </div>

      <div className="space-y-3 mb-6 flex-grow">
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <MapPin size={16} className="text-gray-400 dark:text-gray-500" />
          <span>{provider.location}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <Calendar size={16} className="text-gray-400 dark:text-gray-500" />
          <span className={provider.availability.includes('week') || provider.availability.includes('tomorrow') ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
            {provider.availability}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <CreditCard size={16} className="text-gray-400 dark:text-gray-500" />
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
          onClick={() => navigate(`/find-care/provider/${provider.id}`)}
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