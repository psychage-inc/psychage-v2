import React from 'react';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const CrisisCallout: React.FC = () => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
      <Phone className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
      <div className="text-sm text-red-800">
        <p className="font-semibold mb-1">If you are in crisis right now:</p>
        <p>
          Call or text <strong>988</strong> (US) or visit{' '}
          <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">
            findahelpline.com
          </a>{' '}
          for crisis resources worldwide. You can also visit{' '}
          <Link to="/crisis" className="underline font-medium">
            psychage.com/crisis
          </Link>.
        </p>
      </div>
    </div>
  );
};

export default CrisisCallout;
