import React from 'react';
import { Info } from 'lucide-react';

interface DisclaimerBannerProps {
  text: string;
}

const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ text }) => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
      <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
      <p className="text-sm text-amber-800">{text}</p>
    </div>
  );
};

export default DisclaimerBanner;
