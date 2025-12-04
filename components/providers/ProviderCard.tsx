import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, ShieldCheck, CreditCard } from 'lucide-react';
import { Provider } from '../../data/providers';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img 
            src={provider.image} 
            alt={provider.name}
            loading="lazy"
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
          />
          {provider.verified && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                <ShieldCheck size={16} className="text-teal-500 fill-teal-50" />
            </div>
          )}
        </div>
        
        <div>
            <h3 className="font-display font-bold text-lg text-gray-900 leading-tight">
                {provider.name}
            </h3>
            <p className="text-sm text-gray-500 font-medium mb-1">{provider.role}</p>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star size={12} fill="currentColor" />
                <span>{provider.rating}</span>
                <span className="text-gray-300 mx-1">•</span>
                <span className="text-gray-400 font-medium underline decoration-gray-200">{provider.reviews} reviews</span>
            </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {provider.specialties.map(spec => (
            <Badge key={spec} variant="neutral" className="bg-gray-50 text-gray-600 border border-gray-100">
                {spec}
            </Badge>
        ))}
      </div>

      <div className="space-y-3 mb-6 flex-grow">
        <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin size={16} className="text-gray-400" />
            <span>{provider.location}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
            <Calendar size={16} className="text-gray-400" />
            <span className={provider.availability.includes('week') || provider.availability.includes('tomorrow') ? 'text-green-600 font-semibold' : ''}>
                {provider.availability}
            </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
            <CreditCard size={16} className="text-gray-400" />
            <span className="truncate">{provider.insurance.join(", ")}</span>
        </div>
      </div>

      <div className="flex gap-3 mt-auto">
        <Button className="flex-1 h-10 text-sm font-bold bg-teal-600 hover:bg-teal-700">
            View Profile
        </Button>
        <Button variant="outline" className="h-10 px-3 text-teal-700 border-teal-200 hover:bg-teal-50">
            Book
        </Button>
      </div>
    </motion.div>
  );
};

export default ProviderCard;