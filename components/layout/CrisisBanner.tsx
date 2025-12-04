import React from 'react';
import { AlertCircle, Phone, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';

const CrisisBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 border-t border-b border-amber-100 p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 to-amber-500" />
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="flex items-center gap-4 text-center md:text-left">
           <div className="bg-amber-100 p-3 rounded-full text-amber-600 hidden md:block shrink-0">
              <AlertCircle size={24} />
           </div>
           <div>
              <h3 className="font-display font-bold text-lg text-gray-900 mb-1">
                Need immediate help?
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                You are not alone. Call <span className="font-semibold text-gray-900">988</span> or text <span className="font-semibold text-gray-900">HOME</span> to <span className="font-semibold text-gray-900">741741</span>.
              </p>
           </div>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
           <Button 
             variant="secondary" 
             size="sm" 
             leftIcon={<Phone size={16} />}
             className="bg-amber-500 hover:bg-amber-600 border-transparent shadow-amber-500/20 text-white"
             onClick={() => window.open('tel:988')}
            >
              Call 988
           </Button>
           <Button 
             variant="outline" 
             size="sm"
             leftIcon={<MessageSquare size={16} />}
             className="bg-white border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300"
             onClick={() => window.open('sms:741741')}
           >
              Text Crisis Line
           </Button>
        </div>
      </div>
    </div>
  );
};

export default CrisisBanner;